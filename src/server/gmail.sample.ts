import { authenticate } from "@google-cloud/local-auth";
import { config } from "dotenv";
import { promises as fs } from "fs";
import { google } from "googleapis";
import path from "path";
import process from "process";

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
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

const credentials = {
  web: {
    client_id: process.env.GMAIL_CLIENT_ID,
    project_id: process.env.GMAIL_PROJECT_ID,
    auth_uri: process.env.GMAIL_AUTH_URI,
    token_uri: process.env.GMAIL_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GMAIL_AUTH_PROVIDER_CERT_URL,
    client_secret: process.env.GMAIL_CLIENT_SECRET,
    redirect_uris: process.env.GMAIL_REDIRECT_URIS,
  },
};

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    const test = {
      web: {
        client_id: process.env.GMAIL_CLIENT_ID,
        project_id: process.env.GMAIL_PROJECT_ID,
        auth_uri: process.env.GMAIL_AUTH_URI,
        token_uri: process.env.GMAIL_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GMAIL_AUTH_PROVIDER_CERT_URL,
        client_secret: process.env.GMAIL_CLIENT_SECRET,
        redirect_uris: process.env.GMAIL_REDIRECT_URIS,
      },
    };

    const token = {
      type: process.env.GMAIL_TYPE,
      client_id: process.env.GMAIL_CLIENT_ID,
      client_secret: process.env.GMAIL_CLIENT_SECRET,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    };

    console.log(token);

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
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client: any = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client?.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth: any) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.labels.list({
    userId: "me",
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return;
  }
  console.log("Labels:");
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}

authorize().then(listLabels).catch(console.error);
