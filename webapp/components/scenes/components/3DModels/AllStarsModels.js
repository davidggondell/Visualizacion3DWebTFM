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
  const sol = useGLTF("/MiEstrella.glb");
  const roja = useGLTF("/EstrellaRoja.glb");
  const naranja = useGLTF("/EstrellaNaranja.glb");
  const blanca = useGLTF("/EstrellaBlanca.glb");
  const azulClara = useGLTF("/EstrellaAzulClara.glb");
  const azul = useGLTF("/EstrellaAzul.glb");
  const amarillaClara = useGLTF("/EstrellaAmarillaClara.glb");
  const classOActive = useSelector(getClassOActive);
  const classBActive = useSelector(getClassBActive);
  const classAActive = useSelector(getClassAActive);
  const classFActive = useSelector(getClassFActive);
  const classGActive = useSelector(getClassGActive);
  const classKActive = useSelector(getClassKActive);
  const classMActive = useSelector(getClassMActive);
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

  return (
    <>
      <StarInstances
        stars={classOStars}
        massCenter={massCenter}
        geometry={azul.nodes.EsferaBaked.geometry}
        material={azul.materials.MaterialBaked}
        active={allActive || classOActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classBStars}
        massCenter={massCenter}
        geometry={azulClara.nodes.EsferaBaked.geometry}
        material={azulClara.materials.MaterialBaked}
        active={allActive || classBActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classAStars}
        massCenter={massCenter}
        geometry={blanca.nodes.EsferaBaked.geometry}
        material={blanca.materials.MaterialBaked}
        active={allActive || classAActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classFStars}
        massCenter={massCenter}
        geometry={amarillaClara.nodes.EsferaBaked.geometry}
        material={amarillaClara.materials.MaterialBaked}
        active={allActive || classFActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classGStars}
        massCenter={massCenter}
        geometry={sol.nodes.EsferaBaked.geometry}
        material={sol.materials.MaterialBAKED}
        active={allActive || classGActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classKStars}
        massCenter={massCenter}
        geometry={naranja.nodes.EsferaBaked.geometry}
        material={naranja.materials.MaterialBaked}
        active={allActive || classKActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
      <StarInstances
        stars={classMStars}
        massCenter={massCenter}
        geometry={roja.nodes.EsferaBaked.geometry}
        material={roja.materials.MaterialBaked}
        active={allActive || classMActive}
        canClickRef={canClickRef}
        isDraggingRef={isDraggingRef}
      />
    </>
  );
};

useGLTF.preload("/MiEstrella.glb");
useGLTF.preload("/EstrellaRoja.glb");
useGLTF.preload("/EstrellaNaranja.glb");
useGLTF.preload("/EstrellaBlanca.glb");
useGLTF.preload("/EstrellaAzulClara.glb");
useGLTF.preload("/EstrellaAzul.glb");
useGLTF.preload("/EstrellaAmarillaClara.glb");
