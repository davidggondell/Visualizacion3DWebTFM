import React from "react";
import { FiltersModal } from "./FiltersModal";
import { ArwesThemeProvider, StylesBaseline } from "@arwes/core";
import { AppSidebar } from "./AppSidebar";
import NoSSR from "react-no-ssr";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { TimeControls } from "./TimeControls";
import { CameraControls } from "./CameraControls";

const animatorGeneral = { duration: { enter: 150, exit: 150 } };
export const AppControls = () => {
  return (
    <>
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
    </>
  );
};
