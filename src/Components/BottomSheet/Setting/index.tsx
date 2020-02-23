import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Collapse, Drawer, Descriptions, Radio, Button } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

import {
  OEM,
  PSM,
  getOEMSetting,
  getPSMSetting,
  getPreserveInterwordSpaceSetting,
  updateOEM,
  updatePSM,
  setDefaultSetting
} from "../../../features/settings/settingsSlice";
import {
  setIsSettingBottomSheetOpen,
  getIsSettingBottomSheetOpen
} from "../../../features/ui/uiSlice";

import { ButtonContainer } from "./styled";

const { Panel } = Collapse;

function SettingBottomSheet({}) {
  const dispatch = useDispatch();

  const isOpen = useSelector(getIsSettingBottomSheetOpen);

  const selectedOEM = useSelector(getOEMSetting);
  const selectedPSM = useSelector(getPSMSetting);
  const selectedPreserveInterwordSpace = useSelector(
    getPreserveInterwordSpaceSetting
  );

  const onClose = useCallback(() => {
    dispatch(setIsSettingBottomSheetOpen(false));
  }, []);

  return (
    <Drawer
      title={"설정"}
      placement="bottom"
      visible={isOpen}
      closable={true}
      destroyOnClose
      height={"60%"}
      bodyStyle={{ height: "100%", padding: "5px" }}
      onClose={onClose}
    >
      <Descriptions
        title=""
        column={1}
        bordered
        layout={"vertical"}
        size="small"
      >
        <Descriptions.Item label="OCR Engine Mode">
          <Radio.Group
            buttonStyle="solid"
            size="small"
            defaultValue={selectedOEM}
            onChange={(evt: RadioChangeEvent) => {
              dispatch(updateOEM(evt.target.value));
            }}
          >
            <Radio.Button value={OEM.TESSERACT_ONLY}>
              TESSERACT_ONLY
            </Radio.Button>
            <Radio.Button value={OEM.LSTM_ONLY}>LSTM_ONLY</Radio.Button>
            <Radio.Button value={OEM.TESSERACT_LSTM_COMBINED}>
              TESSERACT_LSTM_COMBINED
            </Radio.Button>
            <Radio.Button value={OEM.DEFAULT}>DEFAULT</Radio.Button>
          </Radio.Group>
          <Collapse bordered={false}>
            <Panel header="설명" key="Description">
              <h5>
                When Tesseract/Cube is initialized we can choose to
                instantiate/load/run only the Tesseract part, only the Cube part
                or both along with the combiner. The preference of which engine
                to use is stored in tessedit_ocr_engine_mode.
              </h5>
              <hr />
              <b> OEM_TESSERACT_ONLY </b> <br />
              <p>Run Tesseract only - fastest; deprecated</p>
              <hr />
              <b> OEM_LSTM_ONLY </b>
              <p>Run just the LSTM line recognizer. </p>
              <hr />
              <b> OEM_TESSERACT_LSTM_COMBINED </b>
              <p>
                Run the LSTM recognizer, but allow fallback to Tesseract when
                things get difficult.; deprecated
              </p>
              <hr />
              <b> OEM_DEFAULT </b>
              <p>
                Specify this mode when calling init_*(), to indicate that any of
                the above modes should be automatically inferred from the
                variables in the language-specific config, command-line configs,
                or if not specified in any of the above should be set to the
              </p>
            </Panel>
          </Collapse>
        </Descriptions.Item>
        <Descriptions.Item label="Page Seg Mode">
          <Radio.Group
            buttonStyle="solid"
            size="small"
            defaultValue={selectedPSM}
            onChange={(evt: RadioChangeEvent) => {
              dispatch(updatePSM(evt.target.value));
            }}
          >
            <Radio.Button value={PSM.OSD_ONLY}>OSD_ONLY</Radio.Button>
            <Radio.Button value={PSM.AUTO_OSD}>AUTO_OSD</Radio.Button>
            <Radio.Button value={PSM.AUTO_ONLY}>AUTO_ONLY</Radio.Button>
            <Radio.Button value={PSM.AUTO}>AUTO</Radio.Button>
            <Radio.Button value={PSM.SINGLE_COLUMN}>SINGLE_COLUMN</Radio.Button>
            <Radio.Button value={PSM.SINGLE_BLOCK_VERT_TEXT}>
              SINGLE_BLOCK_VERT_TEXT
            </Radio.Button>
            <Radio.Button value={PSM.SINGLE_BLOCK}>SINGLE_BLOCK</Radio.Button>
            <Radio.Button value={PSM.SINGLE_LINE}>SINGLE_LINE</Radio.Button>
            <Radio.Button value={PSM.SINGLE_WORD}>SINGLE_WORD</Radio.Button>
            <Radio.Button value={PSM.CIRCLE_WORD}>CIRCLE_WORD</Radio.Button>
            <Radio.Button value={PSM.SINGLE_CHAR}>SINGLE_CHAR</Radio.Button>
            <Radio.Button value={PSM.SPARSE_TEXT}>SPARSE_TEXT</Radio.Button>
            <Radio.Button value={PSM.SPARSE_TEXT_OSD}>
              SPARSE_TEXT_OSD
            </Radio.Button>
          </Radio.Group>

          <Collapse bordered={false}>
            <Panel header="설명" key="Description">
              <h5>
                Possible modes for page layout analysis. These *must* be kept in
                order of decreasing amount of layout analysis to be done, except
                for OSD_ONLY, so that the inequality test macros below work.
              </h5>
              <b> PSM_OSD_ONLY </b>
              <p>Orientation and script detection only.</p>
              <hr />
              <b>PSM_AUTO_OSD </b>
              <p>
                Automatic page segmentation with orientation and script
                detection. (OSD)
              </p>
              <hr />
              <b>PSM_AUTO_ONLY </b>
              <p> Automatic page segmentation, but no OSD, or OCR. </p>
              <hr />
              <b>PSM_AUTO </b>
              <p> Fully automatic page segmentation, but no OSD. </p>
              <hr />
              <b>PSM_SINGLE_COLUMN </b>
              <p> Assume a single column of text of variable sizes. </p>
              <hr />
              <b>PSM_SINGLE_BLOCK_VERT_TEXT </b>
              <p> Assume a single uniform block of vertically aligned text. </p>
              <hr />
              <b>PSM_SINGLE_BLOCK </b>
              <p> Assume a single uniform block of text. (Default.) </p>
              <hr />
              <b>PSM_SINGLE_LINE </b>
              <p> Treat the image as a single text line. </p>
              <hr />
              <b>PSM_SINGLE_WORD </b>
              <p> Treat the image as a single word. </p>
              <hr />
              <b>PSM_CIRCLE_WORD </b>
              <p> Treat the image as a single word in a circle. </p>
              <hr />
              <b>PSM_SINGLE_CHAR </b>
              <p> Treat the image as a single character. </p>
              <hr />
              <b>PSM_SPARSE_TEXT </b>
              <p> Find as much text as possible in no particular order. </p>
              <hr />
              <b>PSM_SPARSE_TEXT_OSD </b>
              <p> Sparse text with orientation and script det. </p>
              <hr />
              <b>PSM_RAW_LINE </b>
              <p>
                Treat the image as a single text line, bypassing hacks that are
                Tesseract-specific.
              </p>
              <hr />
              <b>PSM_COUNT </b>
              <p> Number of enum entries. </p>
            </Panel>
          </Collapse>
        </Descriptions.Item>
        {/* TODO: Support Preserve Interword Spaces option */}
        {/* 
          <Descriptions.Item label="Preserve Interword Spaces">
            <Radio.Group
              buttonStyle="solid"
              size="small"
              defaultValue={selectedPreserveInterwordSpace}
              onChange={(evt: RadioChangeEvent) => {
                dispatch(updatePreserveInterwordSpace(evt.target.value));
              }}
            >
              <Radio.Button value={PRESERVE_INTER_WORD_SPACES.NO}>
                NO
              </Radio.Button>
              <Radio.Button value={PRESERVE_INTER_WORD_SPACES.YES}>
                YES
              </Radio.Button>
            </Radio.Group>
          </Descriptions.Item> 
        */}
      </Descriptions>
      <ButtonContainer>
        <Button
          type="danger"
          onClick={() => {
            dispatch(setDefaultSetting());
            onClose();
          }}
        >
          초기화
        </Button>
        <Button onClick={onClose}>닫기</Button>
      </ButtonContainer>
    </Drawer>
  );
}

export default SettingBottomSheet;
