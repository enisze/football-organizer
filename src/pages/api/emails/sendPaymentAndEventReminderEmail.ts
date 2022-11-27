import { createScheduledFunction } from "inngest";
// This code will be called by the scheduled function.
const job = async () => {
  return "hello!"; // You can write whatever you want here.
};

//TODO: Set up cronjob for reminding
export const a = createScheduledFunction(
  "Demo function", // The name of your function, used for observability.
  "0 * * * *", // The cron syntax for the function
  job // The function code, defined above.
);
