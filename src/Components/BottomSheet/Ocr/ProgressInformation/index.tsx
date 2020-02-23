import React from "react";

import { STATUS } from "../index";

import { Container, StatusText, Progress } from "./styled";

interface IStatusProps {
  status: STATUS;
  progress: number;
}

function Status({ status, progress }: IStatusProps) {
  return (
    <StatusText>
      {status === STATUS.CORE_LOADING
        ? "[0/4] Tesseract 코어를 불러오고 있습니다"
        : status === STATUS.TESSERACT_INITIALIZING
        ? "[1/4] Tesseract를 초기화 하고 있습니다"
        : status === STATUS.TESSERACT_INITIALIZED
        ? "[2/4] Tesseract가 초기화 되었습니다"
        : status === STATUS.LANG_LOADING
        ? "[2/4] 언어 학습 정보를 불러오고 있습니다"
        : status === STATUS.LANG_LOADED
        ? "[3/4] 언어 학습 정보를 모두 불러왔습니다"
        : status === STATUS.API_INITIALIZING
        ? "[3/4] API를 초기화하고 있습니다"
        : status === STATUS.API_INITIALIZED
        ? "[4/4] API가 초기화 되었습니다"
        : status === STATUS.TEXT_RECOGNIZING
        ? "[4/4] 문자를 인식중입니다"
        : status}{" "}
      ({Math.floor(progress * 100)}%)
    </StatusText>
  );
}

interface IProps {
  status: STATUS;
  progress: number;
}

function ProgressInformation({ status, progress }: IProps) {
  return (
    <Container>
      <Status status={status} progress={progress} />
      <Progress
        percent={Math.floor(
          status === STATUS.TEXT_RECOGNIZING ? progress * 100 : 0
        )}
        status="active"
        showInfo={false}
      />
    </Container>
  );
}

export default ProgressInformation;
