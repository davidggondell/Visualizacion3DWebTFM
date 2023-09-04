import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { Player } from "./Player";
import { useDispatch, useSelector } from "react-redux";
import { getPlayerControlsEnabled, getStarZoom } from "../scenes/selectors";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { closeStarZoom } from "../scenes/actions";
import * as THREE from "three";
import { useMediaQuery, useTheme } from "@mui/material";
import { getFiltersModalOpened, getInstructionsOpened } from "../UIComponents/selectors";

const DetailsCamera = ({ starZoom }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { camera, viewport } = useThree();
  const cameraControlsRef = useRef(null);

  useEffect(() => {
    if (cameraControlsRef?.current) {
      if (cameraControlsRef.current.mouseButtons) {
        cameraControlsRef.current.mouseButtons.left = "NONE";
        cameraControlsRef.current.mouseButtons.right = "NONE";
        cameraControlsRef.current.mouseButtons.wheel = "NONE";
        cameraControlsRef.current.mouseButtons.middle = "NONE";
        cameraControlsRef.current.touches.one = "NONE";
        cameraControlsRef.current.touches.two = "NONE";
        cameraControlsRef.current.touches.three = "NONE";
      }
    }
  }, [cameraControlsRef]);

  useEffect(() => {
    const animation = async () => {
      if (starZoom && starZoom?.position && starZoom?.modelSize && starZoom?.pointAhead) {
        if (starZoom?.obsolete) {
          if (starZoom?.cameraPosition) {
            const [x, y, z] = starZoom.position;
            const [xCamera, yCamera, zCamera] = starZoom.cameraPosition;
            const [xAhead, yAhead, zAhead] = starZoom.pointAhead;
            cameraControlsRef.current.setLookAt(xCamera, yCamera, zCamera, x, y, z, true);
            await cameraControlsRef.current.setTarget(xAhead, yAhead, zAhead, true);
          }
          closeStarZoom(dispatch);
        } else {
          const [x, y, z] = starZoom.position;
          const [xAhead, yAhead, zAhead] = starZoom.pointAhead;
          const hFOV =
            (2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect) * 180) / Math.PI;

          cameraControlsRef.current.setTarget(xAhead, yAhead, zAhead, false);
          cameraControlsRef.current.setTarget(x, y, z, true);

          if (matches) {
            const distance = starZoom.modelSize / Math.tan(THREE.MathUtils.degToRad((camera.fov * 0.8) / 2));
            const lateralAdjustment =
              distance * Math.tan(THREE.MathUtils.degToRad((hFOV * 0.85) / 2)) - starZoom.modelSize;

            cameraControlsRef.current.dollyTo(distance, true);
            setTimeout(() => {
              cameraControlsRef.current.rotatePolarTo(Math.PI / 2, true);
              cameraControlsRef.current.truck(-lateralAdjustment, 0, true);
            }, 500);
          } else {
            const ratio = matchesMobile ? 0.8 : 0.5;
            const distance = starZoom.modelSize / Math.tan(THREE.MathUtils.degToRad((hFOV * ratio) / 2));
            const verticalAdjustment =
              distance * Math.tan(THREE.MathUtils.degToRad((camera.fov * 0.85) / 2)) - starZoom.modelSize;

            cameraControlsRef.current.dollyTo(distance, true);
            setTimeout(() => {
              cameraControlsRef.current.rotatePolarTo(Math.PI / 2, true);
              cameraControlsRef.current.truck(0, verticalAdjustment, true);
            }, 500);
          }
        }
      }
    };
    animation();
  }, [starZoom]);

  return <CameraControls ref={cameraControlsRef} />;
};

export const CameraController = () => {
  const enabled = useSelector(getPlayerControlsEnabled);
  const starZoom = useSelector(getStarZoom);
  const instructionsOpened = useSelector(getInstructionsOpened);
  const filtersModalOpened = useSelector(getFiltersModalOpened);

  return (
    <>
      {!instructionsOpened && !filtersModalOpened && (
        <>
          {starZoom ? (
            <DetailsCamera starZoom={starZoom} />
          ) : (
            <>
              {enabled ? (
                <Physics>
                  <Player enabled={enabled} />
                </Physics>
              ) : (
                <OrbitControls enablePan={false} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
