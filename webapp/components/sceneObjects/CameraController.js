import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Player } from "./Player";
import { useSelector } from "react-redux";
import { getPlayerControlsEnabled } from "../scenes/selectors";

export const CameraController = () => {
  const enabled = useSelector(getPlayerControlsEnabled);

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
