import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const EstrellaBlanca = ({ position, scale }) => {
  const startRotation = Math.random() * Math.PI;
  const starRef = useRef();
  const { nodes, materials } = useGLTF("/EstrellaBlanca.gltf");

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
        material-emissiveIntensity={0.3}
        material-toneMapped={false}
        scale={2 * scale}
      ></mesh>
    </group>
  );
};

useGLTF.preload("/EstrellaBlanca.gltf");
