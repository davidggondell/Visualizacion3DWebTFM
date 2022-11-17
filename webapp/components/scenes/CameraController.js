import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Player } from "../sceneObjects/Player";

export const CameraController = forwardRef((props, ref) => {
  const [enabled, setEnabled] = useState(false);

  useImperativeHandle(ref, () => ({
    toogleControls: () => {
      setEnabled(!enabled);
    },
  }));

  return (
    <>
      {enabled ? (
        <Physics>
          <Player canvasRef={props.canvasRef} enabled={enabled} />
        </Physics>
      ) : (
        <OrbitControls />
      )}
    </>
  );
});
