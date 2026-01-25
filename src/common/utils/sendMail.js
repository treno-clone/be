import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASSWORD } from "../config/dotenvConfig.js";

export const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Treno <${EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent:", info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.log("Error sending mail:", error);
    return { success: false, error: error.message };
  }
};
