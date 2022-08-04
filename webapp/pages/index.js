import { Canvas } from "@react-three/fiber";
import { PinkBox } from "../components/3DComponents/PinkBox";
import { OrbitControls } from "@react-three/drei";
import { Box } from "@mui/material";
import { Sun } from "../components/3DComponents/Sun";

export default function Home() {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <Sun />
      </Canvas>
    </Box>
  );
}
