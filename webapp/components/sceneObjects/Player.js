import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useKeyboardInput } from "../hooks/useKeyboardInput";
import { useVariable } from "../hooks/useVariable";

export const Player = ({ stop, degx, degy, degz }) => {
  const x = useRef(0);
  const y = useRef(0);
  const z = useRef(5);
  const deg2rad = (degrees) => degrees * (Math.PI / 180);
  const { camera, scene } = useThree();
  //wasd input
  const pressed = useKeyboardInput(["w", "a", "s", "d"]);
  //Converting wasd input to a ref
  const input = useVariable(pressed);

  useFrame((_) => {
    camera.rotation.set(deg2rad(degx.current), deg2rad(degy.current), deg2rad(degz.current));

    if (!stop.current) {
      const zforward = -Math.cos(deg2rad(degx.current)) * Math.cos(deg2rad(degy.current));
      const yforward = Math.sin(deg2rad(degx.current)) * Math.cos(deg2rad(degz.current));
      const xforward = Math.sin(deg2rad(degy.current)) * Math.sin(deg2rad(degz.current));
      x.current = x.current + xforward;
      y.current = y.current + yforward;
      z.current = z.current + zforward;
      camera.position.set(x.current, y.current, z.current);
    }

  });
  return <></>;
};
