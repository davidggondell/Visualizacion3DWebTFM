import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { themeValues } from "../../utils/themeValues";

export const sliderTypes = {
  disabled: "disabled",
  activated: "activated",
  inverted: "inverted",
};

export const SliderTypePicker = ({ value, onChange }) => {
  return (
    <ToggleButtonGroup
      color="primary"
      size="small"
      value={value}
      exclusive
      onChange={(_, value) => {
        if (value != null) {
          onChange(value);
        }
      }}
      sx={{
        "& .MuiToggleButtonGroup-grouped": {
          color: themeValues.palette.text.primary,
        },
      }}
    >
      <ToggleButton sx={{ color: themeValues.palette.text.primary }} value={sliderTypes.disabled}>
        <FormattedMessage id="sliderTypes.disabled" />
      </ToggleButton>
      <ToggleButton sx={{ color: themeValues.palette.text.primary }} value={sliderTypes.activated}>
        <FormattedMessage id="sliderTypes.activated" />
      </ToggleButton>
      <ToggleButton sx={{ color: themeValues.palette.text.primary }} value={sliderTypes.inverted}>
        <FormattedMessage id="sliderTypes.inverted" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
