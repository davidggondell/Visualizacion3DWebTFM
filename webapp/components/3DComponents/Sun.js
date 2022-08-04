import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

import React from "react";

export const Sun = () => {
  const gltf = useLoader(GLTFLoader, "/Earth.gltf");
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} scale={[0.01, 0.01, 0.01]} />
    </Suspense>
  );
};
