import { transporter } from "../config/email.js";
import { renderTemplate } from "../utils/renderTemplate.js";

export const sendEmail = async ({ to, subject, template, data }) => {
  const html = renderTemplate(template, data);

  return transporter.sendMail({
    from: `"Job Portal" <${process.env.MAIL_USERNAME}>`,
    to,
    subject,
    html,
  });
};

export const sendWelcomeEmail = async (name, email) => {
  try {
    return await sendEmail({
      to: email,
      subject: "Welcome to Job Portal",
      template: "welcome",
      data: { name, email },
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
