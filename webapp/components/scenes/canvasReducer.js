import { createSlice } from "@reduxjs/toolkit";
import pesebre from "../../public/pesebre_edr3_ordered.json";

const initialState = {
  activeCluster: pesebre,
  playerControlsEnabled: true,
  starZoom: null,
};

export const canvasReducer = createSlice({
  name: "canvas",
  initialState,
  reducers: {
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

export const { setActiveCluster, setPlayerControlsEnabled, setStarZoom } = canvasReducer.actions;
