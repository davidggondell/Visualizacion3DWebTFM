import React, { useRef } from "react";
import { RootUIContext } from "../RootUIContext";
import { AppControls } from "./AppControls";
import { RootCanvas } from "../../scenes/components/RootCanvas";

export const RootUI = () => {
  const yearRef = useRef(0);

  return (
    <RootUIContext.Provider
      value={{
        yearRef: yearRef,
      }}
    >
      <AppControls />
      <RootCanvas />
    </RootUIContext.Provider>
  );
};
