import React, { useEffect, useState, useCallback, useRef } from "react";
import { TrapezeBox } from "../baseComponents/TrapezeBox";
import { Box, IconButton, Slide, Slider, Stack, Typography } from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useTheme } from "@emotion/react";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";
import CloseIcon from "@mui/icons-material/Close";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getTimeControlsOpened } from "../selectors";
import { closeTimeControls } from "../actions";

const TimeSpeedNumber = ({ callBackRef }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    callBackRef.current = (newValue) => setValue(newValue);
  }, [callBackRef]);

  return <Typography>{value}</Typography>;
};

export const TimeControls = () => {
  const themeValues = useTheme();
  const dispatch = useDispatch();
  const timeControlsOpened = useSelector(getTimeControlsOpened);
  const [slideOpened, setSlideOpened] = useState(timeControlsOpened);
  const setSpeedValueCallBack = useRef(null);
  const { width } = useWindowDimensions(0.7);

  useEffect(() => {
    setTimeout(() => setSlideOpened(timeControlsOpened), 200);
  }, [timeControlsOpened]);

  const onClose = useCallback(() => {
    setSlideOpened(false);
    setTimeout(() => closeTimeControls(dispatch), 200);
  }, []);

  return (
    <>
      {timeControlsOpened && (
        <Box
          sx={{
            height: 130,
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
                bigBase={width}
                offsetSmallBase={35}
                height={100}
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
                    <Stack direction="row" spacing={1}>
                      <FastRewindRoundedIcon />
                      <Typography>
                        <FormattedMessage id="timeControls.rewind" />
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography>
                        <FormattedMessage id="timeControls.forward" />
                      </Typography>
                      <FastForwardRoundedIcon />
                    </Stack>
                  </Stack>
                  <Stack
                    sx={{ width: "100%", height: "30px", overflow: "visible" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <div style={{ width: "90%" }}>
                      <Slider
                        defaultValue={0}
                        onChange={(_, newValue) => {
                          if (setSpeedValueCallBack.current) {
                            setSpeedValueCallBack.current(newValue);
                          }
                        }}
                        track={false}
                        max={100}
                        min={-100}
                        marks={Array.from({ length: 9 }, (_, i) => ({
                          value: (i + 1) * -10,
                        })).concat(
                          Array.from({ length: 10 }, (_, i) => ({
                            value: i * 10,
                          })),
                        )}
                      />
                    </div>
                  </Stack>
                  <Stack sx={{ width: "100%" }} direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1}>
                      <Typography>
                        <FormattedMessage id="timeControls.year" />
                      </Typography>
                      <Typography>{2023}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <TimeSpeedNumber callBackRef={setSpeedValueCallBack} />
                      <Typography>
                        <FormattedMessage id="timeControls.speed" />
                      </Typography>
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
