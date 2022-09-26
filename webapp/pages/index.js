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
  const stop = useRef(false);

  return (
    <Box sx={{ width: "100vw", height: "100%", backgroundColor: "#000000" }}>
      <Button
        sx={{ marginLeft: 10, position: "absolute", zIndex: 1000 }}
        onClick={() => (stop.current = !stop.current)}
      >
        Stop
      </Button>
      <Canvas>
        {/* <OrbitControls /> */}
        {/* <OrbitControls enableRotate={false} /> */}
        {/* <FlyControls dragToLook={false} movementSpeed={10} rollSpeed={1} /> */}
        <ambientLight intensity={0.4} ref={ambientLight} />
        <PerspectiveCamera makeDefault position={[5, 0, 0]} far={100000} />
        <Physics>
          <Player stop={stop} />
        </Physics>
        <Stats />
        <StarClusterScene starCluster={pleyades} ambientLight={ambientLight} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </Box>
  );
}
