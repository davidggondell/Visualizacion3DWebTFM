import { Box, Button } from "@mui/material";
import { PerspectiveCamera, Stats, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";

import { CameraController } from "../components/scenes/CameraController";
import { StarClusterScene } from "../components/scenes/StarClusterScene";
import pleyades from "../public/pleyades_edr3_filtered.json";

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
      <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1000 }}>
        <Button onClick={() => toogleControls()}>Toogle</Button>
      </Box>
      <Canvas ref={canvasRef}>
        <CameraController canvasRef={canvasRef} ref={cameraControllerRef} />
        <ambientLight intensity={0.4} ref={ambientLight} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} far={100000} />
        <Stats />
        <StarClusterScene starCluster={pleyades} ambientLight={ambientLight} />
      </Canvas>
    </Box>
  );
}
