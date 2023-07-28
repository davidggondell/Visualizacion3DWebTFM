import { EffectComposer, Select, Selection, SelectiveBloom, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import React, { memo, useRef, useEffect } from "react";
import { calculateMassCenter } from "../../utils/physicsFunctions";
import { Stars } from "@react-three/drei";
import { StarModel } from "./3DModels/StarModel";
import { useSelector } from "react-redux";
import { getStarZoom } from "../selectors";

//Suns temperature in Kelvin
const solarTemp = 5778;
const solarLum = 3.828 * 10 ** 26;
const boltz = 5.67037 * 10 ** -8;

const CreateStars = memo(({ starCluster, canClickRef }) => {
  const massCenter = calculateMassCenter(starCluster);
  return (
    <>
      {starCluster.map((star, i) => {
        const x = (star.x - massCenter.x) * 200;
        const y = (star.y - massCenter.y) * 200;
        const z = (star.z - massCenter.z) * 200;
        const starTemp = 10 ** star.temp_i;

        return (
          <StarModel
            key={i}
            position={[x, y, z]}
            scale={star.Radius ? star.Radius : star.mass_i}
            temperature={starTemp}
            starId={star.ID}
            mass={star.mass_i}
            canClickRef={canClickRef}
          />
        );
      })}
    </>
  );
});

const Composition = memo(({ starCluster, ambientLight, canClickRef }) => {
  return (
    <>
      <Selection>
        <EffectComposer disableNormalPass={true}>
          {/* <SelectiveBloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.5} intensity={0.4} />
          <SelectiveBloom
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            intensity={1}
            kernelSize={KernelSize.VERY_SMALL}
            height={300}
            opacity={1}
          />
          */}
          {/* <Select enabled={true}> */}
          <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.5} intensity={0.4} />
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            intensity={1}
            kernelSize={KernelSize.VERY_SMALL}
            height={300}
            opacity={1}
          />
          <StarModel
            key={1}
            position={[0, 0, 0]}
            scale={1}
            temperature={solarTemp}
            canClickRef={canClickRef}
            starId={1}
            mass={1}
          />
          <CreateStars starCluster={starCluster} canClickRef={canClickRef} />
          {/* //</Select> */}
        </EffectComposer>
      </Selection>
      {/* <Stars radius={10000} depth={5} count={1000} /> */}
    </>
  );
});

export const StarClusterScene = ({ starCluster, ambientLight }) => {
  const starZoom = useSelector(getStarZoom);
  const canClickRef = useRef(null);

  useEffect(() => {
    canClickRef.current = starZoom == null;
  }, [starZoom]);

  return <Composition starCluster={starCluster} ambientLight={ambientLight} canClickRef={canClickRef} />;
};
