import {
  Button,
  Stack,
  Divider,
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItem,
  useTheme,
  Box,
  Typography,
  ThemeProvider,
  IconButton,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { GalaxyIcon } from "../../../../icons/GalaxyIcon";
import React, { useState, useCallback, memo } from "react";
import { ArwesThemeProvider, FrameLines, StylesBaseline } from "@arwes/core";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { addCluster, getLocalStorageUsage, getMyClusters, removeCluster } from "../../../utils/myLocalStorage";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormattedMessage } from "react-intl";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import LZString from "lz-string";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { setNewActiveCluster } from "../../../scenes/actions";
import { useRouter } from "next/router";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const validateCluster = (cluster) => {
  return cluster.every((star) => {
    if (!star?.ID) {
      return false;
    }
    if (!star?.mass_i || star?.mass_i <= 0) {
      return false;
    }
    if (!star?.temp_i || star?.temp_i <= 0) {
      return false;
    }
    if (!star?.x || !star?.y || !star?.z) {
      return false;
    }
    if (star?.Radius && star?.Radius <= 0) {
      return false;
    }
    return true;
  });
};

const fileParse = async (file, onSuccess, onError) => {
  try {
    const decompressed = LZString.decompress(file);
    Papa.parse(decompressed, {
      complete: (result) => {
        if (!validateCluster(result.data)) {
          onError("myClusters.play.errorValidating");
        } else {
          onSuccess(result.data);
        }
      },
      error: (error) => {
        onError("myClusters.play.errorParsing");
      },
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });
  } catch (error) {
    onError("myClusters.errorDecompressing");
  }
};

const ClusterItem = memo(({ id, name, cluster, openDelete, openError, setBackdropOpened }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Stack sx={{ width: "100%" }} alignItems="center">
        <Divider sx={{ filter: "blur(1px)", width: "98%" }} />
      </Stack>
      <ListItem
        sx={{ paddingY: 2 }}
        secondaryAction={
          <>
            <IconButton
              color="primary"
              onClick={() => {
                setBackdropOpened(true);
                fileParse(
                  cluster,
                  (object) => {
                    setBackdropOpened(false);
                    setNewActiveCluster(dispatch, object);
                    router.push("/clusterView");
                  },
                  (error) => {
                    setBackdropOpened(false);
                    openError(error);
                  },
                );
              }}
            >
              <PlayArrowRoundedIcon fontSize="large" />
            </IconButton>
            <IconButton color="primary" onClick={() => new Promise(() => openDelete())}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "rgba(10, 87, 102, 1)" }}>
            <GalaxyIcon
              width={31}
              height={30}
              style={{ marginTop: "-4px", marginLeft: "-1px" }}
              fill={theme.palette.primary.main}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
          <Typography sx={{ color: theme.palette.primary.main }}>{name}</Typography>
        </ListItemText>
      </ListItem>
    </>
  );
});

const MyClustersPageHeader = memo(({ loading, handleFileChange, items }) => {
  return (
    <Stack sx={{ paddingBottom: 1, paddingX: 1 }} direction="row" alignItems="flex-end" justifyContent="space-between">
      <Typography>{(getLocalStorageUsage() / (1024 * 1024)).toFixed(3)}</Typography>

      <LoadingButton color="secondary" variant="contained" component="label" loading={loading}>
        <FormattedMessage id="myClusters.uploadFile" />
        {!loading && (
          <input accept=".csv" type="file" style={{ display: "none" }} onChange={(event) => handleFileChange(event)} />
        )}
      </LoadingButton>
    </Stack>
  );
});

export const MyClustersPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [items, setItems] = useState(getMyClusters());
  const [loading, setLoading] = useState(false);
  const { height } = useWindowDimensions(0.6);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [successAlert, setSuccessAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [backdropOpened, setBackdropOpened] = useState(false);

  const onFileError = useCallback((error) => {
    setLoading(false);
    if (error?.name == "QuotaExceededError") {
      setErrorAlert("myClusters.readFile.error");
    } else if (error?.name == "invalidType") {
      setErrorAlert("myClusters.uploadFile.invalidType");
    } else {
      setErrorAlert("myClusters.readFile.quotaExceded");
    }
  }, []);

  const handleFileChange = async (event) => {
    setLoading(true);
    const myfile = event.target.files[0];
    if (myfile.type == "text/csv") {
      const reader = new FileReader();
      reader.onload = function (event) {
        const csvString = event.target.result;
        addCluster(
          myfile.name,
          csvString,
          () => {
            setItems(getMyClusters());
            setLoading(false);
            setSuccessAlert("myClusters.uploadFile.success");
          },
          (error) => {
            onFileError(error);
          },
        );
      };
      reader.onerror = function (event) {
        onFileError("error");
      };
      reader.readAsText(myfile);
    } else {
      onFileError({ name: "invalidType" });
    }
    event.target.value = "";
  };

  return (
    <Stack
      sx={{ height: "100%", width: "100%", backgroundColor: theme.palette.background.default }}
      alignItems="center"
      justifyContent="center"
    >
      <IconButton
        color="primary"
        size="large"
        sx={{ position: "absolute", top: 0, left: 0 }}
        onClick={() => router.push("/clusterView")}
      >
        <ArrowBackRoundedIcon fontSize="inherit" />
      </IconButton>
      <Box sx={{ height: height + 42, width: "100%", maxWidth: 800 }}>
        <MyClustersPageHeader loading={loading} handleFileChange={(event) => handleFileChange(event)} items={items} />
        <ArwesThemeProvider>
          <StylesBaseline />
          <FrameLines
            className="arwesFrameFullWidthHeight"
            style={{ width: "100%", height: height }}
            animator={{ animate: false }}
          >
            <ThemeProvider theme={theme}>
              <Stack sx={{ width: "100%", height: height - 20, maxHeight: height - 20, overflow: "auto" }}>
                {items?.length > 0 ? (
                  <List>
                    {items.map((cluster) => (
                      <ClusterItem
                        key={cluster.id}
                        id={cluster.id}
                        name={cluster.name}
                        cluster={cluster.data}
                        openDelete={() => setDeleteDialog({ id: cluster.id, name: cluster.name })}
                        openError={(messageId) => setErrorAlert(messageId)}
                        setBackdropOpened={setBackdropOpened}
                      />
                    ))}
                    <Stack sx={{ width: "100%" }} alignItems="center">
                      <Divider sx={{ filter: "blur(1px)", width: "98%" }} />
                    </Stack>
                  </List>
                ) : (
                  <Stack sx={{ width: "100%", height: "100%" }} alignItems="center" justifyContent="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <SearchOffIcon />
                      </Avatar>
                      <Typography>
                        <FormattedMessage id="myClusters.noFiles" />
                      </Typography>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </ThemeProvider>
          </FrameLines>
        </ArwesThemeProvider>
      </Box>
      <Snackbar
        open={!!successAlert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setSuccessAlert("")}
      >
        <Alert onClose={() => setSuccessAlert("")} severity="success" sx={{ width: "100%" }}>
          {successAlert && <FormattedMessage id={successAlert} />}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorAlert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setErrorAlert("")}
      >
        <Alert onClose={() => setErrorAlert("")} severity="error" sx={{ width: "100%" }}>
          {errorAlert && <FormattedMessage id={errorAlert} />}
        </Alert>
      </Snackbar>
      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage id="myClusters.delete.title" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="myClusters.delete.description" values={{ name: deleteDialog?.name }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>
            <FormattedMessage id="myClusters.delete.cancel" />
          </Button>
          <Button
            onClick={() => {
              removeCluster(
                deleteDialog.id,
                () => {
                  setItems(getMyClusters());
                  setDeleteDialog(null);
                  setSuccessAlert("myClusters.delete.success");
                },
                () => {
                  setDeleteDialog(null);
                  setSuccessAlert("myClusters.delete.error");
                },
              );
            }}
            autoFocus
          >
            <FormattedMessage id="myClusters.delete.confirm" />
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpened}
        onClick={() => setBackdropOpened(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  );
};
