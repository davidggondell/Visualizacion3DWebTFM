import React, { useEffect, useState, useRef } from "react";
import { OrbitControls, Stats } from "@react-three/drei";
import { Box } from "@mui/material";
import { MiEstrella } from "../components/3DComponents/MiEstrella";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  SelectiveBloom,
  Selection,
  Select,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { EstrellaAzul } from "../components/3DComponents/EstrellaAzul";
import { EstrellaAzulClara } from "../components/3DComponents/EstrellaAzulClara";
import { EstrellaBlanca } from "../components/3DComponents/EstrellaBlanca";
import { EstrellaAmarillaClara } from "../components/3DComponents/EstrellaAmarillaClara";
import { EstrellaNaranja } from "../components/3DComponents/EstrellaNaranja";
import { EstrellaRoja } from "../components/3DComponents/EstrellaRoja";

export default function Home() {
  const ambientLight = useRef(null);

  const createStars = () => {
    const copyArray = new Array(1500).fill();
    return (
      <>
        {copyArray.map((j, i) => {
          const x = Math.floor(Math.random() * 300) - 150;
          const y = Math.floor(Math.random() * 300) - 150;
          const z = Math.floor(Math.random() * 300) - 150;
          if (i % 7 == 0) {
            return <MiEstrella key={i} position={[x, y, z]} />;
          } else if (i % 7 == 1) {
            return <EstrellaAzul key={i} position={[x, y, z]} />;
          } else if (i % 7 == 2) {
            return <EstrellaAzulClara key={i} position={[x, y, z]} />;
          } else if (i % 7 == 3) {
            return <EstrellaBlanca key={i} position={[x, y, z]} />;
          } else if (i % 7 == 4) {
            return <EstrellaAmarillaClara key={i} position={[x, y, z]} />;
          } else if (i % 7 == 5) {
            return <EstrellaNaranja key={i} position={[x, y, z]} />;
          } else {
            return <EstrellaRoja key={i} position={[x, y, z]} />;
          }
        })}
      </>
    );
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.4} ref={ambientLight} />
        <MiEstrella />
        <Stats />
        <Selection>
          <EffectComposer multisampling={0} disableNormalPass={true}>
            <SelectiveBloom
              mipmapBlur
              lights={[ambientLight]}
              luminanceThreshold={0}
              luminanceSmoothing={0.5}
              intensity={1}
              kernelSize={KernelSize.VERY_SMALL}
              height={300}
              opacity={1}
            />
            <Select enabled={true}>{createStars()}</Select>
          </EffectComposer>
        </Selection>
      </Canvas>
    </Box>
  );
}
