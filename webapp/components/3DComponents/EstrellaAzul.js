import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { getStarSize } from "../utils/physicsFunctions";

export const EstrellaAzul = ({ position, scale }) => {
  const startRotation = Math.random() * Math.PI;
  const starRef = useRef();
  const { nodes, materials } = useGLTF("/EstrellaAzul.gltf");
  var material = materials.MaterialBaked;
  material.toneMapped = false;

  useFrame(({ clock }) => {
    starRef.current.rotation.y = startRotation + clock.getElapsedTime() / 6;
  });

  return (
    <group position={position} dispose={null}>
      <mesh
        ref={starRef}
        geometry={nodes.EsferaBaked.geometry}
        material={material}
        material-emissive="white"
        material-emissiveIntensity={2}
        scale={getStarSize(scale)}
      ></mesh>
    </group>
  );
};

useGLTF.preload("/EstrellaAzul.gltf");
