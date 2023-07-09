import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { TrapezeButton } from "./BaseComponents/TrapezeButton";
import { Triangle } from "./BaseComponents/Triangle";
import { themeValues } from "../utils/themeValues";
import { TrapezeBox } from "./BaseComponents/TrapezeBox";
import { Grid, Typography } from "@mui/material";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { GalaxyIcon } from "../../icons/GalaxyIcon";
import { TimeIcon } from "../../icons/TimeIcon";
import { CameraIcon } from "../../icons/CameraIcon";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { AstronautIcon } from "../../icons/AstronautIcon";
import { AppControlsContext } from "./AppControlsContext";
import Slide from "@mui/material/Slide";
import { FormattedMessage } from "react-intl";

const GridItem = ({ children, ...props }) => {
  return (
    <Grid
      item
      sx={{
        flex: "1 1 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
        },
      }}
      {...props}
    >
      {children}
    </Grid>
  );
};

const BoxCustomDivider = () => (
  <Box
    sx={{
      width: "100%",
      height: 2,
      backgroundColor: themeValues.palette.primary.main,
      boxShadow: `${themeValues.palette.primary.main} 0px 0px 4px`,
    }}
  />
);

const drawerBleeding = 40;
export const AppSidebar = () => {
  const { filtersModalOpened, setFiltersModalOpened, setTimeControlsOpened, setCameraControlsOpened } =
    useContext(AppControlsContext);
  const [open, setOpen] = React.useState(false);
  const { height } = useWindowDimensions(0.7);

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={true}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          backgroundImage: "none",
        },
      }}
    >
      <Box sx={{ width: 220, height: "100%", minHeight: 300 }}>
        <TrapezeBox
          bigBase={height}
          offsetSmallBase={60}
          height={220}
          minWidth={400}
          direction="left"
          color="rgba(0, 248, 248, 0.1)"
          borderColor={themeValues.palette.primary.main}
          borderWidth={2}
          closed={false}
          shadow
        >
          <Slide direction="left" in={!filtersModalOpened}>
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                alignItems: "center",
                left: -drawerBleeding + 2,
                top: 0,
                bottom: 0,
                visibility: "visible",
                zIndex: 99999,
                pointerEvents: "all",
              }}
            >
              <TrapezeButton direction="left" onClick={() => setOpen(!open)}>
                <Triangle
                  direction={open ? "right" : "left"}
                  height={15}
                  halfBase={8}
                  borderColor={themeValues.palette.primary.main}
                  borderWidth={2}
                  shadow
                />
              </TrapezeButton>
            </Box>
          </Slide>
          <Grid
            sx={{ width: "100%", height: "100%" }}
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <BoxCustomDivider />
            <GridItem
              onClick={() => {
                setOpen(false);
              }}
            >
              <GalaxyIcon width={34} height={34} fill={themeValues.palette.primary.main} />
              <Typography fontSize={16}>
                <FormattedMessage id="sidebar.changeCluster" />
              </Typography>
            </GridItem>
            <BoxCustomDivider />
            <GridItem
              onClick={() => {
                setOpen(false);
                setTimeControlsOpened(false);
                setCameraControlsOpened(true);
              }}
            >
              <CameraIcon width={30} height={30} fill={themeValues.palette.primary.main} />
              <Typography fontSize={16}>
                <FormattedMessage id="sidebar.cameraControls" />
              </Typography>
            </GridItem>
            <BoxCustomDivider />
            <GridItem
              onClick={() => {
                setOpen(false);
                setCameraControlsOpened(false);
                setTimeControlsOpened(true);
              }}
            >
              <TimeIcon width={30} height={30} fill={themeValues.palette.primary.main} />
              <Typography fontSize={16}>
                <FormattedMessage id="sidebar.timeControls" />
              </Typography>
            </GridItem>
            <BoxCustomDivider />
            <GridItem
              onClick={() => {
                setOpen(false);
                setFiltersModalOpened(true);
              }}
            >
              <FilterAltOutlinedIcon sx={{ width: 34, height: 34, color: themeValues.palette.primary.main }} />
              <Typography fontSize={16}>
                <FormattedMessage id="sidebar.starFilters" />
              </Typography>
            </GridItem>
            <BoxCustomDivider />
            <GridItem
              onClick={() => {
                setOpen(false);
              }}
            >
              <AstronautIcon width={30} height={30} fill={themeValues.palette.primary.main} />
              <Typography fontSize={16}>
                <FormattedMessage id="sidebar.myClusters" />
              </Typography>
            </GridItem>
            <BoxCustomDivider />
          </Grid>
        </TrapezeBox>
      </Box>
    </SwipeableDrawer>
  );
};
