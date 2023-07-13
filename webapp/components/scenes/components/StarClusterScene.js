import { EffectComposer, Select, Selection, SelectiveBloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import React from "react";
import { calculateMassCenter } from "../../utils/physicsFunctions";
import { Stars } from "@react-three/drei";
import { StarModel } from "./3DModels/StarModel";

const blueStarMinTemp = 33000;
const brightBlueStarMinTemp = 10000;
const whiteStarMinTemp = 7500;
const brightYellowStarMinTemp = 6000;
const yellowStarMinTemp = 5200;
const orangeStarMinTemp = 3700;
//Suns temperature in Kelvin
const solarTemp = 5778;
const solarLum = 3.828 * 10 ** 26;
const boltz = 5.67037 * 10 ** -8;

export const StarClusterScene = ({ starCluster, ambientLight }) => {
  //Returns the list of star 3D models of a star cluster
  const createStars = (starCluster) => {
    const massCenter = calculateMassCenter(starCluster);
    return (
      <>
        {starCluster.map((star, i) => {
          const x = (star.x - massCenter.x) * 200;
          const y = (star.y - massCenter.y) * 200;
          const z = (star.z - massCenter.z) * 200;
          const starTemp = 10 ** star.temp_i;

          return <StarModel key={i} position={[x, y, z]} scale={star.Radius} temperature={starTemp} />;
        })}
      </>
    );
  };
  return (
    <>
      <Selection>
        <EffectComposer disableNormalPass={true}>
          <SelectiveBloom
            lights={[ambientLight]}
            mipmapBlur
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            intensity={0.4}
          />
          <SelectiveBloom
            lights={[ambientLight]}
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            intensity={1}
            kernelSize={KernelSize.VERY_SMALL}
            height={300}
            opacity={1}
          />
          <Select enabled={true}>
            <StarModel key={1} position={[0, 0, 0]} scale={1} temperature={solarTemp} />
            {createStars(starCluster)}
          </Select>
        </EffectComposer>
      </Selection>
      {/* <Stars radius={10000} depth={5} count={1000} /> */}
    </>
  );
};
