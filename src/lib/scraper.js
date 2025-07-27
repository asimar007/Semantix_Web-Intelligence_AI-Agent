import puppeteer from "puppeteer";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

const MAX_LINKS = 20;
const MAX_IMAGES = 15;

const UNWANTED = [
  "script",
  "style",
  ".advertisement",
  ".ads",
  ".popup",
  ".modal",
];

const MAIN_SELECTORS = [
  "main",
  "article",
  '[role="main"]',
  ".content",
  ".main-content",
  ".post-content",
  ".article-content",
];

function buildLinkBlock({ emails, extLinks, intLinks, images }) {
  const lines = [];
  if (emails?.size) lines.push("\n--- Emails ---", ...emails);
  if (intLinks?.size)
    lines.push(
      "\n--- Internal Links ---",
      ...Array.from(intLinks).slice(0, MAX_LINKS)
    );
  if (extLinks?.size)
    lines.push(
      "\n--- External Links ---",
      ...Array.from(extLinks).slice(0, MAX_LINKS)
    );
  if (images?.size)
    lines.push("\n--- Images ---", ...Array.from(images).slice(0, MAX_IMAGES));
  return lines.length ? "\n\n" + lines.join("\n") : "";
}

export async function scrapeWebsite(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = await page.evaluate(
      (baseUrl, UNWANTED, MAIN_SELECTORS) => {
        function normalize(u) {
          try {
            const urlObj = new URL(u);
            urlObj.hash = "";
            if (urlObj.pathname !== "/" && urlObj.pathname.endsWith("/")) {
              urlObj.pathname = urlObj.pathname.slice(0, -1);
            }
            return urlObj.href;
          } catch {
            return u;
          }
        }

        const baseHost = new URL(baseUrl).hostname;
        const emails = new Set();
        const extLinks = new Set();
        const intLinks = new Set();
        const images = new Set();

        // Extract links
        document.querySelectorAll("a[href]").forEach((a) => {
          const raw = a.getAttribute("href");
          if (!raw || raw.startsWith("#")) return;

          if (raw.startsWith("mailto:")) {
            emails.add(raw.slice(7));
            return;
          }

          try {
            const absolute = normalize(
              raw.startsWith("http") ? raw : new URL(raw, baseUrl).href
            );
            const host = new URL(absolute).hostname;
            (host === baseHost ? intLinks : extLinks).add(absolute);
          } catch {
            // ignore invalid URLs
          }
        });

        // Extract images
        document.querySelectorAll("img[src]").forEach((img) => {
          const raw = img.getAttribute("src");
          if (!raw) return;

          try {
            const absolute = normalize(
              raw.startsWith("http") ? raw : new URL(raw, baseUrl).href
            );
            const alt = img.getAttribute("alt");
            images.add(alt ? `${absolute} (${alt})` : absolute);
          } catch {
            // ignore invalid URLs
          }
        });

        // Extract emails from text
        const emailRegex =
          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
        const textEmails = document.body.innerText.match(emailRegex);
        if (textEmails) textEmails.forEach((e) => emails.add(e));

        // Remove unwanted elements
        UNWANTED.forEach((sel) =>
          document.querySelectorAll(sel).forEach((el) => el.remove())
        );

        // Extract main content
        let main = "";
        for (const sel of MAIN_SELECTORS) {
          const el = document.querySelector(sel);
          const txt = el?.innerText?.trim();
          if (txt && txt.length > main.length) main = txt;
        }

        if (main.length < 100) {
          const para = Array.from(document.querySelectorAll("p"))
            .map((p) => p.innerText?.trim() || "")
            .filter((text) => text.length > 0)
            .join(" ");
          if (para.length > main.length) main = para;
        }

        if (main.length < 50) main = document.body.innerText?.trim() || "";

        return {
          content: main,
          emails: Array.from(emails),
          extLinks: Array.from(extLinks),
          intLinks: Array.from(intLinks),
          images: Array.from(images),
        };
      },
      url,
      UNWANTED,
      MAIN_SELECTORS
    );

    const linkBlock = buildLinkBlock({
      emails: new Set(result.emails),
      extLinks: new Set(result.extLinks),
      intLinks: new Set(result.intLinks),
      images: new Set(result.images),
    });

    return (result.content + linkBlock).replace(/\s+/g, " ").trim();
  } finally {
    await browser.close();
  }
}
