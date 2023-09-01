import { EffectComposer, Selection, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import React, { memo, useRef, useEffect, Suspense } from "react";
import { calculateMassCenter, cartesianCoordinatesToRenderCoordinates } from "../../utils/physicsFunctions";
import { StarModel } from "./3DModels/StarModel";
import { useSelector } from "react-redux";
import { getStarZoom } from "../selectors";

//Suns temperature in Kelvin
const solarTemp = 5778;
const solarLum = 3.828 * 10 ** 26;
const boltz = 5.67037 * 10 ** -8;

const CreateStars = memo(({ starCluster, canClickRef, isDraggingRef }) => {
  const massCenter = calculateMassCenter(starCluster);
  return (
    <>
      {starCluster.map((star) => {
        const { x, y, z } = cartesianCoordinatesToRenderCoordinates(star.x, star.y, star.z, massCenter);
        const starTemp = 10 ** star.temp_i;

        return (
          <StarModel
            key={star.ID}
            position={[x, y, z]}
            scale={star.Radius ? star.Radius : star.mass_i}
            coordinates={{ x: star.x, y: star.y, z: star.z }}
            temperature={starTemp}
            starId={star.ID}
            mass={star.mass_i}
            pm_ra={star.PMRA}
            pm_dec={star.PMDEC}
            radial_velocity={star.vRad}
            massCenter={massCenter}
            canClickRef={canClickRef}
            isDraggingRef={isDraggingRef}
          />
        );
      })}
    </>
  );
});

const Composition = memo(({ starCluster, canClickRef }) => {
  const mDown = useRef(false);
  const dragging = useRef(false);

  useEffect(() => {
    const mouseDown = () => {
      mDown.current = true;
      dragging.current = false;
    };
    const mouseMove = () => {
      if (mDown.current) {
        dragging.current = true;
      }
    };
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    return () => {
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <>
      <Selection>
        <EffectComposer disableNormalPass={true}>
          <Bloom mipmapBlur luminanceThreshold={0} luminanceSmoothing={0.5} intensity={0.4} />
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            intensity={1}
            kernelSize={KernelSize.VERY_SMALL}
            height={300}
            opacity={1}
          />
          <Suspense fallback={null}>
            <CreateStars starCluster={starCluster} canClickRef={canClickRef} isDraggingRef={dragging} />
          </Suspense>
        </EffectComposer>
      </Selection>
    </>
  );
});

export const StarClusterScene = ({ starCluster }) => {
  const starZoom = useSelector(getStarZoom);
  const canClickRef = useRef(null);

  useEffect(() => {
    canClickRef.current = starZoom == null;
  }, [starZoom]);

  return <Composition starCluster={starCluster} canClickRef={canClickRef} />;
};
