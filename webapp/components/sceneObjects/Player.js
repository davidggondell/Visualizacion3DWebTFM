import { useFrame, useThree } from "@react-three/fiber";
import {
  createUseGesture,
  dragAction,
  pinchAction,
  wheelAction,
} from "@use-gesture/react";
import React, { useRef } from "react";
import { useKeyboardInput } from "../hooks/useKeyboardInput";
import { useVariable } from "../hooks/useVariable";
import { deg2rad } from "../utils/physicsFunctions";

const moveSpeed = 3;

export const Player = ({ canvasRef, enabled }) => {
  const { camera, scene } = useThree();
  //wasd input
  const pressed = useKeyboardInput(["w", "a", "s", "d", "c", " "]);
  //Converting wasd input to a ref
  const input = useVariable(pressed);
  const cameraState = useRef({ degx: 0, degy: 0, moving: false });
  const dragInput = useRef({ x: 0, y: 0, down: false });
  const pinchInput = useRef(0);

  //add gestures to the canvas through its reference
  const useGesture = createUseGesture([dragAction, pinchAction, wheelAction]);
  useGesture(
    {
      onDrag: ({ down, pinching, cancel, offset: [x, y], ...rest }) => {
        if (enabled) {
          if (pinching) return cancel();
          dragInput.current = { down: down, x: x, y: y };
        }
      },
      onPinch: ({ first, da: [distance, _] }) => {
        if (enabled) {
          if (!first) {
            camera.translateZ(-0.8 * (distance - pinchInput.current));
          }
          pinchInput.current = distance;
        }
      },
      onWheel: ({ active, event, direction: [, dy] }) => {
        if (enabled) {
          if (active) {
            camera.translateZ(15 * dy);
          }
        }
      },
    },
    {
      target: canvasRef,
      eventOptions: { passive: false },
    }
  );

  //check camera movement on each frame
  useFrame(() => {
    const { w, s, a, d, c } = input.current;
    const space = input.current[" "];
    if (w) {
      camera.translateZ(-moveSpeed);
    }
    if (s) {
      camera.translateZ(moveSpeed);
    }
    if (a) {
      camera.translateX(-moveSpeed);
    }
    if (d) {
      camera.translateX(moveSpeed);
    }
    if (c) {
      camera.translateY(-moveSpeed);
    }
    if (space) {
      camera.translateY(moveSpeed);
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
