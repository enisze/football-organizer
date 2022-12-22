import { SendSmtpEmail } from "@sendinblue/client";
import apiInstance from "../src/emails/transporter";
import { generateNewRefreshTokenTemplate } from "./emailTemplates/newRefreshTokenTemplate";

export const sendNewRefreshTokenMail = async ({ link }: { link: string }) => {
  const html = generateNewRefreshTokenTemplate({
    link,
  }).html;

  const sendSmptMail = new SendSmtpEmail();

  sendSmptMail.to = [{ email: "eniszej@gmail.com" }];
  sendSmptMail.htmlContent = html;
  sendSmptMail.sender = {
    email: "eniszej@gmail.com",
    name: "Football Organizer",
  };
  sendSmptMail.subject = "Neues Refresh Token benötigt";

  const res = await apiInstance.sendTransacEmail(sendSmptMail);

  return { success: res.response.statusCode === 201 };
};
