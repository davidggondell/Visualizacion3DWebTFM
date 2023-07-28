import { createSlice } from "@reduxjs/toolkit";
import pesebre from "../../public/pesebre_edr3_ordered.json";

const initialState = {
  activeCluster: pesebre,
  clusterFilters: null,
  playerControlsEnabled: false,
  starZoom: null,
};

export const canvasReducer = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setActiveCluster: (state, action) => {
      state.activeCluster = action.payload;
    },
    setClusterFilters: (state, action) => {
      state.clusterFilters = action.payload;
    },
    setPlayerControlsEnabled: (state, action) => {
      state.playerControlsEnabled = action.payload;
    },
    setStarZoom: (state, action) => {
      state.starZoom = action.payload;
    },
  },
});

export const { setActiveCluster, setClusterFilters, setPlayerControlsEnabled, setStarZoom } = canvasReducer.actions;
