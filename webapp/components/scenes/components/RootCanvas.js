import { PerspectiveCamera, Stats, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";

import { CameraController } from "../../sceneObjects/CameraController";
import { StarClusterScene } from "./StarClusterScene";
import pleyades from "../../../public/pleyades_edr3_ordered.json";
import pesebre from "../../../public/pesebre_edr3_ordered.json";
import { RootCanvasContext } from "../RootCanvasContext";

export const RootCanvas = () => {
  const ambientLight = useRef(null);
  const rootCanvasRef = useRef(null);
  const [canvasRef, setCanvasRef] = useState(null);

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

  useEffect(() => {
    setCanvasRef(rootCanvasRef);
  }, [rootCanvasRef]);

  return (
    <RootCanvasContext.Provider
      value={{
        canvasRef: canvasRef,
        setCanvasRef: setCanvasRef,
      }}
    >
      <Canvas performance={{ min: 2 }} ref={rootCanvasRef}>
        <CameraController />
        <ambientLight intensity={0.4} ref={ambientLight} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} far={100000} />
        <Stats />
        <StarClusterScene starCluster={pesebre} ambientLight={ambientLight} />
      </Canvas>
    </RootCanvasContext.Provider>
  );
};
