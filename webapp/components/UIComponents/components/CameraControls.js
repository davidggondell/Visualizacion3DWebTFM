import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton, Slide, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { TrapezeBox } from "../BaseComponents/TrapezeBox";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useTheme } from "@emotion/react";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getCameraControlsOpened } from "../selectors";
import { closeCameraControls } from "../actions";
import { setOrbitControls, setPlayerControls } from "../../scenes/actions";

const FullWidthDiv = ({ fullWidth }) => {
  const themeValues = useTheme();

  return (
    <div
      style={{
        height: "95%",
        width: "1px",
        backgroundColor: themeValues.palette.text.primary,
        marginLeft: "8px",
        marginRight: "8px",
      }}
    />
  );
};

export const cameraTypes = {
  orbit: "orbit",
  firstPerson: "firstPerson",
};

export const CameraControls = () => {
  const dispatch = useDispatch();
  const cameraControlsOpened = useSelector(getCameraControlsOpened);
  const [slideOpened, setSlideOpened] = useState(cameraControlsOpened);
  const [cameraType, setCameraType] = useState(cameraTypes.orbit);
  const themeValues = useTheme();

  useEffect(() => {
    setTimeout(() => setSlideOpened(cameraControlsOpened), 200);
  }, [cameraControlsOpened]);

  useEffect(() => {
    if (cameraType == cameraTypes.orbit) {
      setOrbitControls(dispatch);
    } else if (cameraType == cameraTypes.firstPerson) {
      setPlayerControls(dispatch);
    }
  }, [cameraType]);

  const onClose = useCallback(() => {
    setSlideOpened(false);
    setTimeout(() => closeCameraControls(dispatch), 200);
  }, []);

  return (
    <>
      {cameraControlsOpened && (
        <Box
          sx={{
            height: 90,
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
                bigBase={340}
                offsetSmallBase={35}
                height={60}
                direction="up"
                color="rgba(0, 248, 248, 0.1)"
                borderColor={themeValues.palette.primary.main}
                borderWidth={2}
                closed={false}
                sx={{ position: "relative" }}
                shadow
              >
                <Stack sx={{ width: "100%", height: "100%" }} alignItems="center" justifyContent="center">
                  <ToggleButtonGroup
                    sx={{
                      "& .MuiToggleButtonGroup-grouped": {
                        border: 0,
                        color: themeValues.palette.text.primary,
                        "&.Mui-disabled": {
                          border: 0,
                        },
                        "&:not(:first-of-type)": {
                          borderRadius: 2,
                        },
                        "&:first-of-type": {
                          borderRadius: 2,
                        },
                      },
                    }}
                    value={cameraType}
                    exclusive
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setCameraType(newValue);
                      }
                    }}
                  >
                    <ToggleButton size="small" sx={{ height: 40 }} value={cameraTypes.orbit}>
                      <Stack direction="row" spacing={1}>
                        <AutoModeIcon />
                        <Typography>
                          <FormattedMessage id="cameraControls.orbit" />
                        </Typography>
                      </Stack>
                    </ToggleButton>
                    <FullWidthDiv />
                    <ToggleButton size="small" sx={{ height: 40 }} value={cameraTypes.firstPerson}>
                      <Stack direction="row" spacing={1}>
                        <Typography>
                          <FormattedMessage id="cameraControls.firstPerson" />
                        </Typography>
                        <RocketLaunchIcon />
                      </Stack>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              </TrapezeBox>
            </Stack>
          </Slide>
        </Box>
      )}
    </>
  );
};
