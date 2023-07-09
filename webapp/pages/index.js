import { Box, Paper } from "@mui/material";
import React, { useRef } from "react";
import { CameraControlsButton } from "../components/UIComponents/CameraControlsButton";
import { AppSidebar } from "../components/UIComponents/AppSidebar";
import { RootCanvas } from "../components/scenes/RootCanvas";
import { AppControls } from "../components/UIComponents/AppControls";

export default function Home() {
  const cameraControllerRef = useRef(null);

  const toogleControls = () => {
    cameraControllerRef?.current?.toogleControls();
  };

  return (
    <Box sx={{ width: "100vw", height: "100%", backgroundColor: "#000000", overflow: "hidden" }}>
      <Paper sx={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
        <CameraControlsButton onChange={toogleControls} />
      </Paper>
      <AppControls />
      <RootCanvas cameraControllerRef={cameraControllerRef} />
    </Box>
  );
}
