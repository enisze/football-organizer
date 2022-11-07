import { first } from "lodash";

export const getEuroAmount = (snippet: string): number => {
  const res = snippet?.split("€");

  let amount = 0;
  if (res[0]) {
    const convertedToDecimal = first(res)?.split("Sie")[1]?.replace(",", ".");
    amount = Number(convertedToDecimal?.replace(/[^0-9\.]+/g, ""));
  }
  return amount;
};
