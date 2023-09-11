import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { appControlsReducer } from "../components/UIComponents/appControlsReducer";
import { canvasReducer } from "../components/scenes/canvasReducer";

const store = configureStore({
  reducer: {
    appControls: appControlsReducer.reducer,
    canvas: canvasReducer.reducer,
  },
});

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = store,
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
