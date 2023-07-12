import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpened: false,
  timeControlsOpened: false,
  cameraControlsOpened: false,
  filtersModalOpened: false,
};

export const appControlsReducer = createSlice({
  name: "appControls",
  initialState,
  reducers: {
    setSidebarOpened: (state, action) => {
      state.sidebarOpened = action.payload;
    },
    setTimeControlsOpened: (state, action) => {
      state.timeControlsOpened = action.payload;
    },
    setCameraControlsOpened: (state, action) => {
      state.cameraControlsOpened = action.payload;
    },
    setFiltersModalOpened: (state, action) => {
      state.filtersModalOpened = action.payload;
    },
  },
});

export const { setSidebarOpened, setTimeControlsOpened, setCameraControlsOpened, setFiltersModalOpened } =
  appControlsReducer.actions;
