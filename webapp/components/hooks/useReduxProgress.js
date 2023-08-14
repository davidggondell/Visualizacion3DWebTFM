import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useDispatch } from "react-redux";
import { setNewProgress } from "../scenes/actions";

export const UseReduxProgress = () => {
  const dispatch = useDispatch();
  const { progress } = useProgress();

  useEffect(() => {
    setNewProgress(dispatch, progress);
  }, [progress]);

  return null;
};
