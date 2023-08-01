import { PerspectiveCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect, useMemo } from "react";

import { CameraController } from "../../sceneObjects/CameraController";
import { StarClusterScene } from "./StarClusterScene";
import { RootCanvasContext } from "../RootCanvasContext";
import { useSelector } from "react-redux";
import { getActiveCluster, getClusterFilters } from "../selectors";
import { sliderTypes } from "../../UIComponents/components/SliderTypePicker";
import {
  blueStarMinTemp,
  brightBlueStarMinTemp,
  brightYellowStarMinTemp,
  orangeStarMinTemp,
  whiteStarMinTemp,
  yellowStarMinTemp,
} from "../../utils/physicsFunctions";

const filterClass = (
  temperature,
  classOActivated,
  classBActivated,
  classAActivated,
  classFActivated,
  classGActivated,
  classKActivated,
  classMActivated,
) => {
  if (temperature > blueStarMinTemp) {
    return !classOActivated;
  } else if (temperature > brightBlueStarMinTemp) {
    return !classBActivated;
  } else if (temperature > whiteStarMinTemp) {
    return !classAActivated;
  } else if (temperature > brightYellowStarMinTemp) {
    return !classFActivated;
  } else if (temperature > yellowStarMinTemp) {
    return !classGActivated;
  } else if (temperature > orangeStarMinTemp) {
    return !classKActivated;
  } else {
    return !classMActivated;
  }
};

const filterTemperature = (temperature, temperatureFilterType, temperatureFilterValue) => {
  if (temperatureFilterType == sliderTypes.activated) {
    return temperature < temperatureFilterValue[0] || temperature > temperatureFilterValue[1];
  }
  if (temperatureFilterType == sliderTypes.inverted) {
    return temperature > temperatureFilterValue[0] || temperature < temperatureFilterValue[1];
  }
  return false;
};

const filterMass = (mass, massFilterType, massFilterValue) => {
  if (massFilterType == sliderTypes.activated) {
    return mass < massFilterValue[0] || mass > massFilterValue[1];
  }
  if (massFilterType == sliderTypes.inverted) {
    return mass > massFilterValue[0] || mass < massFilterValue[1];
  }
  return false;
};

export const RootCanvas = ({ cameraControllerRef }) => {
  const ambientLight = useRef(null);
  const canvasRef = useRef(null);
  const activeCluster = useSelector(getActiveCluster);
  const clusterFilters = useSelector(getClusterFilters);

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

  const clusterToShow = useMemo(() => {
    if (clusterFilters) {
      console.log(clusterFilters);
      return activeCluster.filter((star) => {
        const temp = 10 ** star.temp_i;
        const result =
          !filterClass(
            temp,
            clusterFilters.classOActivated,
            clusterFilters.classBActivated,
            clusterFilters.classAActivated,
            clusterFilters.classFActivated,
            clusterFilters.classGActivated,
            clusterFilters.classKActivated,
            clusterFilters.classMActivated,
          ) &&
          !filterTemperature(temp, clusterFilters.temperatureFilterType, clusterFilters.temperatureFilterValue) &&
          !filterMass(star.mass_i, clusterFilters.massFilterType, clusterFilters.massFilterValue);
        return result;
      });
    } else {
      return activeCluster;
    }
  }, [activeCluster, clusterFilters]);

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
        <PerspectiveCamera makeDefault position={[0, 0, 5]} far={100000} />
        <Stats />
        <StarClusterScene starCluster={clusterToShow} />
      </Canvas>
    </RootCanvasContext.Provider>
  );
};
