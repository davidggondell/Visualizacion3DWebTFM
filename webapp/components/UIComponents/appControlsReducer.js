import { createSlice } from "@reduxjs/toolkit";
import { sliderTypes } from "./components/SliderTypePicker";

const initialState = {
  sidebarOpened: false,
  timeControlsOpened: false,
  cameraControlsOpened: false,
  filtersModalOpened: false,
  instructionsOpened: false,
  classOActive: false,
  classBActive: false,
  classAActive: false,
  classFActive: false,
  classGActive: false,
  classKActive: false,
  classMActive: false,
  temperatureFilter: {
    value: [0, 10],
    type: sliderTypes.disabled,
  },
  massFilter: {
    value: [0, 10],
    type: sliderTypes.disabled,
  },
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
    setInstructionsOpened: (state, action) => {
      state.instructionsOpened = action.payload;
    },
    setClassOActive: (state, action) => {
      state.classOActive = action.payload;
    },
    setClassBActive: (state, action) => {
      state.classBActive = action.payload;
    },
    setClassAActive: (state, action) => {
      state.classAActive = action.payload;
    },
    setClassFActive: (state, action) => {
      state.classFActive = action.payload;
    },
    setClassGActive: (state, action) => {
      state.classGActive = action.payload;
    },
    setClassKActive: (state, action) => {
      state.classKActive = action.payload;
    },
    setClassMActive: (state, action) => {
      state.classMActive = action.payload;
    },
    setTemperatureFilter: (state, action) => {
      state.temperatureFilter = action.payload;
    },
    setMassFilter: (state, action) => {
      state.massFilter = action.payload;
    },
  },
});

export const {
  setSidebarOpened,
  setTimeControlsOpened,
  setCameraControlsOpened,
  setFiltersModalOpened,
  setInstructionsOpened,
  setClassOActive,
  setClassBActive,
  setClassAActive,
  setClassFActive,
  setClassGActive,
  setClassKActive,
  setClassMActive,
  setTemperatureFilter,
  setMassFilter,
} = appControlsReducer.actions;
