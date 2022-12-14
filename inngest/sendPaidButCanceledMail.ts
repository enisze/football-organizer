import { SendSmtpEmail } from "@sendinblue/client";
import type { Event, User } from "../prisma/generated/client";
import apiInstance from "../src/emails/transporter";
import { generateNewEventTemplate } from "./emailTemplates/newEventTemplate";

export const sendPaidButCanceledMail = async (
  event: Event | null,
  user: User | null
) => {
  const html = generateNewEventTemplate({
    event: { ...event, date: event?.date ? new Date(event.date) : new Date() },
    userName: user?.name ?? "",
  }).html;

  const sendSmptMail = new SendSmtpEmail();

  sendSmptMail.to = [{ email: "eniszej@gmail.com" }];
  sendSmptMail.htmlContent = html;
  sendSmptMail.sender = {
    email: "eniszej@gmail.com",
    name: "Football Organizer",
  };
  sendSmptMail.subject = "BEZAHLUNG TROTZ ABSAGE";

  const res = await apiInstance.sendTransacEmail(sendSmptMail);

  return { success: res.response.statusCode === 201 };
};
