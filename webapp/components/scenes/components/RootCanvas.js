import { PerspectiveCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";

import { CameraController } from "../../sceneObjects/CameraController";
import { StarClusterScene } from "./StarClusterScene";
import pleyades from "../../../public/pleyades_edr3_ordered.json";
import pesebre from "../../../public/pesebre_edr3_ordered.json";

export const RootCanvas = ({ cameraControllerRef }) => {
  const ambientLight = useRef(null);
  const canvasRef = useRef(null);

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

  return (
    <Canvas ref={canvasRef}>
      <CameraController canvasRef={canvasRef} ref={cameraControllerRef} />
      <ambientLight intensity={0.4} ref={ambientLight} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} far={100000} />
      <Stats />
      <StarClusterScene starCluster={pesebre} ambientLight={ambientLight} />
    </Canvas>
  );
};
