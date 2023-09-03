import { EffectComposer, Selection, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import React, { memo, useRef, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { getStarZoom } from "../selectors";
import { AllStarsModels } from "./3DModels/AllStarsModels";

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
            intensity={0.6}
            kernelSize={KernelSize.VERY_SMALL}
            height={200}
            opacity={0.5}
          />
          <Suspense fallback={null}>
            <AllStarsModels stars={starCluster} canClickRef={canClickRef} isDraggingRef={dragging} />
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
