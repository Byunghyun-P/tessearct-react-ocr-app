import React, { createRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";

import { setImage, getImage } from "../../features/ui/uiSlice";

import Buttons from "./Controls";
import OcrBottomSheet from "../BottomSheet/Ocr";
import SettingBottomSheet from "../BottomSheet/Setting";

import { WebcamContainer, ImagePreviewContainer, ImagePreview } from "./styled";

function Camera({}) {
  const webcamRef = createRef<any>();

  const dispatch = useDispatch();
  const image = useSelector(getImage);

  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const handleOnCapture = useCallback(() => {
    const { current: webcam } = webcamRef;
    if (webcam) {
      const imageSrc = webcam.getScreenshot();
      dispatch(setImage(imageSrc));
    }
  }, [webcamRef]);

  useEffect(() => {
    setHeight(document.body.clientHeight);
    setWidth(document.body.clientWidth);
  }, []);

  return (
    <>
      {!image ? (
        <WebcamContainer>
          <Webcam
            ref={webcamRef}
            height={height}
            width={width}
            videoConstraints={{
              facingMode: "environment",
              width,
              height
            }}
            audio={false}
            style={{ background: "#333" }}
            screenshotFormat="image/jpeg"
            forceScreenshotSourceSize
          />
          <Buttons handleOnCapture={handleOnCapture} />
        </WebcamContainer>
      ) : (
        <ImagePreviewContainer>
          <ImagePreview src={image} />
        </ImagePreviewContainer>
      )}
      <OcrBottomSheet />
      <SettingBottomSheet />
    </>
  );
}

export default Camera;
