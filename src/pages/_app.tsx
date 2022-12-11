import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import { CssVarsProvider, extendTheme, StyledEngineProvider } from "@mui/joy";
import { RecoilRoot } from "recoil";
import { RecoilURLSyncJSON } from "recoil-sync";
import { PromiseQueueContextProvider } from "../contexts/PromiseQueueContext";
import "../styles/globals.css";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          outlinedBg: "#73C8A9",
          outlinedHoverBg: "#373B44",
          outlinedColor: "#73C8A9",
          outlinedHoverBorder: "#73C8A9",
          outlinedActiveBg: "#1E293B",
          outlinedActiveBorder: "#1E293B",
          plainHoverBg: "#373B44",
          plainColor: "#73C8A9",
          plainActiveBorder: "#73C8A9",

          solidBg: "#373B44",
          solidHoverBg: "#1E293B",
          solidColor: "#73C8A9",
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
    <RecoilRoot>
      <RecoilURLSyncJSON
        location={{ part: "queryParams" }}
        browserInterface={{
          getURL: () => {
            if (typeof Window === "undefined") {
              return process.env.NEXT_PUBLIC_BASE_URL as string;
            } else {
              return window.document.location.toString();
              // ...or here but it never seems to make it to here
            }
          },
        }}
      >
        <StyledEngineProvider injectFirst>
          <CssVarsProvider theme={theme}>
            <SessionProvider session={session}>
              <PromiseQueueContextProvider>
                <Component {...pageProps} />
              </PromiseQueueContextProvider>
            </SessionProvider>
          </CssVarsProvider>
        </StyledEngineProvider>
      </RecoilURLSyncJSON>
    </RecoilRoot>
  );
};

export default trpc.withTRPC(MyApp);
