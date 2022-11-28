import type { Event } from "@prisma/client";
import { isAfter } from "date-fns";
import type { OAuth2ClientOptions } from "google-auth-library";
import { OAuth2Client } from "google-auth-library";
import type { gmail_v1 } from "googleapis";
import { google } from "googleapis";
import { createScheduledFunction } from "inngest";
import { filter, find, forEach, map } from "lodash";
import { getEuroAmount } from "../../../helpers/getEuroAmount";
import { isDateInCertainRange } from "../../../helpers/isDateInCertainRange";
const job = async () => {
  const result = await getPaypalEmails();

  if (!result) return;

  const events = await prisma?.event.findMany();
  const users = await prisma?.user.findMany();
  const payments = await prisma?.payment.findMany();

  //TODO: Check that the user name is not Enis Zejnilovic or anything similar.
  forEach(users, (user) => {
    //Get all paypal emails from specific user
    const filteredByUserAndDate = filter(result, (res) => {
      if (!res.internalDate) return false;

      const paymentDate = new Date(Number(res.internalDate));
      return (
        res.snippet?.toLowerCase().includes(user.name.toLowerCase()) &&
        isAfter(paymentDate, new Date("01.11.2022"))
      );
    }) as gmail_v1.Schema$Message[];

    forEach(filteredByUserAndDate, async (email) => {
      const res = find(payments, (payment) => payment.gmailMailId === email.id);
      if (res) return;

      const result = await isInAmountRangeAndEventBookingDate(email, events);

      if (!result) return;
      if (!email.snippet) return;
      if (!email.id) return;

      const { conditionFulfilled, event } = result;

      if (!event?.id) return;

      if (conditionFulfilled) {
        const amount = getEuroAmount(email.snippet);
        await prisma?.payment.create({
          data: {
            eventId: event.id,
            amount,
            paymentDate: new Date(Number(email.internalDate)),
            gmailMailId: email.id,
            userId: user.id,
          },
        });
      }
      return;
    });
  });
};

export const cronjobForPayments = createScheduledFunction(
  "Cronjob for emails to payments",
  "11 0 * * *", // The cron syntax for the function
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
