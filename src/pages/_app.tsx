import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { Inter as FontSans } from "@next/font/google";
import { trpc } from "../utils/trpc";

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";
import { RecoilURLSyncJSON } from "recoil-sync";
import { PromiseQueueContextProvider } from "../contexts/PromiseQueueContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
            <SessionProvider session={session}>
              <PromiseQueueContextProvider>
                <Component {...pageProps} />
              </PromiseQueueContextProvider>
            </SessionProvider>
          </RecoilURLSyncJSON>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
