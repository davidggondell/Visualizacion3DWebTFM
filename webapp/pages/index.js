import { Box, Paper } from "@mui/material";
import React, { useRef } from "react";
import { CameraControlsButton } from "../components/UIComponents/components/CameraControlsButton";
import { RootCanvas } from "../components/scenes/components/RootCanvas";
import { AppControls } from "../components/UIComponents/components/AppControls";

export default function Home() {
  return (
    <Box sx={{ width: "100vw", height: "100%", backgroundColor: "#000000", overflow: "hidden" }}>
      <AppControls />
      <RootCanvas />
    </Box>
  );
}
