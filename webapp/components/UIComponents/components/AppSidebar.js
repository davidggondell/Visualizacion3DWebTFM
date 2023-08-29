import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { TrapezeButton } from "../BaseComponents/TrapezeButton";
import { Triangle } from "../BaseComponents/Triangle";
import { themeValues } from "../../utils/themeValues";
import { TrapezeBox } from "../BaseComponents/TrapezeBox";
import { Grid, Typography } from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { GalaxyIcon } from "../../../icons/GalaxyIcon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { CameraIcon } from "../../../icons/CameraIcon";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { AstronautIcon } from "../../../icons/AstronautIcon";
import { useDispatch, useSelector } from "react-redux";
import { getFiltersModalOpened, getInstructionsOpened, getSidebarOpened } from "../selectors";
import { closeSidebar, openCameraControls, openFiltersModal, openSidebar, openTimeControls } from "../actions";
import Slide from "@mui/material/Slide";
import { FormattedMessage } from "react-intl";
import { getStarZoom } from "../../scenes/selectors";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const open = useSelector(getSidebarOpened);
  const filtersModalOpened = useSelector(getFiltersModalOpened);
  const instructionsOpened = useSelector(getInstructionsOpened);
  const starZoom = useSelector(getStarZoom);
  const dispatch = useDispatch();
  const { height } = useWindowDimensions(0.7);

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={() => closeSidebar(dispatch)}
      onOpen={() => openSidebar(dispatch)}
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
          <Slide direction="left" in={!filtersModalOpened && !instructionsOpened && !starZoom}>
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
              <TrapezeButton direction="left" onClick={() => (open ? closeSidebar(dispatch) : openSidebar(dispatch))}>
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
                closeSidebar(dispatch);
                router.push("/");
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
                closeSidebar(dispatch);
                openCameraControls(dispatch);
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
                closeSidebar(dispatch);
                openTimeControls(dispatch);
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 34, color: themeValues.palette.primary.main }} />
              <Typography fontSize={16}>
                <FormattedMessage id="sidebar.timeControls" />
              </Typography>
            </GridItem>
            <BoxCustomDivider />
            <GridItem
              onClick={() => {
                closeSidebar(dispatch);
                openFiltersModal(dispatch);
              }}
            >
              <FilterAltOutlinedIcon sx={{ fontSize: 34, color: themeValues.palette.primary.main }} />
              <Typography fontSize={16}>
                <FormattedMessage id="sidebar.starFilters" />
              </Typography>
            </GridItem>
            <BoxCustomDivider />
            <GridItem
              onClick={() => {
                closeSidebar(dispatch);
                router.push("/myClusters");
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
