import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { getStarSize } from "../utils/physicsFunctions";

export const EstrellaRoja = ({ position, scale }) => {
  const startRotation = Math.random() * Math.PI;
  const starRef = useRef();
  const { nodes, materials } = useGLTF("/EstrellaRoja.gltf");

  useFrame(({ clock }) => {
    starRef.current.rotation.y = startRotation + clock.getElapsedTime() / 6;
  });

  return (
    <group position={position} dispose={null}>
      <mesh
        ref={starRef}
        geometry={nodes.EsferaBaked.geometry}
        material={materials.MaterialBaked}
        material-emissive="white"
        material-emissiveIntensity={4}
        scale={getStarSize(scale)}
      ></mesh>
    </group>
  );
};

useGLTF.preload("/EstrellaRoja.gltf");
