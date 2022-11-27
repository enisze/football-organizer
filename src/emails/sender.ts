import { sendInBlueTransport } from "./transporter";

// send mail with defined transport object
export const sendEmail = async () => {
  await sendInBlueTransport.sendMail({
    from: '"Sender Name" <eniszej@gmail.com>',
    to: "eniszej@gmail.com",
    subject: "Hello from node",
    text: "Hello world?",
    html: "<strong>Hello world?</strong>",
    headers: { "x-myheader": "test header" },
  });
};
