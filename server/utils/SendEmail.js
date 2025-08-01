import transporter from "../config/nodeMailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../config/EmailTemplate.js";

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
    // text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
      "{{email}}",
      email
    ),
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetOtp = async (email, otp) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Password Reset OTP",
    // text: `Your OTP is ${otp}. Reset your password using this OTP.`,
    html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
      "{{email}}",
      email
    ),
  };

  await transporter.sendMail(mailOptions);
};
