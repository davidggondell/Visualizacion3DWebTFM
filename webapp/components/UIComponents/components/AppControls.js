import React from "react";
import { FiltersModal } from "./FiltersModal";
import { ArwesThemeProvider, StylesBaseline } from "@arwes/core";
import { AppSidebar } from "./AppSidebar";
import NoSSR from "react-no-ssr";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { TimeControls } from "./TimeControls";
import { CameraControls } from "./CameraControls";
import { StarDetails } from "./StarDetails";
import { useSelector } from "react-redux";
import { getProgress } from "../../scenes/selectors";
import { CustomLoader } from "./CustomLoader";

const animatorGeneral = { duration: { enter: 200, exit: 200 } };
export const AppControls = () => {
  const progress = useSelector(getProgress);
  return (
    <>
      {progress < 100 ? (
        <CustomLoader progress={progress} />
      ) : (
        <>
          <AppSidebar />
          <ArwesThemeProvider>
            <AnimatorGeneralProvider animator={animatorGeneral}>
              <StylesBaseline />
              <NoSSR>
                <FiltersModal />
                <StarDetails />
              </NoSSR>
            </AnimatorGeneralProvider>
          </ArwesThemeProvider>
          <CameraControls />
          <TimeControls />
        </>
      )}
    </>
  );
};
