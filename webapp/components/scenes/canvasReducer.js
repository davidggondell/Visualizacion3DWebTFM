import { createSlice } from "@reduxjs/toolkit";
import pesebre from "../../public/pesebre_edr3_ordered.json";

const initialState = {
  progress: 0,
  activeCluster: pesebre,
  playerControlsEnabled: true,
  starZoom: null,
};

export const canvasReducer = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setActiveCluster: (state, action) => {
      state.activeCluster = action.payload;
    },
    setPlayerControlsEnabled: (state, action) => {
      state.playerControlsEnabled = action.payload;
    },
    setStarZoom: (state, action) => {
      state.starZoom = action.payload;
    },
  },
});

export const { setProgress, setActiveCluster, setPlayerControlsEnabled, setStarZoom } = canvasReducer.actions;
