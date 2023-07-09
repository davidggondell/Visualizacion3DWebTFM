import AutoModeIcon from "@mui/icons-material/AutoMode";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

export const CameraControlsButton = ({ onChange }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange();
  };

  return (
    <>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab
          label={
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Typography sx={{ padding: 1 }}>Orbit</Typography>
              <AutoModeIcon />
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Typography sx={{ padding: 1 }}>First Person</Typography>
              <RocketLaunchIcon />
            </Box>
          }
        />
      </Tabs>
    </>
  );
};
