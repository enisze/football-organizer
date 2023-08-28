"use server";

import { loggerLink } from "@trpc/client";
import {
  experimental_createServerActionHandler,
  experimental_createTRPCNextAppDirServer,
} from "@trpc/next/app-dir/server";
import { headers } from "next/headers";


import { edgeRouter } from "@/src/utils/edge";
import type { AppRouter } from "@/src/utils/root";
import { transformer } from "@/src/utils/transformer";
import { endingLink } from "./shared";

import { createInnerTRPCContext } from "@/src/utils/trpc";

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      transformer,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        endingLink({
          headers: () => {
            const h = new Map(headers());
            h.delete("connection");
            h.delete("transfer-encoding");
            h.set("x-trpc-source", "server");
            return Object.fromEntries(h.entries());
          },
        }),
      ],
    };
  },
});

export { type RouterInputs, type RouterOutputs } from "../../utils";

export const createAction = experimental_createServerActionHandler({
  router: edgeRouter,
  createContext: () => createInnerTRPCContext({ auth: {}}),
});