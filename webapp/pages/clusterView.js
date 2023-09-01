import { Box } from "@mui/material";
import React from "react";
import { RootUI } from "../components/UIComponents/components/RootUI";

export default function clusterView() {
  return (
    <Box sx={{ width: "100vw", height: "100%", backgroundColor: "#000000", overflow: "hidden" }}>
      <RootUI />
    </Box>
  );
}
