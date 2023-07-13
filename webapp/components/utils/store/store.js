import { configureStore } from "@reduxjs/toolkit";
import { appControlsReducer } from "../../UIComponents/appControlsReducer";
import { canvasReducer } from "../../scenes/canvasReducer";

export const store = configureStore({
  reducer: {
    appControls: appControlsReducer.reducer,
    canvas: canvasReducer.reducer,
  },
});
