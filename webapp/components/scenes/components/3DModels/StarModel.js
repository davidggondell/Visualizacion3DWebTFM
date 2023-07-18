import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  blueStarMinTemp,
  brightBlueStarMinTemp,
  brightYellowStarMinTemp,
  getStarSize,
  orangeStarMinTemp,
  whiteStarMinTemp,
  yellowStarMinTemp,
} from "../../../utils/physicsFunctions";
import { setNewStarZoom } from "../../actions";
import { useDispatch } from "react-redux";
import * as THREE from "three";

export const StarModel = ({ position, scale, temperature, starId, mass, canClickRef }) => {
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

  const starModelValues = useMemo(() => {
    if (temperature > blueStarMinTemp) {
      const { nodes, materials } = azul;
      var material = materials.MaterialBaked;
      material.toneMapped = false;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: material,
        emissive: "white",
        emissiveIntensity: 2,
        toneMapped: true,
      };
    } else if (temperature > brightBlueStarMinTemp) {
      const { nodes, materials } = azulClara;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBaked,
        emissive: "white",
        emissiveIntensity: 0.5,
        toneMapped: true,
      };
    } else if (temperature > whiteStarMinTemp) {
      const { nodes, materials } = blanca;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBaked,
        emissive: "white",
        emissiveIntensity: 0.2,
        toneMapped: false,
      };
    } else if (temperature > brightYellowStarMinTemp) {
      const { nodes, materials } = amarillaClara;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBaked,
        emissive: "white",
        emissiveIntensity: 0.5,
        toneMapped: true,
      };
    } else if (temperature > yellowStarMinTemp) {
      const { nodes, materials } = sol;
      return {
        geometry: nodes.EsferaBaked.geometry,
        material: materials.MaterialBAKED,
        emissive: "white",
        emissiveIntensity: 0.5,
        toneMapped: true,
      };
    } else if (temperature > orangeStarMinTemp) {
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
        emissive: "white",
        emissiveIntensity: 4,
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
          if (canClickRef?.current) {
            event.stopPropagation();
            var cameraPosition = camera.position;
            var rotation = camera.rotation.clone();
            var direction = new THREE.Vector3(0, 0, -1);
            direction.applyEuler(rotation);
            var coordinates = cameraPosition.clone().add(direction);
            console.log(starId);
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
