import { Instances } from "@react-three/drei";
import React from "react";
import { Star } from "./Star";

export const StarInstances = ({ stars, massCenter, geometry, material, active, canClickRef, isDraggingRef }) => {
  return (
    <>
      <Instances limit={stars?.length} range={stars?.length} geometry={geometry} material={material} visible={active}>
        {stars?.map((star) => (
          <Star
            key={star.ID}
            star={star}
            massCenter={massCenter}
            canClickRef={canClickRef}
            isDraggingRef={isDraggingRef}
          />
        ))}
      </Instances>
    </>
  );
};
