import { PerspectiveCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";

import { CameraController } from "../../sceneObjects/CameraController";
import { StarClusterScene } from "./StarClusterScene";
import { RootCanvasContext } from "../RootCanvasContext";
import { useSelector } from "react-redux";
import { getActiveCluster } from "../selectors";

export const RootCanvas = ({ cameraControllerRef }) => {
  const ambientLight = useRef(null);
  const canvasRef = useRef(null);
  const activeCluster = useSelector(getActiveCluster);

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

  if (!activeCluster) {
    return null;
  }

  return (
    <RootCanvasContext.Provider
      value={{
        canvasRef: canvasRef,
      }}
    >
      <Canvas ref={canvasRef}>
        <CameraController ref={cameraControllerRef} />
        <ambientLight intensity={0.4} ref={ambientLight} />
        <PerspectiveCamera makeDefault position={[0, 0, 3000]} far={25000} />
        <Stats />
        <StarClusterScene starCluster={activeCluster} />
      </Canvas>
    </RootCanvasContext.Provider>
  );
};
