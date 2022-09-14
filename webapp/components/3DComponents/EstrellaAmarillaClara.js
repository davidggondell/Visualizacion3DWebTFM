import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const EstrellaAmarillaClara = (props) => {
  const startRotation = Math.random() * Math.PI;
  const starRef = useRef();
  const { nodes, materials } = useGLTF("/EstrellaAmarillaClara.gltf");

  useFrame(({ clock }) => {
    starRef.current.rotation.y = startRotation + clock.getElapsedTime() / 6;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={starRef}
        geometry={nodes.EsferaBaked.geometry}
        material={materials.MaterialBaked}
        material-emissive="white"
        material-emissiveIntensity={0.5}
        scale={3}
      ></mesh>
    </group>
  );
};

useGLTF.preload("/EstrellaAmarillaClara.gltf");
