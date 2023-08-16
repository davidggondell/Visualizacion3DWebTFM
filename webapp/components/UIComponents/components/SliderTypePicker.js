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
    >
      <ToggleButton sx={{ color: themeValues.palette.primary.main }} value={sliderTypes.disabled}>
        <FormattedMessage id="sliderTypes.disabled" />
      </ToggleButton>
      <ToggleButton sx={{ color: themeValues.palette.primary.main }} value={sliderTypes.activated}>
        <FormattedMessage id="sliderTypes.activated" />
      </ToggleButton>
      <ToggleButton sx={{ color: themeValues.palette.primary.main }} value={sliderTypes.inverted}>
        <FormattedMessage id="sliderTypes.inverted" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
