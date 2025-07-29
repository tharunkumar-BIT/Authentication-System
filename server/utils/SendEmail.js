import transporter from "../config/nodeMailer.js";

export const sendWelcomeEmail = async (email) => {
  const mailoptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to TK's Website",
    text: `Welcome to TK's website. Your account has been created with email id: ${email}`,
  };

  await transporter.sendMail(mailoptions);
};

export const sendVerficationOtp = async (email, otp) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Account Verfication OTP",
    text: `Your OTP is ${otp}. Verify your account using this OTP.`,
  };

  await transporter.sendMail(mailOptions);
};
