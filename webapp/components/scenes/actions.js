import { closeAllControls } from "../UIComponents/actions";
import { setActiveCluster, setClusterFilters, setPlayerControlsEnabled, setStarZoom } from "./canvasReducer";

export const setNewActiveCluster = (dispatch, cluster) => {
  dispatch(setActiveCluster(cluster));
};

export const setNewClusterFilters = (dispatch, clusterFilters) => {
  dispatch(setClusterFilters(clusterFilters));
};

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
