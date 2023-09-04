import { useFrame, useThree } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { RootUIContext } from "../../../UIComponents/RootUIContext";
import React, { useContext, useMemo, useRef } from "react";
import {
  applySpaceMotion,
  cartesianCoordinatesToRenderCoordinates,
  getStarSize,
} from "../../../utils/physicsFunctions";
import { Instance } from "@react-three/drei";
import * as THREE from "three";
import { setNewStarZoom } from "../../actions";
import { useEffect } from "react";

export const Star = ({ star, massCenter, canClickRef, isDraggingRef }) => {
  if (!massCenter) return null;
  const dispatch = useDispatch();
  const { camera } = useThree();
  const starYear = useRef(0);
  const starRef = useRef();
  const { yearRef } = useContext(RootUIContext);
  const starSize = useMemo(() => getStarSize(star.Radius), [star]);
  const starTemp = useMemo(() => 10 ** star.temp_i, [star]);
  const startRotation = useMemo(() => Math.random() * Math.PI, []);
  const starPosition = useMemo(() => {
    return cartesianCoordinatesToRenderCoordinates(star.x, star.y, star.z, massCenter);
  }, [star, massCenter]);

  useEffect(() => {
    if (starRef.current) {
      starRef.current.rotation.y = startRotation;
    }
  }, [starRef]);

  useFrame(({ clock }) => {
    starRef.current.rotation.y = startRotation + clock.getElapsedTime() / 4;
    if (starYear.current != yearRef.current) {
      starYear.current = yearRef.current;
      const newCoords = applySpaceMotion(star.x, star.y, star.z, star.PMRA, star.PMDEC, star.vRad, yearRef.current);

      const newCoordsRender = cartesianCoordinatesToRenderCoordinates(
        newCoords.x,
        newCoords.y,
        newCoords.z,
        massCenter,
      );

      starRef.current.position.x = newCoordsRender.x;
      starRef.current.position.y = newCoordsRender.y;
      starRef.current.position.z = newCoordsRender.z;
    }
  });

  return (
    <group>
      <Instance
        ref={starRef}
        position={[starPosition.x, starPosition.y, starPosition.z]}
        scale={starSize}
        onClick={(event) => {
          if (canClickRef?.current && !isDraggingRef.current) {
            event.stopPropagation();
            var cameraPosition = camera.position;
            var rotation = camera.rotation.clone();
            var direction = new THREE.Vector3(0, 0, -1);
            direction.applyEuler(rotation);
            var ahead = cameraPosition.clone().add(direction);
            setNewStarZoom(dispatch, {
              position: [starRef.current.position.x, starRef.current.position.y, starRef.current.position.z],
              cameraPosition: cameraPosition.toArray(),
              pointAhead: ahead.toArray(),
              modelSize: starSize,
              coordinates: { x: star.x, y: star.y, z: star.z },
              starSize: star.Radius,
              starId: star.ID,
              mass: star.mass_i,
              temperature: starTemp,
              obsolete: false,
            });
          }
        }}
      />
    </group>
  );
};
