import { Instances } from "@react-three/drei";
import React from "react";
import { Star } from "./Star";
import { getMassFilter, getTemperatureFilter } from "../../../UIComponents/selectors";
import { useSelector } from "react-redux";
import { sliderTypes } from "../../../UIComponents/components/SliderTypePicker";

const filterTemperature = (temperature, temperatureFilterType, temperatureFilterValue) => {
  if (temperatureFilterType == sliderTypes.activated) {
    return temperature < temperatureFilterValue[0] || temperature > temperatureFilterValue[1];
  } else if (temperatureFilterType == sliderTypes.inverted) {
    return temperature > temperatureFilterValue[0] && temperature < temperatureFilterValue[1];
  } else {
    return false;
  }
};

const filterMass = (mass, massFilterType, massFilterValue) => {
  if (massFilterType == sliderTypes.activated) {
    return mass < massFilterValue[0] || mass > massFilterValue[1];
  }
  if (massFilterType == sliderTypes.inverted) {
    return mass > massFilterValue[0] && mass < massFilterValue[1];
  }
  return false;
};

export const StarInstances = ({ stars, massCenter, geometry, material, active, canClickRef, isDraggingRef }) => {
  const temperatureFilter = useSelector(getTemperatureFilter);
  const massFilter = useSelector(getMassFilter);

  return (
    <>
      <Instances limit={stars?.length} range={stars?.length} geometry={geometry} material={material} visible={active}>
        {stars?.map((star) => {
          if (
            !filterTemperature(10 ** star.temp_i, temperatureFilter.type, temperatureFilter.value) &&
            !filterMass(star.mass_i, massFilter.type, massFilter.value)
          ) {
            return (
              <Star
                key={star.ID}
                star={star}
                massCenter={massCenter}
                canClickRef={canClickRef}
                isDraggingRef={isDraggingRef}
              />
            );
          } else {
            return null;
          }
        })}
      </Instances>
    </>
  );
};
