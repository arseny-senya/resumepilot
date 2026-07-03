import puppeteer from "puppeteer";
import User from "../models/User.js";

const PRO_TEMPLATES = ["executive", "tech", "designer", "dark", "minimal"];

export const generatePdf = async (req, res) => {
  let browser;

  try {
    const data = req.body;
    const template = data.template || "modern";

    const isProTemplate = PRO_TEMPLATES.includes(template);

    if (isProTemplate) {
      if (!req.user) {
        return res.status(401).json({
          message: "Для PRO шаблонов необходимо войти в аккаунт.",
        });
      }

      const user = await User.findById(req.user.id);

      if (!user || !user.isPro) {
        return res.status(403).json({
          message: "Этот шаблон доступен только в PRO.",
        });
      }
    }

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://127.0.0.1:5500";

    await page.goto(`${frontendUrl}/export.html`, {
      waitUntil: "networkidle0",
    });

    await page.evaluate((resumeData) => {
      window.renderExportResume(resumeData);
    }, data);

    await page.waitForFunction(() => window.resumeReady === true, {
      timeout: 5000,
    });

    const rect = await page.evaluate(() => {
      const cv = document.querySelector(".cv");
      const box = cv.getBoundingClientRect();

      return {
        width: Math.ceil(box.width),
        height: Math.ceil(box.height),
      };
    });

    const pdf = await page.pdf({
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      printBackground: true,
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    });
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

    res.send(pdf);
  } catch (err) {
    console.error("PDF error:", err);

    res.status(500).json({
      message: "Ошибка генерации PDF",
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
