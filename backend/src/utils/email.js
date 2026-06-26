import { transporter } from "../config/email.js";
import { renderTemplate } from "../utils/renderTemplate.js";

export const sendEmail = async ({ to, subject, template, data }) => {
  const html = renderTemplate(template, data);

  return transporter.sendMail({
    from: `"Job Portal" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};
