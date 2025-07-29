import transporter from "../config/nodeMailer.js";

export const sendEmail = async (email) => {
  const mailoptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to TK's Website",
    text: `Welcome to TK's website. Your account has been created with email id: ${email}`,
  };

  await transporter.sendMail(mailoptions);
};
