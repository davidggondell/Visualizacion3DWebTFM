import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useKeyboardInput } from "../hooks/useKeyboardInput";
import { useVariable } from "../hooks/useVariable";
import { useDrag } from "@use-gesture/react";
import { degToRad } from "three/src/math/MathUtils";

export const Player = ({ dragInput }) => {
  const { camera, scene } = useThree();
  //wasd input
  const pressed = useKeyboardInput(["w", "a", "s", "d", "c", " "]);
  //Converting wasd input to a ref
  const input = useVariable(pressed);
  const cameraState = useRef({ degx: 0, degy: 0, moving: false });

  const deg2rad = (degrees) => degrees * (Math.PI / 180);

  useFrame(() => {
    const { w, s, a, d, c } = input.current;
    const space = input.current[" "];
    if (w) {
      camera.translateZ(-3);
    }
    if (s) {
      camera.translateZ(3);
    }
    if (a) {
      camera.translateX(-3);
    }
    if (d) {
      camera.translateX(3);
    }
    if (c) {
      camera.translateY(-3);
    }
    if (space) {
      camera.translateY(3);
    }
    const rotx = dragInput.current.y / 10 - cameraState.current.degx;
    const roty = dragInput.current.x / 10 - cameraState.current.degy;
    if (dragInput.current.down) {
      if (cameraState.current.moving) {
        camera.rotateX(deg2rad(rotx));
        camera.rotateY(deg2rad(roty));
      }
      cameraState.current = {
        degx: dragInput.current.y / 10,
        degy: dragInput.current.x / 10,
        moving: true,
      };
    } else {
      if (cameraState.current.moving) {
        camera.rotateX(deg2rad(rotx));
        camera.rotateY(deg2rad(roty));
        cameraState.current = { degx: 0, degy: 0, moving: false };
      }
    }
  });
  return <></>;
};
