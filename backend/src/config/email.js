import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail", // true for 465, false for other ports
  auth: {
    user: env.MAIL_USERNAME,
    pass: env.MAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});
