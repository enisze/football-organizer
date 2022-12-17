import type { OAuth2ClientOptions } from "google-auth-library";
import { OAuth2Client } from "google-auth-library";
import type { gmail_v1 } from "googleapis";
import { google } from "googleapis";
import { createScheduledFunction } from "inngest";
import { filter, find, forEach, map } from "lodash";
import type { Event, Payment } from "../prisma/generated/client";
import { PrismaClient } from "../prisma/generated/client";
import { getEuroAmount } from "../src/helpers/getEuroAmount";
import { isDateInCertainRange } from "../src/helpers/isDateInCertainRange";

const prisma = new PrismaClient();

const job = async () => {
  const result = await getPaypalEmails();

  if (!result) return { message: "No paypal emails" };

  if (result === "Token has expired") return { message: "New token needed" };

  const events = await prisma.event.findMany();
  const users = await prisma.user.findMany();
  const payments = await prisma.payment.findMany();

  const paymentsAddedForUser: any[] = [];
  const paymentsCreated: Payment[] = [];

  forEach(
    filter(users, (user) => user.email !== "eniszej@gmail.com"),

    async (user) => {
      //Get all paypal emails from specific user

      const filteredByUser = filter(result, (res) => {
        if (!res.internalDate) return false;

        return res.snippet?.toLowerCase().includes(user.name.toLowerCase());
      }) as gmail_v1.Schema$Message[];

      console.log(user.name + " got " + filteredByUser.length + " paypalMails");

      forEach(filteredByUser, async (email) => {
        const res = find(
          payments,
          (payment) => payment.gmailMailId === email.id
        );
        if (res) {
          console.log("payment already exists");
          return;
        }

        const result = await isInAmountRangeAndEventBookingDate(email, events);

        if (!result || !email.snippet || !email.id) {
          console.log("email data missing");
          return;
        }

        const { conditionFulfilled, event } = result;

        if (!event?.id || !conditionFulfilled) {
          console.log("No event id or condition failed");
          return;
        }

        const amount = getEuroAmount(email.snippet);
        paymentsAddedForUser.push([
          {
            eventId: event.id,
            amount,
            paymentDate: new Date(Number(email.internalDate)).toDateString(),
            name: user.name,
          },
        ]);
        const paymentCreated = await prisma.payment.create({
          data: {
            eventId: event.id,
            amount,
            paymentDate: new Date(Number(email.internalDate)),
            gmailMailId: email.id,
            userId: user.id,
          },
        });
        paymentsCreated.push(paymentCreated);
      });
    }
  );
  //TODO: Delete all events older than a week

  return `Users with payments: ${paymentsAddedForUser} 
  Payments created ${paymentsCreated}`;
};

export const cronjobForPayments = createScheduledFunction(
  "Cronjob for emails to payments",
  "0 11 * * *", // The cron syntax for the function
  job
);

const credentials: OAuth2ClientOptions = {
  clientId: process.env.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  redirectUri: process.env.GMAIL_REDIRECT_URIS,
};

const PAYPAL_LABEL = "Label_3926228921657449356";

const oAuth2Client = new OAuth2Client(credentials);

const getPaypalEmails = async () => {
  try {
    oAuth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const { data } = await gmail.users.messages.list({
      userId: "me",
      labelIds: [PAYPAL_LABEL],
    });

    const result = await Promise.all(
      map(data.messages, async (label) => {
        const res = await gmail.users.messages.get({
          userId: "me",
          id: label.id ?? undefined,
        });
        return res.data;
      })
    );

    if (!result) {
      console.log("No Paypal data");
      return;
    }

    return result;
  } catch (error) {
    console.log(error);
    return "Token has expired";
  }
};

const AMOUNT_LIST = [4.5, 5, 10, 11];

const isInAmountRangeAndEventBookingDate = async (
  paymentMail: gmail_v1.Schema$Message,
  events: Event[] | undefined
): Promise<
  { conditionFulfilled: boolean; event: Event | undefined } | undefined
> => {
  if (!paymentMail.internalDate) return undefined;
  if (!paymentMail.snippet) return undefined;
  if (!events) return undefined;

  const amount = getEuroAmount(paymentMail.snippet);
  const paymentDate = new Date(Number(paymentMail.internalDate));

  const eventWithBookingDateInRange = events.find((event) => {
    if (!event.bookingDate) return null;
    const dateInRange = isDateInCertainRange(paymentDate, event.bookingDate);

    return dateInRange;
  });

  const amountInRange = AMOUNT_LIST.includes(amount);

  return {
    conditionFulfilled: Boolean(eventWithBookingDateInRange) && amountInRange,
    event: eventWithBookingDateInRange,
  };
};
