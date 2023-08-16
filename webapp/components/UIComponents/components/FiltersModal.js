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
import {
  getClassAActive,
  getClassBActive,
  getClassFActive,
  getClassGActive,
  getClassKActive,
  getClassMActive,
  getClassOActive,
  getFiltersModalOpened,
  getMassFilter,
  getTemperatureFilter,
} from "../selectors";
import {
  setNewClassMActive,
  closeFiltersModal,
  setNewClassAActive,
  setNewClassFActive,
  setNewClassGActive,
  setNewClassKActive,
  setNewClassOActive,
  setNewMassFilter,
  setNewTemperatureFilter,
  setNewClassBActive,
} from "../actions";

const StarClassCheckBox = ({ value, onChange, starClass }) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={value} onChange={onChange} />}
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

const ChangeCommittedSlider = ({ defaultValue, min, max, track, disabled, valueLabelFormat, onChangeCommitted }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Slider
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onChangeCommitted={(_, value) => onChangeCommitted(value)}
      valueLabelDisplay="auto"
      min={min}
      max={max}
      track={track}
      disabled={disabled}
      valueLabelFormat={valueLabelFormat}
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
  const classOActive = useSelector(getClassOActive);
  const classBActive = useSelector(getClassBActive);
  const classAActive = useSelector(getClassAActive);
  const classFActive = useSelector(getClassFActive);
  const classGActive = useSelector(getClassGActive);
  const classKActive = useSelector(getClassKActive);
  const classMActive = useSelector(getClassMActive);
  const temperatureFilter = useSelector(getTemperatureFilter);
  const massFilter = useSelector(getMassFilter);
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
                              control={
                                <Checkbox
                                  checked={classOActive}
                                  onChange={(event) => setNewClassOActive(dispatch, event.target.checked)}
                                />
                              }
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
                              value={classAActive}
                              onChange={(event) => setNewClassAActive(dispatch, event.target.checked)}
                              starClass="A"
                            />
                            <StarClassCheckBox
                              value={classGActive}
                              onChange={(event) => setNewClassGActive(dispatch, event.target.checked)}
                              starClass="G"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={classMActive}
                                  onChange={(event) => setNewClassMActive(dispatch, event.target.checked)}
                                />
                              }
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
                              value={classBActive}
                              onChange={(event) => setNewClassBActive(dispatch, event.target.checked)}
                              starClass="B"
                            />
                            <StarClassCheckBox
                              value={classFActive}
                              onChange={(event) => setNewClassFActive(dispatch, event.target.checked)}
                              starClass="F"
                            />
                            <StarClassCheckBox
                              value={classKActive}
                              onChange={(event) => setNewClassKActive(dispatch, event.target.checked)}
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
                        <SliderTypePicker
                          value={temperatureFilter.type}
                          onChange={(type) => setNewTemperatureFilter(dispatch, temperatureFilter.value, type)}
                        />
                      </Stack>
                      <Stack sx={{ width: "100%" }} alignItems="center">
                        <div style={{ width: "90%" }}>
                          <ChangeCommittedSlider
                            defaultValue={temperatureFilter.value}
                            onChangeCommitted={(value) =>
                              setNewTemperatureFilter(dispatch, value, temperatureFilter.type)
                            }
                            valueLabelDisplay="auto"
                            min={0}
                            max={40000}
                            track={temperatureFilter.type == sliderTypes.inverted ? "inverted" : "normal"}
                            disabled={temperatureFilter.type == sliderTypes.disabled}
                            valueLabelFormat={(value) => `${value} K`}
                          />
                        </div>
                      </Stack>
                      <Divider />
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">
                          <FormattedMessage id="filtersModal.mass" />
                        </Typography>
                        <SliderTypePicker
                          value={massFilter.type}
                          onChange={(type) => setNewMassFilter(dispatch, massFilter.value, type)}
                        />
                      </Stack>
                      <Stack sx={{ width: "100%" }} alignItems="center">
                        <div style={{ width: "90%" }}>
                          <ChangeCommittedSlider
                            defaultValue={massFilter.value}
                            onChangeCommitted={(value) => setNewMassFilter(dispatch, value, massFilter.type)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={50}
                            track={massFilter.type == sliderTypes.inverted ? "inverted" : "normal"}
                            disabled={massFilter.type == sliderTypes.disabled}
                            valueLabelFormat={(value) => `${value} Ms`}
                          />
                        </div>
                      </Stack>
                      <Divider />
                      <Stack direction="row" justifyContent="space-between">
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => {
                            setNewClassOActive(dispatch, true);
                            setNewClassBActive(dispatch, true);
                            setNewClassAActive(dispatch, true);
                            setNewClassFActive(dispatch, true);
                            setNewClassGActive(dispatch, true);
                            setNewClassKActive(dispatch, true);
                            setNewClassMActive(dispatch, true);
                            setNewTemperatureFilter(dispatch, [0, 10], sliderTypes.disabled);
                            setNewMassFilter(dispatch, [0, 10], sliderTypes.disabled);
                          }}
                        >
                          <FormattedMessage id="filtersModal.reset" />
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            onClose();
                          }}
                        >
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
