import React, { useState } from "react";
import { FiltersModal } from "./FiltersModal";
import { ArwesThemeProvider, StylesBaseline } from "@arwes/core";
import { AppSidebar } from "./AppSidebar";
import NoSSR from "react-no-ssr";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { AppControlsContext } from "./AppControlsContext";
import { TimeControls } from "./TimeControls";
import { CameraControls } from "./CameraControls";

const animatorGeneral = { duration: { enter: 150, exit: 150 } };
export const AppControls = () => {
  const [filtersModalOpened, setFiltersModalOpened] = useState(false);
  const [timeControlsOpened, setTimeControlsOpened] = useState(false);
  const [cameraControlsOpened, setCameraControlsOpened] = useState(false);
  return (
    <AppControlsContext.Provider
      value={{
        filtersModalOpened: filtersModalOpened,
        timeControlsOpened: timeControlsOpened,
        cameraControlsOpened: cameraControlsOpened,
        setFiltersModalOpened: setFiltersModalOpened,
        setTimeControlsOpened: setTimeControlsOpened,
        setCameraControlsOpened: setCameraControlsOpened,
      }}
    >
      <AppSidebar />
      <ArwesThemeProvider>
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <StylesBaseline />
          <NoSSR>
            <FiltersModal />
          </NoSSR>
        </AnimatorGeneralProvider>
      </ArwesThemeProvider>
      <CameraControls />
      <TimeControls />
    </AppControlsContext.Provider>
  );
};
