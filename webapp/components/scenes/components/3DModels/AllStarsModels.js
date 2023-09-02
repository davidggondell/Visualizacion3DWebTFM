import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { calculateMassCenter, getStarClass, starClasses } from "../../../utils/physicsFunctions";
import { useSelector } from "react-redux";
import {
  getClassAActive,
  getClassBActive,
  getClassFActive,
  getClassGActive,
  getClassKActive,
  getClassMActive,
  getClassOActive,
} from "../../../UIComponents/selectors";
import { StarInstances } from "./StarInstances";

const separateStarsInClasses = (stars) => {
  const classOStars = [];
  const classBStars = [];
  const classAStars = [];
  const classFStars = [];
  const classGStars = [];
  const classKStars = [];
  const classMStars = [];
  stars?.forEach((star) => {
    const starClass = getStarClass(10 ** star.temp_i);
    if (starClass == starClasses.O) {
      classOStars.push(star);
    } else if (starClass == starClasses.B) {
      classBStars.push(star);
    } else if (starClass == starClasses.A) {
      classAStars.push(star);
    } else if (starClass == starClasses.F) {
      classFStars.push(star);
    } else if (starClass == starClasses.G) {
      classGStars.push(star);
    } else if (starClass == starClasses.K) {
      classKStars.push(star);
    } else {
      classMStars.push(star);
    }
  });
  return { classOStars, classBStars, classAStars, classFStars, classGStars, classKStars, classMStars };
};

export const AllStarsModels = ({ stars, canClickRef, isDraggingRef }) => {
  const sol = useGLTF("/MiEstrella.gltf");
  const roja = useGLTF("/EstrellaRoja.gltf");
  const naranja = useGLTF("/EstrellaNaranja.gltf");
  const blanca = useGLTF("/EstrellaBlanca.gltf");
  const azulClara = useGLTF("/EstrellaAzulClara.gltf");
  const azul = useGLTF("/EstrellaAzul.gltf");
  const amarillaClara = useGLTF("/EstrellaAmarillaClara.gltf");
  const classOActive = useSelector(getClassOActive);
  const classBActive = useSelector(getClassBActive);
  const classAActive = useSelector(getClassAActive);
  const classFActive = useSelector(getClassFActive);
  const classGActive = useSelector(getClassGActive);
  const classKActive = useSelector(getClassKActive);
  const classMActive = useSelector(getClassMActive);
  var classOMaterial = azul.materials.MaterialBaked;
  classOMaterial.toneMapped = false;
  const allActive = useMemo(
    () =>
      !classOActive &&
      !classBActive &&
      !classAActive &&
      !classFActive &&
      !classGActive &&
      !classKActive &&
      !classMActive,
    [classOActive, classBActive, classAActive, classFActive, classGActive, classKActive, classMActive],
  );
  const { classOStars, classBStars, classAStars, classFStars, classGStars, classKStars, classMStars } = useMemo(
    () => separateStarsInClasses(stars),
    [stars],
  );
  const massCenter = useMemo(() => calculateMassCenter(stars), [stars]);
  console.log(massCenter);
  if (!massCenter) return null;
  console.log({ classOStars, classBStars, classAStars, classFStars, classGStars, classKStars, classMStars });

  return (
    <>
      <StarInstances
        stars={classOStars}
        massCenter={massCenter}
        geometry={azul.nodes.EsferaBaked.geometry}
        material={classOMaterial}
        emissive="cyan"
        emissiveIntensity={1}
        toneMapped={true}
        active={allActive || classOActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classBStars}
        massCenter={massCenter}
        geometry={azulClara.nodes.EsferaBaked.geometry}
        material={azulClara.materials.MaterialBaked}
        emissive="cyan"
        emissiveIntensity={0.1}
        toneMapped={false}
        active={allActive || classBActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classAStars}
        massCenter={massCenter}
        geometry={blanca.nodes.EsferaBaked.geometry}
        material={blanca.materials.MaterialBaked}
        emissive="#bbffff"
        emissiveIntensity={0.2}
        toneMapped={false}
        active={allActive || classAActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classFStars}
        massCenter={massCenter}
        geometry={amarillaClara.nodes.EsferaBaked.geometry}
        material={amarillaClara.materials.MaterialBaked}
        emissive="white"
        emissiveIntensity={0.5}
        toneMapped={true}
        active={allActive || classFActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classGStars}
        massCenter={massCenter}
        geometry={sol.nodes.EsferaBaked.geometry}
        material={sol.materials.MaterialBAKED}
        emissive="white"
        emissiveIntensity={0.5}
        toneMapped={true}
        active={allActive || classGActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classKStars}
        massCenter={massCenter}
        geometry={naranja.nodes.EsferaBaked.geometry}
        material={naranja.materials.MaterialBaked}
        emissive="grey"
        emissiveIntensity={2.8}
        toneMapped={true}
        active={allActive || classKActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classMStars}
        massCenter={massCenter}
        geometry={roja.nodes.EsferaBaked.geometry}
        material={roja.materials.MaterialBaked}
        emissive="red"
        emissiveIntensity={2}
        toneMapped={true}
        active={allActive || classMActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
    </>
  );
};

useGLTF.preload("/MiEstrella.gltf");
useGLTF.preload("/EstrellaRoja.gltf");
useGLTF.preload("/EstrellaNaranja.gltf");
useGLTF.preload("/EstrellaBlanca.gltf");
useGLTF.preload("/EstrellaAzulClara.gltf");
useGLTF.preload("/EstrellaAzul.gltf");
useGLTF.preload("/EstrellaAmarillaClara.gltf");
