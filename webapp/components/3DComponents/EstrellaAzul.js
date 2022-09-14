import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const EstrellaAzul = (props) => {
  const startRotation = Math.random() * Math.PI;
  const starRef = useRef();
  const { nodes, materials } = useGLTF("/EstrellaAzul.gltf");
  var material = materials.MaterialBaked;
  material.toneMapped = false;

  useFrame(({ clock }) => {
    starRef.current.rotation.y = startRotation + clock.getElapsedTime() / 6;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={starRef}
        geometry={nodes.EsferaBaked.geometry}
        material={material}
        material-emissive="white"
        material-emissiveIntensity={2}
        scale={3}
      ></mesh>
    </group>
  );
};

useGLTF.preload("/EstrellaAzul.gltf");
