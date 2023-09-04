import { ArwesThemeProvider, Card, Text } from "@arwes/core";
import React, { useEffect, useState, useRef, memo } from "react";
import { getStarZoom } from "../../scenes/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  ThemeProvider,
  Typography,
  Stack,
  useTheme,
  Slide,
  createTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setNewStarZoom } from "../../scenes/actions";
import { themeValues } from "../../utils/themeValues";
import { FormattedMessage } from "react-intl";
import { getStarClass } from "../../utils/physicsFunctions";

const starDetailsWidth = 320;

const StarDetailsBigScreenCard = memo(({ activate, closeRef, starId, coordinates, mass, radius, temperature }) => {
  const theme = createTheme(themeValues);

  return (
    <Card
      animator={{ activate }}
      title={
        <ThemeProvider theme={theme}>
          <Stack sx={{ width: `${starDetailsWidth - 40}px` }} direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: 18, display: "flex", alignItems: "center" }}>
              <FormattedMessage id="starDetails.id" values={{ starId: starId }} />
            </Typography>
            <IconButton
              color="primary"
              onClick={() => {
                if (closeRef?.current) {
                  closeRef.current();
                }
              }}
            >
              <CloseIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Stack>
        </ThemeProvider>
      }
      style={{ width: starDetailsWidth, backgroundColor: "rgba(2, 17, 20,0.8)" }}
    >
      <Text>
        <ThemeProvider theme={theme}>
          <Stack spacing={1}>
            <Typography>
              <FormattedMessage id="starDetails.stellarClass" values={{ stellarClass: getStarClass(temperature) }} />
            </Typography>
            <Stack spacing={0.5}>
              <Typography>
                <FormattedMessage id="starDetails.coordinates" />
              </Typography>
              <Stack sx={{ paddingLeft: 2 }}>
                <Typography>
                  <FormattedMessage id="starDetails.coordinates.x" values={{ coord: coordinates?.x?.toFixed(2) }} />
                </Typography>
                <Typography>
                  <FormattedMessage id="starDetails.coordinates.y" values={{ coord: coordinates?.y?.toFixed(2) }} />
                </Typography>
                <Typography>
                  <FormattedMessage id="starDetails.coordinates.z" values={{ coord: coordinates?.z?.toFixed(2) }} />
                </Typography>
              </Stack>
            </Stack>
            <Typography>
              <FormattedMessage id="starDetails.mass" values={{ mass: mass?.toFixed(2) }} />
            </Typography>
            <Typography>
              <FormattedMessage id="starDetails.radius" values={{ radius: radius?.toFixed(2) }} />
            </Typography>
            <Typography>
              <FormattedMessage id="starDetails.temperature" values={{ temperature: temperature?.toFixed(2) }} />
            </Typography>
          </Stack>
        </ThemeProvider>
      </Text>
    </Card>
  );
});

const StarDetailsSmallScreenCard = memo(({ activate, closeRef, starId, coordinates, mass, radius, temperature }) => {
  const theme = createTheme(themeValues);

  return (
    <Card
      animator={{ activate }}
      title={
        <ThemeProvider theme={theme}>
          <Stack sx={{ width: "calc(100vw - 40px)" }} direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: 18, display: "flex", alignItems: "center" }}>
              <FormattedMessage id="starDetails.id" values={{ starId: starId }} />
            </Typography>
            <IconButton
              color="primary"
              onClick={() => {
                if (closeRef?.current) {
                  closeRef.current();
                }
              }}
            >
              <CloseIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Stack>
        </ThemeProvider>
      }
      style={{ width: "calc(100vw + 0.9px)", backgroundColor: "rgba(2, 17, 20,0.8)" }}
    >
      <Text>
        <ThemeProvider theme={theme}>
          <Grid sx={{ width: "100%" }} container rowSpacing={1}>
            <Grid item xs={6}>
              <Typography>
                <FormattedMessage id="starDetails.stellarClass" values={{ stellarClass: getStarClass(temperature) }} />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <FormattedMessage id="starDetails.mass" values={{ mass: mass?.toFixed(2) }} />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <FormattedMessage id="starDetails.radius" values={{ radius: radius?.toFixed(2) }} />
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ overflowWrap: "break-word" }}>
              <Typography>
                <FormattedMessage id="starDetails.temperature" values={{ temperature: temperature?.toFixed(2) }} />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid sx={{ width: "100%" }} container columnSpacing={2} rowSpacing={1}>
                <Grid item>
                  <Typography>
                    <FormattedMessage id="starDetails.coordinates" />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <FormattedMessage id="starDetails.coordinates.x" values={{ coord: coordinates?.x?.toFixed(2) }} />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <FormattedMessage id="starDetails.coordinates.y" values={{ coord: coordinates?.y?.toFixed(2) }} />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <FormattedMessage id="starDetails.coordinates.z" values={{ coord: coordinates?.z?.toFixed(2) }} />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Text>
    </Card>
  );
});

export const StarDetails = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const starZoom = useSelector(getStarZoom);
  const starZoomRef = useRef(null);
  const [doRender, setDoRender] = useState(!!starZoom);
  const [activate, setActivate] = useState(!!starZoom);
  const closeRef = useRef(null);

  useEffect(() => {
    starZoomRef.current = !!starZoom;
    if (!!starZoom && !starZoom?.obsolete) {
      closeRef.current = () => {
        setActivate(false);
        setTimeout(() => setDoRender(false), 300);
        var newStarZoom = { ...starZoom };
        newStarZoom.obsolete = true;
        setNewStarZoom(dispatch, newStarZoom);
      };
      setDoRender(true);
      setTimeout(() => setActivate(true), 200);
    }
  }, [starZoom]);

  return (
    <>
      {doRender && (
        <div
          style={
            matches
              ? {
                  position: "absolute",
                  top: "50%",
                  left: "0%",
                  transform: "translate(0, -50%)",
                  zIndex: 99999,
                }
              : {
                  position: "absolute",
                  bottom: "0%",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  zIndex: 99999,
                  overflow: "hidden",
                }
          }
        >
          <ThemeProvider theme={theme}>
            <Slide direction="right" in={doRender} unmountOnExit>
              <div style={{ overflow: "hidden" }}>
                <ArwesThemeProvider>
                  {matches ? (
                    <StarDetailsBigScreenCard
                      activate={activate}
                      closeRef={closeRef}
                      starId={starZoom?.starId}
                      coordinates={starZoom?.coordinates}
                      mass={starZoom?.mass}
                      radius={starZoom?.starSize}
                      temperature={starZoom?.temperature}
                    />
                  ) : (
                    <StarDetailsSmallScreenCard
                      activate={activate}
                      closeRef={closeRef}
                      starId={starZoom?.starId}
                      coordinates={starZoom?.coordinates}
                      mass={starZoom?.mass}
                      radius={starZoom?.starSize}
                      temperature={starZoom?.temperature}
                    />
                  )}
                </ArwesThemeProvider>
              </div>
            </Slide>
          </ThemeProvider>
        </div>
      )}
    </>
  );
};
