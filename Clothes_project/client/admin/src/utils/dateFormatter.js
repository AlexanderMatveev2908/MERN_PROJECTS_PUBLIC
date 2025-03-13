export const dateFormatter = (date) =>
  new Intl.DateTimeFormat("en-US", {
    style: "date",
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
