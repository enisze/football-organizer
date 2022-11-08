import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import { CssVarsProvider, extendTheme, StyledEngineProvider } from "@mui/joy";
import "../styles/globals.css";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          softBg: "#73C8A9",
          outlinedBg: "#73C8A9",
          outlinedHoverBg: "#373B44",
          outlinedColor: "#73C8A9",
          outlinedHoverBorder: "#73C8A9",
        },
      },
    },
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default trpc.withTRPC(MyApp);
