import {
  EffectComposer,
  Select,
  Selection,
  SelectiveBloom,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import React from "react";
import { EstrellaAmarillaClara } from "../3DComponents/EstrellaAmarillaClara";
import { EstrellaAzul } from "../3DComponents/EstrellaAzul";
import { EstrellaAzulClara } from "../3DComponents/EstrellaAzulClara";
import { EstrellaBlanca } from "../3DComponents/EstrellaBlanca";
import { EstrellaNaranja } from "../3DComponents/EstrellaNaranja";
import { EstrellaRoja } from "../3DComponents/EstrellaRoja";
import { MiEstrella } from "../3DComponents/MiEstrella";
import { Stars } from "@react-three/drei";

export const StarClusterScene = ({ starCluster, ambientLight }) => {
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

  //Calculates mass center of a given star cluster
  const calculateMassCenter = (starCluster) => {
    var sumMass = 0;
    var xCD = 0;
    var yCD = 0;
    var zCD = 0;
    starCluster.forEach((star) => {
      sumMass = sumMass + parseFloat(star.mass_i);

      xCD = xCD + star.x * star.mass_i;
      yCD = yCD + star.y * star.mass_i;
      zCD = zCD + star.z * star.mass_i;
    });
    if (sumMass != 0) {
      return { x: xCD / sumMass, y: yCD / sumMass, z: zCD / sumMass };
    } else {
      return { x: 0, y: 0, z: 0 };
    }
  };

  //Returns the list of star 3D models of a star cluster
  const createStars = (starCluster) => {
    const massCenter = calculateMassCenter(starCluster);
    return (
      <>
        {starCluster.map((star, i) => {
          const x = (star.x - massCenter.x) * 125;
          const y = (star.y - massCenter.y) * 125;
          const z = (star.z - massCenter.z) * 125;
          const starTemp = 10 ** star.temp_i;
          const starLum = 10 ** star.lum_i;
          const starRadius = Math.sqrt(
            starLum / (boltz * starTemp ** 4 * 4 * Math.PI)
          );
          const starRadius2 = (solarTemp / starTemp) ** 2 * Math.sqrt(starLum);
          if (starRadius2 > 2) {
            console.log(
              "Temp: " +
                starTemp +
                "\nRadius: " +
                starRadius +
                "\nRadius2: " +
                starRadius2 +
                "\nMass: " +
                star.mass_i +
                "\nLum: " +
                star.lum_i
            );
          }

          if (starTemp > 12000) {
            return (
              <EstrellaAzul key={i} position={[x, y, z]} scale={star.mass_i} />
            );
          } else if (starTemp > brightBlueStarMinTemp) {
            return (
              <EstrellaAzulClara
                key={i}
                position={[x, y, z]}
                scale={star.mass_i}
              />
            );
          } else if (starTemp > whiteStarMinTemp) {
            return (
              <EstrellaBlanca
                key={i}
                position={[x, y, z]}
                scale={star.mass_i}
              />
            );
          } else if (starTemp > brightYellowStarMinTemp) {
            return (
              <EstrellaAmarillaClara
                key={i}
                position={[x, y, z]}
                scale={star.mass_i}
              />
            );
          } else if (starTemp > yellowStarMinTemp) {
            return (
              <MiEstrella key={i} position={[x, y, z]} scale={star.mass_i} />
            );
          } else if (starTemp > orangeStarMinTemp) {
            return (
              <EstrellaNaranja
                key={i}
                position={[x, y, z]}
                scale={star.mass_i}
              />
            );
          } else {
            return (
              <EstrellaRoja key={i} position={[x, y, z]} scale={star.mass_i} />
            );
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
      <Stars radius={10000} depth={5} count={1000} />
    </>
  );
};
