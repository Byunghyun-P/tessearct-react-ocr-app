import React, { createRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";
import { Result, Typography } from "antd";

import { setImage, getImage } from "../../features/ui/uiSlice";

import Buttons from "./Controls";
import OcrBottomSheet from "../BottomSheet/Ocr";
import SettingBottomSheet from "../BottomSheet/Setting";

import {
  ErrorContainer,
  ErrorExtraInformation,
  WebcamContainer,
  ImagePreviewContainer,
  ImagePreview
} from "./styled";

function Camera({}) {
  const webcamRef = createRef<any>();

  const dispatch = useDispatch();
  const image = useSelector(getImage);

  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [isMediaDeviceError, setIsMediaDeviceError] = useState<boolean>();

  const handleOnCapture = useCallback(() => {
    const { current: webcam } = webcamRef;
    if (webcam) {
      const imageSrc = webcam.getScreenshot();
      dispatch(setImage(imageSrc));
    }
  }, [webcamRef]);

  const canUseMediaDevice = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: true
      });
      setIsMediaDeviceError(false);
    } catch (e) {
      console.log(e);
      setIsMediaDeviceError(true);
    }
  }, []);

  useEffect(() => {
    setHeight(document.body.clientHeight);
    setWidth(document.body.clientWidth);

    canUseMediaDevice();
  }, []);

  if (isMediaDeviceError === undefined) {
    return null;
  }

  if (isMediaDeviceError) {
    return (
      <ErrorContainer>
        <Result
          status="error"
          title="카메라 인식 실패"
          subTitle="카메라 사용 가능 여부 및 권한을 확인해주세요"
        />
        <ErrorExtraInformation>
          <Typography.Paragraph>
            <Typography.Text>
              카카오톡 인앱 브라우져로 접속하셨다면, Safari / Chrome 등으로
              실행해주세요.
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Typography.Text> {window.navigator.userAgent} </Typography.Text>
          </Typography.Paragraph>
        </ErrorExtraInformation>
      </ErrorContainer>
    );
  }

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
