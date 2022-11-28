import nodemailer from "nodemailer";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Transport = require("nodemailer-sendinblue-transport");

//Somehow did not work
const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: Number(process.env.SMPT_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMPT_USERNAME,
    pass: process.env.SMPT_PASSWORD,
  },
  logger: true,
  service: "SendinBlue",
});

export const sendInBlueTransport = nodemailer.createTransport(
  new Transport({ apiKey: process.env.SENDINBLUE_API_KEY })
);
