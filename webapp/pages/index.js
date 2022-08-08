import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { Box } from "@mui/material";
import { EarthAnimated } from "../components/3DComponents/EarthAnimated";

export default function Home() {
  const createEarths = () => {
    const copyArray = new Array(1500).fill();
    return (
      <>
        {copyArray.map((j, i) => {
          const x = Math.floor(Math.random() * 300) - 150;
          const y = Math.floor(Math.random() * 300) - 150;
          const z = Math.floor(Math.random() * 300) - 150;
          return <EarthAnimated key={i} position={[x, y, z]} />;
        })}
      </>
    );
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <EarthAnimated />
        {createEarths()}
        <Stats />
      </Canvas>
    </Box>
  );
}
