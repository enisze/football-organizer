import type { OAuth2ClientOptions } from "google-auth-library";
import { OAuth2Client } from "google-auth-library";

import { publicProcedure, router } from "../trpc";

const credentials: OAuth2ClientOptions = {
  clientId: process.env.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  redirectUri: process.env.GMAIL_REDIRECT_URIS,
};

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

export const gmailRouter = router({
  test: publicProcedure.query(() => {
    const oAuth2Client = new OAuth2Client(credentials);

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    return authorizeUrl;
  }),
});
