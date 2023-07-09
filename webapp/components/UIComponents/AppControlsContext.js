import React from "react";

export const AppControlsContext = React.createContext({
  filtersModalOpened: false,
  timeControlsOpened: false,
  cameraControlsOpened: false,
  setFiltersModalOpened: () => {},
  setTimeControlsOpened: () => {},
  setCameraControlsOpened: () => {},
});
