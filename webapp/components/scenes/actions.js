import { closeAllControls } from "../UIComponents/actions";
import { setActiveCluster, setPlayerControlsEnabled, setStarZoom } from "./canvasReducer";

export const setNewActiveCluster = (dispatch, cluster) => {
  dispatch(setActiveCluster(cluster));
};

export const setPlayerControls = (dispatch) => {
  dispatch(setPlayerControlsEnabled(true));
};

export const setOrbitControls = (dispatch) => {
  dispatch(setPlayerControlsEnabled(false));
};

export const setNewStarZoom = (dispatch, starZoom) => {
  dispatch(setStarZoom(starZoom));
};

export const closeStarZoom = (dispatch) => {
  dispatch(setStarZoom(null));
};
