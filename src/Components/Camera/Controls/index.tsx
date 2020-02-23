import React from "react";
import { useDispatch } from "react-redux";
import { Tooltip, Button } from "antd";

import { setIsSettingBottomSheetOpen } from "../../../features/ui/uiSlice";
import { Container } from "./styled";

interface IProps {
  handleOnCapture: () => void;
}

function Controls({ handleOnCapture }: IProps) {
  const dispatch = useDispatch();

  return (
    <Container>
      <Button
        type="default"
        shape="circle"
        icon="github"
        size="large"
        onClick={() => {
          window.open(
            "https://github.com/Byunghyun-P/tessearct-react-ocr-app",
            "_blank",
            'noopener'
          );
        }}
      />
      <Tooltip
        placement="top"
        title="사진을 찍으면 문자를 인식합니다!"
        visible
        overlayStyle={{
          zIndex: 1,
          position: "fixed"
        }}
      >
        <Button
          type="default"
          shape="round"
          icon="camera"
          size="large"
          onClick={handleOnCapture}
        />
      </Tooltip>
      <Button
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
