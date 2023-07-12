import {
  Modal,
  Slider,
  Checkbox,
  Box,
  ThemeProvider,
  createTheme,
  Typography,
  Divider,
  Button,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { themeValues } from "../../utils/themeValues";
import { FrameCorners } from "@arwes/core";
import { useCallback } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Stack from "@mui/material/Stack";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { FormattedMessage } from "react-intl";
import { SliderTypePicker, sliderTypes } from "./SliderTypePicker";
import { useDispatch, useSelector } from "react-redux";
import { getFiltersModalOpened } from "../selectors";
import { closeFiltersModal } from "../actions";

const StarClassCheckBox = ({ value, onChange, starClass }) => {
  return (
    <FormControlLabel
      value={value}
      onChange={onChange}
      control={<Checkbox defaultChecked />}
      label={
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Typography>
            <FormattedMessage id={`star.class.${starClass}`} />
          </Typography>
          <Stack>
            <Stack direction="row" spacing={1}>
              <Typography>
                <FormattedMessage id="general.from" />
              </Typography>
              <Typography>
                <FormattedMessage id={`star.class.${starClass}.minTemp`} />
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography>
                <FormattedMessage id="general.to" />
              </Typography>
              <Typography>
                <FormattedMessage id={`star.class.${starClass}.maxTemp`} />
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      }
    />
  );
};

const FiltersModalTitle = ({ onClose }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <FilterAltOutlinedIcon sx={{ color: themeValues.palette.primary.main, fontSize: 40 }} />
        <Typography variant="h5">Filtros de estrellas</Typography>
        <IconButton color="primary" onClick={() => onClose()}>
          <CloseIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Stack>
      <Divider />
    </Box>
  );
};

export const FiltersModal = () => {
  const dispatch = useDispatch();
  const filtersModalOpened = useSelector(getFiltersModalOpened);
  const [activate, setActivate] = React.useState(filtersModalOpened);
  const [classOActivated, setClassOActivated] = useState(true);
  const [classBActivated, setClassBActivated] = useState(true);
  const [classAActivated, setClassAActivated] = useState(true);
  const [classFActivated, setClassFActivated] = useState(true);
  const [classGActivated, setClassGActivated] = useState(true);
  const [classKActivated, setClassKActivated] = useState(true);
  const [classMActivated, setClassMActivated] = useState(true);
  const [temperatureSliderType, setTemperatureSliderType] = useState(sliderTypes.disabled);
  const [temperatureSliderValue, setTemperatureSliderValue] = useState([0, 10]);
  const [massSliderType, setMassSliderType] = useState(sliderTypes.disabled);
  const [massSliderValue, setMassSliderValue] = useState([0, 10]);
  const { width, height } = useWindowDimensions(0.8);
  const theme = createTheme(themeValues);

  useEffect(() => {
    setTimeout(() => setActivate(filtersModalOpened), 200);
  }, [filtersModalOpened]);

  const onClose = useCallback(() => {
    setActivate(false);
    setTimeout(() => closeFiltersModal(dispatch), 200);
  }, []);

  return (
    <Modal open={filtersModalOpened} onClose={() => onClose()}>
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
              }}
            >
              {activate && (
                <ThemeProvider theme={theme}>
                  <Box sx={{ height: "100%", width: "100%", paddingY: 1, overflowY: "auto" }}>
                    <Stack
                      sx={{ height: "100%", width: "100%", paddingX: 2 }}
                      spacing={1}
                      justifyContent="space-between"
                    >
                      <FiltersModalTitle onClose={onClose} />
                      <Typography variant="subtitle1">
                        <FormattedMessage id="filtersModal.starClassification" />
                      </Typography>
                      <FormGroup>
                        <Stack direction="row" justifyContent="space-around">
                          <Stack spacing={2} alignItems="flex-start">
                            <FormControlLabel
                              value={classOActivated}
                              onChange={(value) => setClassOActivated(value)}
                              control={<Checkbox defaultChecked />}
                              label={
                                <Stack direction="row" spacing={1}>
                                  <Typography>
                                    <FormattedMessage id="star.class.O" />
                                  </Typography>
                                  <Typography>
                                    <FormattedMessage id="filtersModal.temp" />
                                  </Typography>
                                  <Typography>{">"}</Typography>
                                  <Typography>
                                    <FormattedMessage id="star.class.O.minTemp" />
                                  </Typography>
                                </Stack>
                              }
                            />
                            <StarClassCheckBox
                              value={classAActivated}
                              onChange={(value) => setClassAActivated(value)}
                              starClass="A"
                            />
                            <StarClassCheckBox
                              value={classGActivated}
                              onChange={(value) => setClassGActivated(value)}
                              starClass="G"
                            />
                            <FormControlLabel
                              value={classMActivated}
                              onChange={(value) => setClassMActivated(value)}
                              control={<Checkbox defaultChecked />}
                              label={
                                <Stack direction="row" spacing={1}>
                                  <Typography>
                                    <FormattedMessage id="star.class.M" />
                                  </Typography>
                                  <Typography>
                                    <FormattedMessage id="filtersModal.temp" />
                                  </Typography>
                                  <Typography>{"<"}</Typography>
                                  <Typography>
                                    <FormattedMessage id="star.class.M.maxTemp" />
                                  </Typography>
                                </Stack>
                              }
                            />
                          </Stack>
                          <Stack spacing={2} justifyContent="flex-start">
                            <StarClassCheckBox
                              value={classBActivated}
                              onChange={(value) => setClassBActivated(value)}
                              starClass="B"
                            />
                            <StarClassCheckBox
                              value={classFActivated}
                              onChange={(value) => setClassFActivated(value)}
                              starClass="F"
                            />
                            <StarClassCheckBox
                              value={classKActivated}
                              onChange={(value) => setClassKActivated(value)}
                              starClass="K"
                            />
                          </Stack>
                        </Stack>
                      </FormGroup>
                      <Divider />
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">
                          <FormattedMessage id="filtersModal.temperature" />
                        </Typography>
                        <SliderTypePicker value={temperatureSliderType} onChange={setTemperatureSliderType} />
                      </Stack>
                      <Stack sx={{ width: "100%" }} alignItems="center">
                        <div style={{ width: "90%" }}>
                          <Slider
                            defaultValue={[15000, 25000]}
                            onChangeCommitted={(_, value) => setTemperatureSliderValue(value)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={40000}
                            track={temperatureSliderType == sliderTypes.inverted ? "inverted" : "normal"}
                            disabled={temperatureSliderType == sliderTypes.disabled}
                            valueLabelFormat={(value) => `${value} K`}
                          />
                        </div>
                      </Stack>
                      <Divider />
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">
                          <FormattedMessage id="filtersModal.mass" />
                        </Typography>
                        <SliderTypePicker value={massSliderType} onChange={setMassSliderType} />
                      </Stack>
                      <Stack sx={{ width: "100%" }} alignItems="center">
                        <div style={{ width: "90%" }}>
                          <Slider
                            defaultValue={[15, 35]}
                            onChangeCommitted={(_, value) => setMassSliderValue(value)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={50}
                            track={massSliderType == sliderTypes.inverted ? "inverted" : "normal"}
                            disabled={massSliderType == sliderTypes.disabled}
                            valueLabelFormat={(value) => `${value} Ms`}
                          />
                        </div>
                      </Stack>
                      <Divider />
                      <Stack direction="row" justifyContent="space-between">
                        <Button color="secondary" variant="outlined">
                          <FormattedMessage id="filtersModal.reset" />
                        </Button>
                        <Button variant="outlined">
                          <FormattedMessage id="filtersModal.accept" />
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </ThemeProvider>
              )}
            </div>
          </FrameCorners>
        </div>
      </div>
    </Modal>
  );
};
