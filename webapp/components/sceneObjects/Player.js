import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";

export const Player = ({ stop }) => {
  const x = useRef(0);
  const y = useRef(0);
  const z = useRef(5);
  const deg2rad = (degrees) => degrees * (Math.PI / 180);
  const { camera, scene } = useThree();

  useFrame((_) => {
    if (!stop.current) {
      z.current = z.current + 1;
    }

    camera.position.set(x.current, y.current, z.current);
  });
  return <></>;
};
