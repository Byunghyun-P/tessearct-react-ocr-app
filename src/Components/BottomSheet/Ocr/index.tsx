import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "antd";

import { createWorker } from "tesseract.js";

import {
  getOEMSetting,
  getPSMSetting
} from "../../../features/settings/settingsSlice";
import {
  getImage,
  getIsOcrBottomSheetOpen,
  setImage,
  setIsSettingBottomSheetOpen
} from "../../../features/ui/uiSlice";

import ProgressInformation from "./ProgressInformation";
import Result from "./Result";

export enum STATUS {
  IDLE = "",
  CORE_LOADING = "loading tesseract core",
  TESSERACT_INITIALIZING = "initializing tesseract",
  TESSERACT_INITIALIZED = "initialized tesseract",
  LANG_LOADING = "loading language traineddata",
  LANG_LOADED = "loaded language traineddata",
  API_INITIALIZING = "initializing api",
  API_INITIALIZED = "initialized api",
  TEXT_RECOGNIZING = "recognizing text"
}

enum STAGE {
  LODING = "loading",
  RESULT = "result"
}

let worker: Tesseract.Worker | undefined;

function BottomSheet({}) {
  const dispatch = useDispatch();

  const image = useSelector(getImage);
  const isOcrBottomSheetOpen = useSelector(getIsOcrBottomSheetOpen);

  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const [progress, setProgress] = useState<number>(0);

  const [page, setPage] = useState<Tesseract.Page>();

  const selectedOEM = (useSelector(getOEMSetting) as unknown) as Tesseract.OEM;
  const selectedPSM = (useSelector(getPSMSetting) as unknown) as Tesseract.PSM;

  const doOCR = useCallback(async () => {
    if (image) {
      worker = createWorker({
        logger: ({
          status,
          progress
        }: {
          status: STATUS;
          progress: number;
        }) => {
          setProgress(progress);
          setStatus(status);
        }
      });
      await worker.load();
      await worker.loadLanguage("eng+kor");
      await worker.initialize("eng+kor");
      await worker.setParameters({
        tessedit_ocr_engine_mode: selectedOEM,
        tessedit_pageseg_mode: selectedPSM
        /** TODO: Add preserve_interword_spaces options */
        // preserve_interword_spaces: selectedPreserveInterwordSpace
      });
      const { data } = await worker.recognize(image);
      setPage(data);
      await worker.terminate();
      worker = undefined;
    }
  }, [image]);

  useEffect(() => {
    doOCR();
  }, [image]);

  useEffect(() => {
    if (!isOcrBottomSheetOpen && worker) {
      worker.terminate();
    }
  }, [isOcrBottomSheetOpen]);

  const stage =
    status === STATUS.TEXT_RECOGNIZING && progress === 1
      ? STAGE.RESULT
      : STAGE.LODING;

  if (!image) {
    return null;
  }

  return (
    <Drawer
      title={stage === STAGE.LODING ? "분석중" : "결과"}
      placement="bottom"
      visible={isOcrBottomSheetOpen}
      closable={stage === STAGE.RESULT}
      destroyOnClose={true}
      height={stage === STAGE.LODING ? "130px" : "100%"}
      bodyStyle={{ padding: 0 }}
      onClose={() => {
        dispatch(setImage(undefined));
        dispatch(setIsSettingBottomSheetOpen(false));
      }}
    >
      {stage === STAGE.LODING ? (
        <ProgressInformation progress={progress} status={status} />
      ) : (
        <Result page={page} image={image} />
      )}
    </Drawer>
  );
}

export default BottomSheet;
