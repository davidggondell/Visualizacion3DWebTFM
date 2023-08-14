import { ArwesThemeProvider, Card, Text } from "@arwes/core";
import React, { useEffect, useState, useRef, memo } from "react";
import { getStarZoom } from "../../scenes/selectors";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, ThemeProvider, Typography, Stack, useTheme, Slide, createTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setNewStarZoom } from "../../scenes/actions";
import { themeValues } from "../../utils/themeValues";
import { FormattedMessage } from "react-intl";
import { getStarClass } from "../../utils/physicsFunctions";

const starDetailsWidth = 320;

export const StarDetailsCard = memo(({ activate, closeRef, starId, position, mass, radius, temperature }) => {
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
                  <FormattedMessage id="starDetails.coordinates.x" values={{ coord: position[0].toFixed(2) }} />
                </Typography>
                <Typography>
                  <FormattedMessage id="starDetails.coordinates.y" values={{ coord: position[1].toFixed(2) }} />
                </Typography>
                <Typography>
                  <FormattedMessage id="starDetails.coordinates.z" values={{ coord: position[2].toFixed(2) }} />
                </Typography>
              </Stack>
            </Stack>
            <Typography>
              <FormattedMessage id="starDetails.mass" values={{ mass: mass.toFixed(2) }} />
            </Typography>
            <Typography>
              <FormattedMessage id="starDetails.radius" values={{ radius: radius.toFixed(2) }} />
            </Typography>
            <Typography>
              <FormattedMessage id="starDetails.temperature" values={{ temperature: temperature.toFixed(2) }} />
            </Typography>
          </Stack>
        </ThemeProvider>
      </Text>
    </Card>
  );
});

export const StarDetails = () => {
  const dispatch = useDispatch();
  const starZoom = useSelector(getStarZoom);
  const starZoomRef = useRef(null);
  const [doRender, setDoRender] = useState(!!starZoom);
  const [activate, setActivate] = useState(!!starZoom);
  const theme = useTheme();
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
          style={{
            position: "absolute",
            top: "50%",
            left: "0%",
            transform: "translate(0, -50%)",
            zIndex: 99999,
          }}
        >
          <ThemeProvider theme={theme}>
            <Slide direction="right" in={doRender} unmountOnExit>
              <div>
                <ArwesThemeProvider>
                  <StarDetailsCard
                    activate={activate}
                    closeRef={closeRef}
                    starId={starZoom.starId}
                    position={starZoom.position}
                    mass={starZoom.mass}
                    radius={starZoom.starSize}
                    temperature={starZoom.temperature}
                  />
                </ArwesThemeProvider>
              </div>
            </Slide>
          </ThemeProvider>
        </div>
      )}
    </>
  );
};
