import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import { TrapezeBox } from "../BaseComponents/TrapezeBox";
import { Box, Button, IconButton, Slide, Slider, Stack, Typography } from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useTheme } from "@emotion/react";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";
import CloseIcon from "@mui/icons-material/Close";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getTimeControlsOpened } from "../selectors";
import { closeTimeControls } from "../actions";
import { getStarZoom } from "../../scenes/selectors";
import { RootUIContext } from "../RootUIContext";

const RefUpdatedNumber = ({ callBackRef }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    callBackRef.current = (newValue) => setValue(newValue);
  }, [callBackRef]);

  return <Typography>{value > 0 ? `+${value}` : value}</Typography>;
};

export const TimeControls = () => {
  const themeValues = useTheme();
  const dispatch = useDispatch();
  const timeControlsOpened = useSelector(getTimeControlsOpened);
  const starZoom = useSelector(getStarZoom);
  const [slideOpened, setSlideOpened] = useState(timeControlsOpened);
  const [sliderValue, setSliderValue] = useState(0);
  const setYearValueCallback = useRef(null);
  const setSpeedValueCallBack = useRef(null);
  const speedValueRef = useRef(0);
  const { yearRef } = useContext(RootUIContext);
  const { width } = useWindowDimensions(0.95);

  useEffect(() => {
    if (speedValueRef) {
      speedValueRef.current = 0;
    }
    if (yearRef && setYearValueCallback?.current) {
      setYearValueCallback.current(yearRef.current);
    }
    const interval = setInterval(() => {
      if (setYearValueCallback.current) {
        setYearValueCallback.current(yearRef.current);
      }
      if (speedValueRef.current && speedValueRef.current != 0) {
        yearRef.current += speedValueRef.current;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => setSlideOpened(timeControlsOpened && !starZoom), 200);
  }, [timeControlsOpened, starZoom]);

  const onClose = useCallback(() => {
    speedValueRef.current = 0;
    setSlideOpened(false);
    setTimeout(() => closeTimeControls(dispatch), 200);
  }, []);

  return (
    <>
      {timeControlsOpened && (
        <Box
          sx={{
            height: 160,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 0)",
            zIndex: 99999,
          }}
        >
          <Slide direction="up" in={slideOpened} unmountOnExit>
            <Stack alignItems="center">
              <Stack sx={{ width: "50px", margin: 0 }}>
                <TrapezeBox
                  bigBase={50}
                  offsetSmallBase={10}
                  height={30}
                  color="rgba(0, 248, 248, 0.1)"
                  borderColor={themeValues.palette.primary.main}
                  borderWidth={2}
                  closed={false}
                  sx={{ position: "relative" }}
                  shadow
                >
                  <Stack sx={{ marginTop: "-7px" }} alignItems="center">
                    <IconButton color="primary" onClick={() => onClose()}>
                      <CloseIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                  </Stack>
                </TrapezeBox>
              </Stack>
              <TrapezeBox
                bigBase={width > 700 ? 700 : width}
                offsetSmallBase={35}
                height={130}
                minWidth={280}
                direction="up"
                color="rgba(0, 248, 248, 0.1)"
                borderColor={themeValues.palette.primary.main}
                borderWidth={2}
                closed={false}
                sx={{ position: "relative" }}
                shadow
              >
                <div style={{ width: "100%", height: "100%" }}>
                  <Stack
                    sx={{ width: "100%", paddingX: "4px", paddingTop: "4px", paddingBottom: "8px" }}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={
                        sliderValue < 0
                          ? {
                              color: themeValues.palette.primary.main,
                              textShadow: `${themeValues.palette.primary.main} 1px 1px 5px`,
                            }
                          : undefined
                      }
                    >
                      <FastRewindRoundedIcon sx={{ fontSize: 24 }} />
                      <Typography sx={{ fontSize: 16 }}>
                        <FormattedMessage id="timeControls.rewind" />
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={
                        sliderValue > 0
                          ? {
                              color: themeValues.palette.primary.main,
                              textShadow: `${themeValues.palette.primary.main} 1px 1px 5px`,
                            }
                          : undefined
                      }
                    >
                      <Typography sx={{ fontSize: 16 }}>
                        <FormattedMessage id="timeControls.forward" />
                      </Typography>
                      <FastForwardRoundedIcon sx={{ fontSize: 24 }} />
                    </Stack>
                  </Stack>
                  <Stack
                    sx={{ width: "100%", height: "50px", overflow: "visible", paddingBottom: "20px" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <div style={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Slider
                        value={sliderValue}
                        onChange={(_, newValue) => {
                          setSliderValue(newValue);
                          speedValueRef.current = newValue;
                          if (setSpeedValueCallBack.current) {
                            setSpeedValueCallBack.current(newValue);
                          }
                        }}
                        track={false}
                        max={100}
                        min={-100}
                        step={5}
                        marks={Array.from({ length: 10 }, (_, i) => {
                          const value = (i + 1) * -10;
                          return {
                            value: value,
                            label: value % 50 == 0 ? `${value}%` : undefined,
                          };
                        }).concat(
                          Array.from({ length: 11 }, (_, i) => {
                            const value = i * 10;
                            const plus = i == 0 ? "" : "+";
                            return {
                              value: value,
                              label: value % 50 == 0 ? `${plus}${value}%` : undefined,
                            };
                          }),
                        )}
                      />
                    </div>
                  </Stack>
                  <Stack
                    sx={{ width: "100%", paddingBottom: 10 }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack sx={{ width: "90px" }} direction="row" spacing={1}>
                      <div
                        style={{
                          width: "90px",
                          maxWidth: "90px",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "row",
                          gap: 4,
                        }}
                      >
                        <RefUpdatedNumber callBackRef={setYearValueCallback} />
                        <Typography>
                          <FormattedMessage id="timeControls.years" />
                        </Typography>
                      </div>
                    </Stack>
                    <Button
                      variant="outlined"
                      endIcon={<CloseIcon />}
                      onClick={() => {
                        yearRef.current = 0;
                        speedValueRef.current = 0;
                        setSliderValue(0);
                        if (setSpeedValueCallBack.current) {
                          setSpeedValueCallBack.current(0);
                        }
                      }}
                    >
                      <FormattedMessage id="timeControls.reset" />
                    </Button>
                    <Stack
                      sx={{ width: "90px", overflow: "hidden" }}
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <RefUpdatedNumber callBackRef={setSpeedValueCallBack} />
                      <Typography>%</Typography>
                    </Stack>
                  </Stack>
                </div>
              </TrapezeBox>
            </Stack>
          </Slide>
        </Box>
      )}
    </>
  );
};
