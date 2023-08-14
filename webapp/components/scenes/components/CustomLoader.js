import { ArwesThemeProvider, LoadingBars, StylesBaseline } from "@arwes/core";
import { Html, useProgress } from "@react-three/drei";
import React from "react";

export const CustomLoader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <ArwesThemeProvider>
        <StylesBaseline />
        <LoadingBars animator={{ activate: progress < 100 }} determinate progress={progress} full />
      </ArwesThemeProvider>
    </Html>
  );
};
