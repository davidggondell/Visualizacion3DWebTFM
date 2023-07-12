import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Player } from "./Player";
import { useDispatch, useSelector } from "react-redux";
import { getPlayerControlsEnabled, getStarZoom } from "../scenes/selectors";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { closeStarZoom } from "../scenes/actions";

const vectorEquals = (v1, v2, epsilon = 0) => {
  return Math.abs(v1.x - v2.x) < epsilon && Math.abs(v1.y - v2.y) < epsilon && Math.abs(v1.z - v2.z) < epsilon;
};

export const CameraController = () => {
  const dispatch = useDispatch();
  const enabled = useSelector(getPlayerControlsEnabled);
  const starZoom = useSelector(getStarZoom);

  useFrame(({ camera }) => {
    if (starZoom) {
      const vec = new THREE.Vector3(starZoom[0], starZoom[1], starZoom[2]);
      if (starZoom != camera.position.toArray()) {
        camera.lookAt(vec);
        camera.position.lerp(vec, 0.01);
        camera.updateProjectionMatrix();

        console.log(vec, camera.position, vectorEquals(vec, camera.position, 5));
        if (vectorEquals(vec, camera.position, 5)) {
          closeStarZoom(dispatch);
        }
      }
    }
  });

  if (starZoom) return null;
  return (
    <>
      {enabled ? (
        <Physics>
          <Player enabled={enabled} />
        </Physics>
      ) : (
        <OrbitControls />
      )}
    </>
  );
};

CameraController.displayName = "CameraController";
