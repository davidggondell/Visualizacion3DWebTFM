import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { themeValues } from "../components/utils/themeValues";
import { IntlProvider } from "react-intl";
import locales from "../config/locales";
import { AppSidebar } from "../components/UIComponents/components/AppSidebar";
import "@testing-library/jest-dom";
import { TimeControls } from "../components/UIComponents/components/TimeControls";
import { CameraControls } from "../components/UIComponents/components/CameraControls";
import { appControlsReducer } from "../components/UIComponents/appControlsReducer";
import { canvasReducer } from "../components/scenes/canvasReducer";

const defaultStore = configureStore({
  reducer: {
    appControls: appControlsReducer.reducer,
    canvas: canvasReducer.reducer,
  },
});

const theme = createTheme(themeValues);

const MyProvider = ({ store, children }) => {
  return (
    <Provider store={store}>
      <IntlProvider locale={"es"} key={"es"} messages={locales["es"]}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </IntlProvider>
    </Provider>
  );
};

test("Renderiza AppSidebar correctamente", () => {
  const { getByText } = render(
    <MyProvider store={defaultStore}>
      <AppSidebar />
    </MyProvider>,
  );
  const texto = getByText("Cambiar Cúmulo");
  expect(texto).toBeInTheDocument();
});

test("Renderiza TimeControls correctamente", () => {
  const myStore = configureStore({
    reducer: {
      appControls: appControlsReducer.reducer,
      canvas: canvasReducer.reducer,
    },
    preloadedState: { appControls: { timeControlsOpened: true } },
  });

  const { getByText } = render(
    <MyProvider store={myStore}>
      <TimeControls />
    </MyProvider>,
  );
  const avanzar = getByText("Avanzar");
  const retroceder = getByText("Retroceder");
  expect(avanzar).toBeInTheDocument();
  expect(retroceder).toBeInTheDocument();
});

test("Renderiza CameraControls correctamente", () => {
  const myStore = configureStore({
    reducer: {
      appControls: appControlsReducer.reducer,
      canvas: canvasReducer.reducer,
    },
    preloadedState: { appControls: { cameraControlsOpened: true } },
  });

  const { getByText } = render(
    <MyProvider store={myStore}>
      <CameraControls />
    </MyProvider>,
  );
  const texto = getByText("Órbita");
  expect(texto).toBeInTheDocument();
});
