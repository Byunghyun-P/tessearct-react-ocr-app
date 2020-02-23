import styled from "styled-components";

export const ErrorContainer = styled.div`
  height: -webkit-fill-available;
  height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ErrorExtraInformation = styled.div`
  padding: 0 20px;
  text-align: center;
`;

export const WebcamContainer = styled.div`
  position: fixed;
  height: -webkit-fill-available;
  height: 100vh;
  width: 100vw;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: -webkit-fill-available;
  height: 100vh;
  width: 100vw;
`;

export const ImagePreview = styled.img`
  width: 100%;
`;
