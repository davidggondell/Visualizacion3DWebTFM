import { Box, Paper } from "@mui/material";
import { PerspectiveCamera, Stats, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";

import { CameraController } from "../components/sceneObjects/CameraController";
import { StarClusterScene } from "../components/scenes/StarClusterScene";
import pleyades from "../public/pleyades_edr3_ordered.json";
import pesebre from "../public/pesebre_edr3_ordered.json";
import { CameraControlsButton } from "../components/UIComponents/CameraControlsButton";

export default function Home() {
  const ambientLight = useRef(null);
  const canvasRef = useRef(null);
  const cameraControllerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => e.preventDefault();
    document.addEventListener("gesturestart", handler);
    document.addEventListener("gesturechange", handler);
    document.addEventListener("gestureend", handler);
    return () => {
      document.removeEventListener("gesturestart", handler);
      document.removeEventListener("gesturechange", handler);
      document.removeEventListener("gestureend", handler);
    };
  }, []);

  const toogleControls = () => {
    cameraControllerRef.current.toogleControls();
  };

  return (
    <Box sx={{ width: "100vw", height: "100%", backgroundColor: "#000000" }}>
      <Paper sx={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
        <CameraControlsButton onChange={toogleControls} />
      </Paper>
      <Canvas ref={canvasRef}>
        <CameraController canvasRef={canvasRef} ref={cameraControllerRef} />
        <ambientLight intensity={0.4} ref={ambientLight} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} far={100000} />
        <Stats />
        <StarClusterScene starCluster={pesebre} ambientLight={ambientLight} />
      </Canvas>
    </Box>
  );
}
