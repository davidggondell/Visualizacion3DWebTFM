import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { getStarClass, getStarSize, starClasses } from "../../../utils/physicsFunctions";
import { setNewStarZoom } from "../../actions";
import { useDispatch } from "react-redux";
import * as THREE from "three";
import { useEffect } from "react";

export const StarModel = ({ position, scale, temperature, starId, mass, canClickRef, isDraggingRef }) => {
  const { camera } = useThree();
  const dispatch = useDispatch();
  const startRotation = Math.random() * Math.PI;
  const starSize = getStarSize(scale);
  const starRef = useRef();
  const sol = useGLTF("/MiEstrella.gltf");
  const roja = useGLTF("/EstrellaRoja.gltf");
  const naranja = useGLTF("/EstrellaNaranja.gltf");
  const blanca = useGLTF("/EstrellaBlanca.gltf");
  const azulClara = useGLTF("/EstrellaAzulClara.gltf");
  const azul = useGLTF("/EstrellaAzul.gltf");
  const amarillaClara = useGLTF("/EstrellaAmarillaClara.gltf");

  useEffect(() => {}, [starRef]);

  const starModelValues = useMemo(() => {
    if (getStarClass(temperature) == starClasses.O) {
      const { nodes, materials } = azul;
      var material = materials.MaterialBaked;
      material.toneMapped = false;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: material,
        emissive: "cyan",
        emissiveIntensity: 1.5,
        toneMapped: true,
      };
    } else if (getStarClass(temperature) == starClasses.B) {
      const { nodes, materials } = azulClara;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBaked,
        emissive: "cyan",
        emissiveIntensity: 0.3,
        toneMapped: true,
      };
    } else if (getStarClass(temperature) == starClasses.A) {
      const { nodes, materials } = blanca;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBaked,
        emissive: "cyan",
        emissiveIntensity: 0.2,
        toneMapped: false,
      };
    } else if (getStarClass(temperature) == starClasses.F) {
      const { nodes, materials } = amarillaClara;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBaked,
        emissive: "white",
        emissiveIntensity: 0.5,
        toneMapped: true,
      };
    } else if (getStarClass(temperature) == starClasses.G) {
      const { nodes, materials } = sol;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBAKED,
        emissive: "white",
        emissiveIntensity: 0.5,
        toneMapped: true,
      };
    } else if (getStarClass(temperature) == starClasses.K) {
      const { nodes, materials } = naranja;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBaked,
        emissive: "grey",
        emissiveIntensity: 2.8,
        toneMapped: true,
      };
    } else {
      const { nodes, materials } = roja;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBaked,
        emissive: "red",
        emissiveIntensity: 3.5,
        toneMapped: true,
      };
    }
  }, []);

  useFrame(({ clock }) => {
    starRef.current.rotation.y = startRotation + clock.getElapsedTime() / 4;
  });

  return (
    <group position={position} dispose={null}>
      <mesh
        ref={starRef}
        geometry={starModelValues.geometry}
        material={starModelValues.material}
        material-emissive={starModelValues.emissive}
        material-emissiveIntensity={starModelValues.emissiveIntensity}
        material-toneMapped={starModelValues.toneMapped}
        scale={starSize}
        onClick={(event) => {
          if (canClickRef?.current && !isDraggingRef.current) {
            event.stopPropagation();
            var cameraPosition = camera.position;
            var rotation = camera.rotation.clone();
            var direction = new THREE.Vector3(0, 0, -1);
            direction.applyEuler(rotation);
            var coordinates = cameraPosition.clone().add(direction);
            setNewStarZoom(dispatch, {
              position: position,
              cameraPosition: cameraPosition.toArray(),
              pointAhead: coordinates.toArray(),
              modelSize: starSize,
              starSize: scale,
              starId: starId,
              mass: mass,
              temperature: temperature,
              obsolete: false,
            });
          }
        }}
      />
    </group>
  );
};

useGLTF.preload("/MiEstrella.gltf");
useGLTF.preload("/EstrellaRoja.gltf");
useGLTF.preload("/EstrellaNaranja.gltf");
useGLTF.preload("/EstrellaBlanca.gltf");
useGLTF.preload("/EstrellaAzulClara.gltf");
useGLTF.preload("/EstrellaAzul.gltf");
useGLTF.preload("/EstrellaAmarillaClara.gltf");
