import "../styles/globals.css";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeValues } from "../components/utils/themeValues";
import { IntlProvider } from "react-intl";
import { useNavigatorLocale } from "../components/hooks/useNavigatorLocale";

function App({ Component, pageProps }) {
  const theme = createTheme(themeValues);
  const locale = useNavigatorLocale();

  return (
    <>
      <IntlProvider locale={locale.locale} key={locale} messages={locale.messages}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Head>
          <Component style={{ height: "100%" }} {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </>
  );
}

export default App;
