import { Box, Button } from "@mui/material";
import { Physics } from "@react-three/cannon";
import {
  AdaptiveDpr,
  PerspectiveCamera,
  Stats,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { Player } from "../components/sceneObjects/Player";
import { StarClusterScene } from "../components/scenes/StarClusterScene";
import pleyades from "../public/pleyades_edr3_filtered.json";
import { useDrag, useWheel, usePinch, createUseGesture, dragAction, pinchAction, wheelAction } from "@use-gesture/react";

const useGesture = createUseGesture([dragAction, pinchAction, wheelAction])

export default function Home() {
  const ambientLight = useRef(null);
  const cameraRef = useRef(null);
  const canvasRef = React.useRef(null);
  const drag = useRef({ x: 0, y: 0, down: false });

  useEffect(() => {
    const handler = e => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  useGesture(
    {
      onDrag: ({ down, pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel();
        drag.current = { down: down, x: x, y: y };
      },
      onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
        if (first) {
          console.log(
            "ox: " +
            ox +
            "\noy: " +
            oy +
            "\nms: " +
            ms +
            "\ns: " +
            s +
            "\na: " +
            a +
            "\nmemo: " +
            memo
          );
          s = 1
        }
      },
      onWheel: ({ event, offset: [, y], direction: [, dy] }) => {
        console.log("event: " + event);
        console.log("y: " + y);
        console.log("dy: " + dy);
      }
    }, {
    target: canvasRef
  });

  // const dragBind = useDrag(({ pinching, down, movement: [x, y] }) => {
  //   if (pinching) return cancel();
  //   drag.current = { down: down, x: x, y: y };
  // });

  // const wheelBind = useWheel(({ event, offset: [, y], direction: [, dy] }) => {
  //   console.log("event: " + event);
  //   console.log("y: " + y);
  //   console.log("dy: " + dy);
  // });

  // const pinchBind = usePinch(
  //   ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
  //     if (first) {
  //       console.log(
  //         "ox: " +
  //         ox +
  //         "\noy: " +
  //         oy +
  //         "\nms: " +
  //         ms +
  //         "\ns: " +
  //         s +
  //         "\na: " +
  //         a +
  //         "\nmemo: " +
  //         memo
  //       );
  //     }
  //     return memo;
  //   }
  // );

  return (
    <Box sx={{ width: "100vw", height: "100%", backgroundColor: "#000000" }}>
      <Canvas ref={canvasRef}>
        {/* <OrbitControls /> */}
        {/* <OrbitControls enableRotate={false} /> */}
        {/* <FlyControls dragToLook={false} movementSpeed={10} rollSpeed={1} /> */}
        <ambientLight intensity={0.4} ref={ambientLight} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} far={100000} />
        <Physics>
          <Player dragInput={drag} />
        </Physics>
        <Stats />
        <StarClusterScene starCluster={pleyades} ambientLight={ambientLight} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </Box>
  );
}
