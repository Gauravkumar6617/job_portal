import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const renderTemplate = (templateName, data) => {
  // reads from src/template/welcome.html
  const templatePath = path.join(
    __dirname,
    "../template",
    `${templateName}.html`,
  );
  let html = fs.readFileSync(templatePath, "utf-8");

  // replace {{name}} → "Gaurav", {{email}} → "gaurav@gmail.com" etc
  Object.entries(data).forEach(([key, value]) => {
    html = html.replaceAll(`{{${key}}}`, value);
  });

  return html;
};
