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
          outlinedHoverBg: "#373B44",
          outlinedHoverColor: "#FFFFFF",
          outlinedColor: "#FFFFFF",
          outlinedHoverBorder: "#73C8A9",
          outlinedActiveBg: "#1E293B",
          outlinedActiveBorder: "#73C8A9",

          softBg: "#73C8A9",
          softColor: "#FFFFFF",
          softHoverBg: "#73C8A9",

          plainHoverBg: "#1E293B",
          plainColor: "#FFFFFF",
          plainActiveBorder: "#1E293B",
          plainHoverBorder: "#FFFFFF",
          plainActiveBg: "#1E293B",

          solidBg: "#373B44",
          solidHoverBg: "#1E293B",
          solidHoverColor: "#73C8A9",
          solidColor: "#FFFFFF",
          solidActiveColor: "#73C8A9",
          solidActiveBg: "#1E293B",
          solidActiveBorder: "#73C8A9",
        },
        success: {
          solidColor: "#373B44",
          solidBg: "#73C8A9",

          plainColor: "#73C8A9",
          plainBg: "#1E293B",
          plainHoverBg: "#1E293B",
          plainActiveBg: "#1E293B",
        },
        neutral: {
          // solidColor: "#FFFFFF",
          // solidBg: "#1E293B",
          // outlinedColor: "#FFFFFF",
          outlinedHoverBg: "#373B44",
          outlinedBorder: "#73C8A9",
          outlinedActiveBorder: "#73C8A9",
        },
        info: {
          solidColor: "#FFFFFF",
          solidBg: "#89A6FB",
          outlinedColor: "#FFFFFF",
          outlinedBg: "#FFFFFF",
          outlinedHoverBg: "#89A6FB",
          outlinedHoverBorder: "#73C8A9",

          softColor: "#FFFFFF",
          softBg: "#89A6FB",
        },
        danger: {
          solidColor: "#C96480",
          solidBg: "#1E293B",
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
