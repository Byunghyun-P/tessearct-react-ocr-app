import { combineReducers } from "@reduxjs/toolkit";

import ui from "../features/ui/uiSlice";
import settings from "../features/settings/settingsSlice";

const rootReducer = combineReducers({ ui, settings });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
