import { TRPCError } from "@trpc/server";
import { isAfter } from "date-fns";
import type { OAuth2ClientOptions } from "google-auth-library";
import { OAuth2Client } from "google-auth-library";
import type { gmail_v1 } from "googleapis";
import { google } from "googleapis";
import { filter, map } from "lodash";
import { z } from "zod";
import { sendPaidButCanceledMail } from "../../../../inngest/sendPaidButCanceledMail";
import { sendWelcomeMail } from "../../../../inngest/sendWelcomeMail";

import { protectedProcedure, router } from "../trpc";

const credentials: OAuth2ClientOptions = {
  clientId: process.env.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  redirectUri: process.env.GMAIL_REDIRECT_URIS,
};

const oAuth2Client = new OAuth2Client(credentials);

const PAYPAL_LABEL = "Label_3926228921657449356";

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

export const gmailRouter = router({
  generateAuthLink: protectedProcedure.query(() => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent",
      redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + "/oauth2callback",
    });
    return authorizeUrl;
  }),

  getToken: protectedProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input: { code } }) => {
      const { tokens } = await oAuth2Client.getToken(code);
      return tokens;
    }),
  paypalEmails: protectedProcedure.query(
    async ({
      ctx: {
        session: {
          user: { name },
        },
      },
    }) => {
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

        if (!result)
          throw new TRPCError({ code: "NOT_FOUND", message: "No Paypal data" });

        const filteredByUserAndDate = filter(result, (res) => {
          if (!res.internalDate) return false;

          const paymentDate = new Date(Number(res.internalDate));
          return (
            res.snippet?.toLowerCase().includes(name.toLowerCase()) &&
            isAfter(paymentDate, new Date("01.11.2022"))
          );
        }) as gmail_v1.Schema$Message[];

        return filteredByUserAndDate;
      } catch (error) {
        console.log("failed token");
        console.log(error);
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Probably new gmail token needed",
        });
      }
    }
  ),
  sendPaidButCancledMail: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input: { eventId } }) => {
      const event = await prisma.event.findUnique({ where: { id: eventId } });
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      return await sendPaidButCanceledMail(event, user);
    }),

  sendWelcomeMail: protectedProcedure.mutation(
    async ({ ctx: { prisma, session } }) => {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      return await sendWelcomeMail(user);
    }
  ),
});
