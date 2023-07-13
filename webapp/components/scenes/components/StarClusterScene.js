import { EffectComposer, Select, Selection, SelectiveBloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import React from "react";
import { EstrellaAmarillaClara } from "../../3DComponents/EstrellaAmarillaClara";
import { EstrellaAzul } from "../../3DComponents/EstrellaAzul";
import { EstrellaAzulClara } from "../../3DComponents/EstrellaAzulClara";
import { EstrellaBlanca } from "../../3DComponents/EstrellaBlanca";
import { EstrellaNaranja } from "../../3DComponents/EstrellaNaranja";
import { EstrellaRoja } from "../../3DComponents/EstrellaRoja";
import { MiEstrella } from "../../3DComponents/MiEstrella";
import { calculateMassCenter } from "../../utils/physicsFunctions";
import { Stars } from "@react-three/drei";

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

          if (star.Radius > 8) {
            console.log(star);
          }
          if (starTemp > 12000) {
            return <EstrellaAzul key={i} position={[x, y, z]} scale={star.Radius} />;
          } else if (starTemp > brightBlueStarMinTemp) {
            return <EstrellaAzulClara key={i} position={[x, y, z]} scale={star.Radius} />;
          } else if (starTemp > whiteStarMinTemp) {
            return <EstrellaBlanca key={i} position={[x, y, z]} scale={star.Radius} />;
          } else if (starTemp > brightYellowStarMinTemp) {
            return <EstrellaAmarillaClara key={i} position={[x, y, z]} scale={star.Radius} />;
          } else if (starTemp > yellowStarMinTemp) {
            return <MiEstrella key={i} position={[x, y, z]} scale={star.Radius} />;
          } else if (starTemp > orangeStarMinTemp) {
            return <EstrellaNaranja key={i} position={[x, y, z]} scale={star.Radius} />;
          } else {
            return <EstrellaRoja key={i} position={[x, y, z]} scale={star.Radius} />;
          }
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
            <MiEstrella key={1} position={[0, 0, 0]} scale={1} />
            {createStars(starCluster)}
          </Select>
        </EffectComposer>
      </Selection>
      {/* <Stars radius={10000} depth={5} count={1000} /> */}
    </>
  );
};
