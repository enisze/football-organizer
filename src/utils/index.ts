import type { AppRouter } from "@/src/utils/root";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";


export { createInnerTRPCContext, createTRPCContext } from "./trpc";

// TODO: Maybe just export `createAction` instead of the whole `trpc` object?
export { t } from "./trpc";

export type { AppRouter } from "./root";


/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;