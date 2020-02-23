import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../reducers";

interface UiState {
  image?: string;
  isOcrBottomSheetOpen: boolean;
  isSettingBottomSheetOpen: boolean;
}

const initialState: UiState = {
  isOcrBottomSheetOpen: false,
  isSettingBottomSheetOpen: false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<string | undefined>) {
      state.image = action.payload;
      state.isOcrBottomSheetOpen = action.payload !== undefined;
    },
    setIsSettingBottomSheetOpen(state, action: PayloadAction<boolean>) {
      state.isSettingBottomSheetOpen = action.payload;
    }
  }
});

export const { setImage, setIsSettingBottomSheetOpen } = uiSlice.actions;

export const getImage = (state: RootState) => state.ui.image;
export const getIsOcrBottomSheetOpen = (state: RootState) =>
  state.ui.isOcrBottomSheetOpen;
export const getIsSettingBottomSheetOpen = (state: RootState) =>
  state.ui.isSettingBottomSheetOpen;

export default uiSlice.reducer;
