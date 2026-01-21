import nodemailer from "nodemailer"
import { EMAIL_USER } from "../config/dotenvConfig.js";
export const sendMail = async (to, subject, html) =>{
  try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: `Treno <${EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('mail sent:', info.messageId);
    return {success: true, messageId: info.messageId};
  } catch (error) {
    console.log('error sneding mail', error);
    return {success: fail, error: error.message}
  }
}