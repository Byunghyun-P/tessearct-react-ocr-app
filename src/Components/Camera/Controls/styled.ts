import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 5vh;
  position: fixed;
`;

export const CameraButton = styled(Button)``;

export const SettingButton = styled(Button)`
  position: absolute;
  right: 5vh;
`;
