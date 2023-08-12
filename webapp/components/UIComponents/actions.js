import { batch } from "react-redux";
import {
  setCameraControlsOpened,
  setClassAActive,
  setClassBActive,
  setClassFActive,
  setClassGActive,
  setClassKActive,
  setClassMActive,
  setClassOActive,
  setFiltersModalOpened,
  setMassFilter,
  setSidebarOpened,
  setTemperatureFilter,
  setTimeControlsOpened,
} from "./appControlsReducer";

export const openSidebar = (dispatch) => {
  dispatch(setSidebarOpened(true));
};

export const closeSidebar = (dispatch) => {
  dispatch(setSidebarOpened(false));
};

export const openFiltersModal = (dispatch) => {
  batch(() => {
    dispatch(setTimeControlsOpened(false));
    dispatch(setCameraControlsOpened(false));
    dispatch(setFiltersModalOpened(true));
  });
};

export const closeFiltersModal = (dispatch) => {
  dispatch(setFiltersModalOpened(false));
};

export const openTimeControls = (dispatch) => {
  batch(() => {
    dispatch(setCameraControlsOpened(false));
    dispatch(setFiltersModalOpened(false));
    dispatch(setTimeControlsOpened(true));
  });
};

export const closeTimeControls = (dispatch) => {
  dispatch(setTimeControlsOpened(false));
};

export const openCameraControls = (dispatch) => {
  batch(() => {
    dispatch(setFiltersModalOpened(false));
    dispatch(setTimeControlsOpened(false));
    dispatch(setCameraControlsOpened(true));
  });
};

export const closeCameraControls = (dispatch) => {
  dispatch(setCameraControlsOpened(false));
};

export const closeAllControls = (dispatch) => {
  batch(() => {
    dispatch(setFiltersModalOpened(false));
    dispatch(setTimeControlsOpened(false));
    dispatch(setCameraControlsOpened(false));
  });
};

export const setNewClassOActive = (dispatch, active) => {
  dispatch(setClassOActive(active));
};

export const setNewClassBActive = (dispatch, active) => {
  dispatch(setClassBActive(active));
};

export const setNewClassAActive = (dispatch, active) => {
  dispatch(setClassAActive(active));
};

export const setNewClassFActive = (dispatch, active) => {
  dispatch(setClassFActive(active));
};

export const setNewClassGActive = (dispatch, active) => {
  dispatch(setClassGActive(active));
};

export const setNewClassKActive = (dispatch, active) => {
  dispatch(setClassKActive(active));
};

export const setNewClassMActive = (dispatch, active) => {
  dispatch(setClassMActive(active));
};

export const setNewTemperatureFilter = (dispatch, value, type) => {
  dispatch(
    setTemperatureFilter({
      value: value,
      type: type,
    }),
  );
};

export const setNewMassFilter = (dispatch, value, type) => {
  dispatch(
    setMassFilter({
      value: value,
      type: type,
    }),
  );
};
