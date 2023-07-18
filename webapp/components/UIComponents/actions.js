import { batch } from "react-redux";
import {
  setCameraControlsOpened,
  setFiltersModalOpened,
  setSidebarOpened,
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
