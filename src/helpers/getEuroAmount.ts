export const getEuroAmount = (snippet: string): number => {
  const res = snippet?.split("€");

  let amount = 0;
  if (res[0]) {
    amount = Number(res[0].replace(/\D/g, ""));
  }
  return amount;
};
