import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { Player } from "./Player";
import { useDispatch, useSelector } from "react-redux";
import { getPlayerControlsEnabled, getStarZoom } from "../scenes/selectors";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { closeStarZoom } from "../scenes/actions";

function calcularAngulo([x, y, z]) {
  var azimuth = Math.atan2(y, x);
  var polar = Math.atan2(Math.sqrt(x * x + y * y), z);

  return {
    azimuth: azimuth,
    polar: polar,
  };
}

const DetailsCamera = ({ starZoom }) => {
  const dispatch = useDispatch();
  const { camera } = useThree();
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

          cameraControlsRef.current.setTarget(xAhead, yAhead, zAhead, false);
          cameraControlsRef.current.setTarget(x, y, z, true);
          cameraControlsRef.current.dollyTo(starZoom.modelSize + 10, true);
          setTimeout(() => {
            cameraControlsRef.current.rotatePolarTo(Math.PI / 2, true);
            cameraControlsRef.current.truck(-2, 0, true);
          }, 500);
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

  return (
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
  );
};
