import { closeAllControls } from "../UIComponents/actions";
import { setPlayerControlsEnabled, setStarZoom } from "./canvasReducer";

export const setPlayerControls = (dispatch) => {
  dispatch(setPlayerControlsEnabled(true));
};

export const setOrbitControls = (dispatch) => {
  dispatch(setPlayerControlsEnabled(false));
};

export const setNewStarZoom = (dispatch, starZoom) => {
  closeAllControls(dispatch);
  dispatch(setStarZoom(starZoom));
};

export const closeStarZoom = (dispatch) => {
  dispatch(setStarZoom(null));
};
