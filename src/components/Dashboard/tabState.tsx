import { number } from "@recoiljs/refine";
import { atom } from "recoil";
import { syncEffect } from "recoil-sync";

export const currentTabState = atom<number>({
  key: "tab",
  default: 1,
  effects: [syncEffect({ refine: number() })],
});
