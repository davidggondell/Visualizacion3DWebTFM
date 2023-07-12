import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerControlsEnabled: false,
  starZoom: null,
};

export const canvasReducer = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setPlayerControlsEnabled: (state, action) => {
      state.playerControlsEnabled = action.payload;
    },
    setStarZoom: (state, action) => {
      state.starZoom = action.payload;
    },
  },
});

export const { setPlayerControlsEnabled, setStarZoom } = canvasReducer.actions;
