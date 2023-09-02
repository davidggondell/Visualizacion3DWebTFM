import { Instances } from "@react-three/drei";
import React from "react";
import { Star } from "./Star";
import { useMemo } from "react";

export const StarInstances = ({
  stars,
  massCenter,
  geometry,
  material,
  emissive,
  emissiveIntensity,
  toneMapped,
  active,
  canClickRef,
  isDraggingRef,
}) => {
  const dividedStarsArray = useMemo(() => {
    const size = Math.floor(stars.length / 100);
    if (!size) {
      return [stars];
    }
    const dividedStarsArray = [];
    for (var i = 0; i <= size; i++) {
      dividedStarsArray.push(stars.slice(i * 100, (i + 1) * 100));
    }
    return dividedStarsArray;
  }, [stars]);
  return (
    <>
      {dividedStarsArray.map((starsSlice, index) => (
        <Instances
          key={index}
          limit={starsSlice?.length}
          range={starsSlice?.length}
          geometry={geometry}
          material={material}
          visible={active}
        >
          {starsSlice?.map((star) => {
            console.log("Estrella");
            return (
              <Star
                key={star.ID}
                star={star}
                massCenter={massCenter}
                canClickRef={canClickRef}
                isDraggingRef={isDraggingRef}
              />
            );
          })}
        </Instances>
      ))}
    </>
  );
};
