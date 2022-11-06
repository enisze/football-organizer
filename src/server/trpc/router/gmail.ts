import type { OAuth2ClientOptions } from "google-auth-library";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { filter, find, map } from "lodash";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";

const credentials: OAuth2ClientOptions = {
  clientId: process.env.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  redirectUri: process.env.GMAIL_REDIRECT_URIS,
};

const oAuth2Client = new OAuth2Client(credentials);

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

export const gmailRouter = router({
  generateAuthLink: publicProcedure.query(() => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent",
    });
    return authorizeUrl;
  }),
  listLabels: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const { code } = input;
      if (!code) return "no code";

      // const { tokens } = await oAuth2Client.getToken(code);
      try {
        oAuth2Client.setCredentials({
          refresh_token: process.env.GMAIL_REFRESH_TOKEN,
        });

        const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
        const { data } = await gmail.users.messages.list({ userId: "me" });

        const result = await Promise.all(
          map(data.messages, async (label) => {
            const res = await gmail.users.messages.get({
              userId: "me",
              id: label.id ?? undefined,
            });
            return res.data;
          })
        );

        const filteredRes = filter(result, (res) => {
          const header = find(res.payload?.headers, (header) => {
            return header.name === "From";
          });

          return (
            res.labelIds?.includes("INBOX") &&
            header?.value?.includes("service@paypal.de")
          );
        });

        return filteredRes;
      } catch (error) {
        console.log("failed token");
        console.log(error);
        return "failed";
      }
    }),
});
