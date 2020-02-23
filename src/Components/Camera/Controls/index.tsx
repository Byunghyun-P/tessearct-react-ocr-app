import React from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";

import { setIsSettingBottomSheetOpen } from "../../../features/ui/uiSlice";
import { Container, CameraButton, SettingButton } from "./styled";

interface IProps {
  handleOnCapture: () => void;
}

function Controls({ handleOnCapture }: IProps) {
  const dispatch = useDispatch();
  return (
    <Container>
      <Tooltip
        placement="top"
        title="사진을 찍으면 문자를 인식합니다!"
        visible
        overlayStyle={{ zIndex: 1 }}
      >
        <CameraButton
          type="default"
          shape="round"
          icon="camera"
          size="large"
          onClick={handleOnCapture}
        />
      </Tooltip>
      <SettingButton
        icon="setting"
        shape="circle"
        size="large"
        onClick={() => {
          dispatch(setIsSettingBottomSheetOpen(true));
        }}
      />
    </Container>
  );
}

export default Controls;
