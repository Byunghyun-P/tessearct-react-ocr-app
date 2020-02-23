import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../reducers";

export enum OEM {
  TESSERACT_ONLY = 0,
  LSTM_ONLY = 1,
  TESSERACT_LSTM_COMBINED = 2,
  DEFAULT = 3
}

export enum PSM {
  OSD_ONLY = "0",
  AUTO_OSD = "1",
  AUTO_ONLY = "2",
  AUTO = "3",
  SINGLE_COLUMN = "4",
  SINGLE_BLOCK_VERT_TEXT = "5",
  SINGLE_BLOCK = "6",
  SINGLE_LINE = "7",
  SINGLE_WORD = "8",
  CIRCLE_WORD = "9",
  SINGLE_CHAR = "10",
  SPARSE_TEXT = "11",
  SPARSE_TEXT_OSD = "12"
}

export enum PRESERVE_INTER_WORD_SPACES {
  NO = "0",
  YES = "1"
}

export enum LANGUAGE {
  ENG = "eng",
  KOR = "kor",
  JPN = "jpn"
}

interface settingState {
  tesseditOcrEngineMode: OEM;
  tesseditPagesegMode: PSM;
  preserveInterwordSpaces: PRESERVE_INTER_WORD_SPACES;
}

const initialState: settingState = {
  tesseditOcrEngineMode: OEM.DEFAULT,
  tesseditPagesegMode: PSM.SINGLE_BLOCK,
  preserveInterwordSpaces: PRESERVE_INTER_WORD_SPACES.NO
};

const settingsSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setDefaultSetting() {
      return initialState;
    },
    updateOEM(state, action) {
      state.tesseditOcrEngineMode = action.payload;
    },
    updatePSM(state, action) {
      state.tesseditPagesegMode = action.payload;
    },
    updatePreserveInterwordSpace(state, action) {
      state.preserveInterwordSpaces = action.payload;
    }
  }
});

export const {
  setDefaultSetting,
  updateOEM,
  updatePSM,
  updatePreserveInterwordSpace
} = settingsSlice.actions;

export const getOEMSetting = (state: RootState) =>
  state.settings.tesseditOcrEngineMode;
export const getPSMSetting = (state: RootState) =>
  state.settings.tesseditPagesegMode;
export const getPreserveInterwordSpaceSetting = (state: RootState) =>
  state.settings.preserveInterwordSpaces;

export default settingsSlice.reducer;
