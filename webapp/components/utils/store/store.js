import { configureStore } from "@reduxjs/toolkit";
import { appControlsReducer } from "../../UIComponents/appControlsReducer";

export const store = configureStore({
  reducer: {
    appControls: appControlsReducer.reducer,
  },
});
