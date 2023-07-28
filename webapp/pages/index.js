import { ArwesThemeProvider, FrameLines, StylesBaseline } from "@arwes/core";
import { Box, Divider, Stack, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { setNewActiveCluster } from "../components/scenes/actions";
import pesebre from "../public/pesebre_edr3_ordered.json";
import pleyades from "../public/pleyades_edr3_ordered.json";

export default function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Box sx={{ width: "100vw", height: "100%", overflow: "hidden", backgroundColor: "#000" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: matches ? "100%" : "50%",
          width: matches ? "50%" : "100%",
          background: "url(pesebre.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => {
          setNewActiveCluster(dispatch, pesebre);
          router.push("/clusterView");
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.3)",
              cursor: "pointer",
              "@media (hover: none)": {
                backgroundColor: "transparent",
                cursor: "auto",
              },
            },
            userSelect: "none",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <ArwesThemeProvider>
            <StylesBaseline />
            <FrameLines style={{ backgroundColor: theme.palette.background.default }} animator={{ animate: false }}>
              <div style={{ width: 200, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5">
                    <FormattedMessage id="clusters.pesebre" />
                  </Typography>
                </ThemeProvider>
              </div>
            </FrameLines>
          </ArwesThemeProvider>
        </Stack>
      </Box>
      {matches ? (
        <Box sx={{ position: "absolute", left: "50%", height: "100%", zIndex: 999 }}>
          <Divider orientation="vertical" />
        </Box>
      ) : (
        <Box sx={{ position: "absolute", top: "50%", width: "100%", zIndex: 999 }}>
          <Divider orientation="horizontal" />
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: matches ? "100%" : "50%",
          width: matches ? "50%" : "100%",
          background: "url(pleyades.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => {
          setNewActiveCluster(dispatch, pleyades);
          router.push("/clusterView");
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.3)",
              cursor: "pointer",
              "@media (hover: none)": {
                backgroundColor: "transparent",
                cursor: "auto",
              },
            },
            userSelect: "none",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <ArwesThemeProvider>
            <StylesBaseline />
            <FrameLines style={{ backgroundColor: theme.palette.background.default }} animator={{ animate: false }}>
              <div style={{ width: 200, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5">
                    <FormattedMessage id="clusters.pleyades" />
                  </Typography>
                </ThemeProvider>
              </div>
            </FrameLines>
          </ArwesThemeProvider>
        </Stack>
      </Box>
    </Box>
  );
}
