import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") {
    errors.push(msg.text());
  }
});
page.on("pageerror", (err) => {
  errors.push(err.message);
});

try {
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  const mapContainer = page.locator("canvas");
  const count = await mapContainer.count();
  const screenshot = await page.screenshot({ fullPage: true });

  await page.evaluate(() => {
    return document.querySelector("canvas")?.getBoundingClientRect();
  }).then((rect) => {
    console.log("canvas rect:", JSON.stringify(rect));
  });

  console.log("canvas count:", count);
  console.log("errors:", JSON.stringify(errors));
  console.log("screenshot saved to tmp/screenshot.png");
  require("fs").writeFileSync("tmp/screenshot.png", screenshot);
} finally {
  await browser.close();
}
