export const transformDate = (date: Date) => {
  const day = Intl.DateTimeFormat("de", { weekday: "long" }).format(date);
  const dateString = date.toLocaleDateString();

  return [day, dateString].join(" ");
};
