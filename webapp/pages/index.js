import { Box, Button } from "@mui/material";
import { Physics } from "@react-three/cannon";
import { AdaptiveDpr, PerspectiveCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { Player } from "../components/sceneObjects/Player";
import { StarClusterScene } from "../components/scenes/StarClusterScene";
import pleyades from "../public/pleyades_edr3_filtered.json";

export default function Home() {
  const ambientLight = useRef(null);
  const cameraRef = useRef(null);
  const stop = useRef(true);
  const degx = useRef(0);
  const degy = useRef(0);
  const degz = useRef(0);

  return (
    <Box sx={{ width: "100vw", height: "100%", backgroundColor: "#000000" }}>
      <Button
        sx={{ marginLeft: 10, position: "absolute", zIndex: 1000 }}
        onClick={() => (stop.current = !stop.current)}
      >
        Stop
      </Button>
      <Button
        sx={{ marginLeft: 50, position: "absolute", zIndex: 1000 }}
        onClick={() => {
          degx.current = (degx.current + 90) % 360;
          console.log("x: " + degx.current + "\ny: " + degy.current + "\nz: " + degz.current);
        }}
      >
        X
      </Button>
      <Button
        sx={{ marginLeft: 100, position: "absolute", zIndex: 1000 }}
        onClick={() => {
          degy.current = (degy.current + 90) % 360;
          console.log("x: " + degx.current + "\ny: " + degy.current + "\nz: " + degz.current);
        }}
      >
        Y
      </Button>
      <Button
        sx={{ marginLeft: 150, position: "absolute", zIndex: 1000 }}
        onClick={() => {
          degz.current = (degz.current + 90) % 360;
          console.log("x: " + degx.current + "\ny: " + degy.current + "\nz: " + degz.current);
        }}
      >
        Z
      </Button>
      <Canvas>
        {/* <OrbitControls /> */}
        {/* <OrbitControls enableRotate={false} /> */}
        {/* <FlyControls dragToLook={false} movementSpeed={10} rollSpeed={1} /> */}
        <ambientLight intensity={0.4} ref={ambientLight} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} far={100000} />
        <Physics>
          <Player stop={stop} degx={degx} degy={degy} degz={degz} />
        </Physics>
        <Stats />
        <StarClusterScene starCluster={pleyades} ambientLight={ambientLight} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </Box>
  );
}
