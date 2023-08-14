import { ArwesThemeProvider, LoadingBars, StylesBaseline } from "@arwes/core";
import { Typography } from "@mui/material";
import React from "react";

export const CustomLoader = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <ArwesThemeProvider>
        <StylesBaseline />
        <LoadingBars animator={{ activate: true }} determinate progress={progress} size={2} length={10} />
      </ArwesThemeProvider>
      <Typography variant="h3">{Math.floor(progress) + "%"}</Typography>
    </div>
  );
};
