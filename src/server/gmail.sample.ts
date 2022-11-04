import { config } from "dotenv";
import { promises as fs } from "fs";
import { OAuth2Client, OAuth2ClientOptions } from "google-auth-library";
import { google } from "googleapis";
import path from "path";
import process from "process";

import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

try {
  config({
    path: require.resolve("../../.env.local"),
  });
} catch (error) {
  // file does not exist in staging environment
}
config({
  path: require.resolve("../../.env"),
});
// const fs = require("fs").promises;
// const path = require("path");
// const process = require("process");
// const { authenticate } = require("@google-cloud/local-auth");
// const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.js");

const credentials: OAuth2ClientOptions = {
  clientId: process.env.GMAIL_CLIENT_ID,
  // project_id: process.env.GMAIL_PROJECT_ID,
  // auth_uri: process.env.GMAIL_AUTH_URI,
  // token_uri: process.env.GMAIL_TOKEN_URI,
  // auth_provider_x509_cert_url: process.env.GMAIL_AUTH_PROVIDER_CERT_URL,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  redirectUri: process.env.GMAIL_REDIRECT_URIS,
};

const token = {
  type: process.env.GMAIL_TYPE,
  client_id: process.env.GMAIL_CLIENT_ID,
  client_secret: process.env.GMAIL_CLIENT_SECRET,
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
};

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    return google.auth.fromJSON(token);
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: any) {
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: credentials.clientId,
    client_secret: credentials.clientSecret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  // let client: any = await loadSavedCredentialsIfExist();
  // if (client) {
  //   return client;
  // }

  const oAuth2Client = new OAuth2Client(credentials);

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    response_type: "CODE",
    scope: SCOPES,
  });
  // oAuth2Client.credentials = {
  //   refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  // };

  getAccessToken(oAuth2Client, () => {});

  if (oAuth2Client?.credentials) {
    await saveCredentials(oAuth2Client);
  }
  return oAuth2Client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth: any) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({ userId: "me" });
  const labels = res.data.messages;
  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return;
  }
  console.log("Labels:");
  labels.forEach(async (label) => {
    const res = await gmail.users.messages.get({
      userId: "me",
      id: label.id ?? undefined,
    });
    console.log(res.data.payload?.headers);
  });
}

authorize().then(listLabels).catch(console.error);

function getAccessToken(oauth2Client: any, callback: any) {
  // generate consent page url
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // will return a refresh token
    scope: SCOPES,
  });

  console.log("Visit the url: ", url);
  rl.question("Enter the code here:", function (code) {
    // request access token
    oauth2Client.getToken(code, function (err: any, tokens: any) {
      if (err) {
        return callback(err);
      }
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      console.log(tokens);
      oauth2Client.credentials = tokens;
      callback(oauth2Client);
      listLabels(oauth2Client);
    });
  });
}
