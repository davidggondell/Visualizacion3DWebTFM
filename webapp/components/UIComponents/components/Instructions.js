import React, { useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { ArwesThemeProvider, Blockquote, FrameCorners, Text } from "@arwes/core";
import { themeValues } from "../../utils/themeValues";
import { useEffect } from "react";
import { useCallback } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";
import SwipeIcon from "@mui/icons-material/Swipe";
import PinchIcon from "@mui/icons-material/Pinch";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { PiMouseDuotone, PiMouseSimple, PiCursorClick } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { getInstructionsOpened } from "../selectors";
import { closeInstructions, openInstructions } from "../actions";
import { getInstructionsUsed, setInstructionsUsed } from "../../utils/myLocalStorage";
import { WasdIcon } from "../../../icons/WasdIcon";
import { FormattedMessage } from "react-intl";

const InstructionsModalTitle = ({ onClose }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HelpOutlineIcon sx={{ color: themeValues.palette.primary.main, fontSize: 40 }} />
        <Typography variant="h5">
          <FormattedMessage id="instructions.title" />
        </Typography>
        <IconButton color="primary" onClick={() => onClose()}>
          <CloseIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Stack>
      <Divider />
    </Box>
  );
};

const InstructionsQuote = ({ title, content }) => {
  const theme = createTheme(themeValues);
  return (
    <Blockquote>
      <Text>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">{title}</Typography>
          <Divider />
          <List sx={{ width: "100%" }} disablePadding>
            {content.map((item) => {
              return (
                <ListItem>
                  <ListItemText>
                    <FormattedMessage
                      id={item.text}
                      values={{
                        b: (chunks) => <strong>{chunks}</strong>,
                      }}
                    />
                  </ListItemText>
                  <ListItemIcon sx={{ diplay: "flex", justifyContent: "center" }}>{item.icon}</ListItemIcon>
                </ListItem>
              );
            })}
          </List>
        </ThemeProvider>
      </Text>
    </Blockquote>
  );
};

const InstructionsModal = ({ open, onClose }) => {
  const theme = createTheme(themeValues);
  const { width, height } = useWindowDimensions(0.8);
  const [activate, setActivate] = useState(open);

  useEffect(() => {
    setTimeout(() => setActivate(open), 200);
  }, [open]);

  const closeModal = useCallback(() => {
    setActivate(false);
    setTimeout(() => onClose(), 200);
  }, []);

  return (
    <Modal open={open} onClose={() => closeModal()}>
      <div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 99999,
          }}
        >
          <FrameCorners animator={{ activate }} cornerWidth={2} cornerLength={20} showContentLines contentLineWidth={1}>
            <div
              style={{
                width: width,
                maxHeight: height,
                minWidth: 340,
                maxWidth: 400,
                overflow: "auto",
              }}
            >
              {activate && (
                <ThemeProvider theme={theme}>
                  <div>
                    <InstructionsModalTitle onClose={() => closeModal()} />
                    <div>
                      <ArwesThemeProvider>
                        <Text>
                          <ThemeProvider theme={theme}>
                            <Stack sx={{ width: "100%", padding: "16px" }} spacing={1}>
                              <Typography variant="h6">
                                <FormattedMessage id="instructions.basic.title" />
                              </Typography>
                              <Divider />
                              <Typography>
                                <FormattedMessage id="instructions.basic.modes" />
                              </Typography>
                              <Stack direction="row" justifyContent="space-around">
                                <Stack alignItems="center" justifyContent="center" spacing="4px">
                                  <Stack direction="row" spacing={1}>
                                    <AutoModeIcon />
                                    <Typography>
                                      <FormattedMessage id="cameraControls.orbit" />
                                    </Typography>
                                  </Stack>
                                  <div
                                    style={{
                                      height: "1px",
                                      backgroundColor: theme.palette.primary.main,
                                      width: "70%",
                                    }}
                                  />
                                  <Typography sx={{ textAlign: "center" }}>
                                    <FormattedMessage id="instructions.basic.modes.orbit" />
                                  </Typography>
                                </Stack>
                                <Stack alignItems="center" justifyContent="center" spacing="4px">
                                  <Stack direction="row" spacing={1}>
                                    <RocketLaunchIcon />
                                    <Typography>
                                      <FormattedMessage id="cameraControls.firstPerson" />
                                    </Typography>
                                  </Stack>
                                  <div
                                    style={{
                                      height: "1px",
                                      backgroundColor: theme.palette.primary.main,
                                      width: "80%",
                                    }}
                                  />
                                  <Typography sx={{ textAlign: "center" }}>
                                    <FormattedMessage id="instructions.basic.modes.firstPerson" />
                                  </Typography>
                                </Stack>
                              </Stack>
                              <Typography sx={{ textAlign: "center" }}>
                                <FormattedMessage
                                  id="instructions.basic.modes.choose"
                                  values={{
                                    b: (chunks) => <strong>{chunks}</strong>,
                                  }}
                                />
                              </Typography>
                            </Stack>
                          </ThemeProvider>
                        </Text>
                        <ThemeProvider theme={theme}>
                          <Stack sx={{ width: "100%", paddingX: "16px", paddingBottom: "16px" }} spacing={1}>
                            <Typography variant="h6">
                              <FormattedMessage id="instructions.controls" />
                            </Typography>
                            <Divider />
                          </Stack>
                        </ThemeProvider>
                        <InstructionsQuote
                          title={<FormattedMessage id="instructions.keyboard" />}
                          content={[
                            {
                              text: "instructions.keyboard.camera",
                              icon: <PiMouseDuotone size="32px" color={theme.palette.primary.main} />,
                            },
                            {
                              text: "instructions.keyboard.zoom",
                              icon: <PiMouseSimple size="32px" color={theme.palette.primary.main} />,
                            },
                            {
                              text: "instructions.keyboard.move",
                              icon: (
                                <div
                                  style={{
                                    paddingLeft: "8px",
                                    maxHeight: "40px",
                                    overflow: "visible",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <WasdIcon color={theme.palette.primary.main} width="70" height="70" />
                                </div>
                              ),
                            },
                            {
                              text: "instructions.keyboard.click",
                              icon: <PiCursorClick size="32px" color={theme.palette.primary.main} />,
                            },
                          ]}
                        />
                        <InstructionsQuote
                          title={<FormattedMessage id="instructions.touch" />}
                          content={[
                            {
                              text: "instructions.touch.camera",
                              icon: <SwipeIcon color="primary" sx={{ fontSize: 32 }} />,
                            },
                            {
                              text: "instructions.touch.zoom",
                              icon: <PinchIcon color="primary" sx={{ fontSize: 32 }} />,
                            },
                            {
                              text: "instructions.touch.touch",
                              icon: <TouchAppIcon color="primary" sx={{ fontSize: 32 }} />,
                            },
                          ]}
                        />
                      </ArwesThemeProvider>
                    </div>
                  </div>
                </ThemeProvider>
              )}
            </div>
          </FrameCorners>
        </div>
      </div>
    </Modal>
  );
};

export const Instructions = () => {
  const theme = createTheme(themeValues);
  const dispatch = useDispatch();
  const instructionsOpened = useSelector(getInstructionsOpened);

  useEffect(() => {
    if (!getInstructionsUsed()) {
      openInstructions(dispatch);
    }
  }, []);

  return (
    <>
      {!instructionsOpened && (
        <ThemeProvider theme={theme}>
          <div style={{ position: "absolute", top: 20, right: 20, zIndex: 99999 }}>
            <IconButton color="primary" onClick={() => openInstructions(dispatch)}>
              <HelpOutlineIcon sx={{ fontSize: 48 }} />
            </IconButton>
          </div>
        </ThemeProvider>
      )}
      <InstructionsModal
        open={instructionsOpened}
        onClose={() => {
          closeInstructions(dispatch);
          setInstructionsUsed();
        }}
      />
    </>
  );
};
