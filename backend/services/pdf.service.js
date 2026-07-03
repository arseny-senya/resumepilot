import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

export async function generatePDF(data) {
  // путь к HTML шаблону
  const templatePath = path.join(process.cwd(), "pdf", "template.html");

  // читаем HTML
  let html = fs.readFileSync(templatePath, "utf8");

  // заменяем данные
  html = html
    .replace("{{NAME}}", data.name || "")
    .replace("{{CONTACT}}", data.contact || "")
    .replace("{{SKILLS}}", data.skills || "");

  // запускаем браузер
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  // создаем PDF
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return pdf;
}
