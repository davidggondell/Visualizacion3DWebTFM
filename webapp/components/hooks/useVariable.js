import { useEffect, useRef } from "react";

// Converts state to ref so they can be used inside useFrame
export const useVariable = (state) => {
  const varRef = useRef(state);

  useEffect(() => {
    varRef.current = state;
  }, [state]);

  return varRef;
};
