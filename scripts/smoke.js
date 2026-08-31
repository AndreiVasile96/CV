/* eslint-disable no-console */
/**
 * Post-build smoke test.
 *
 * Jest runs in jsdom, which has no layout engine. That blind spot is not
 * theoretical here: navigation once shipped completely broken because this
 * page scrolls `document.body` rather than the document, and `window.scrollTo`
 * silently does nothing - something no jsdom test can observe.
 *
 * So this serves the real production build and drives it in a real browser:
 * every scroll control must actually move the page, and the printed CV must
 * still render. Runs in CI between `build` and `deploy`.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BUILD = path.join(__dirname, "..", "build");
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain"
};

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split("?")[0]);
      let file = path.join(BUILD, url);
      if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        file = path.join(BUILD, "index.html"); // SPA fallback, as Firebase does
      }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, () => resolve({ server, port: server.address().port }));
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  if (!fs.existsSync(path.join(BUILD, "index.html"))) {
    throw new Error("build/index.html not found - run `npm run build` first");
  }

  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}`;
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"] // required on CI runners
  });

  const failures = [];
  const check = (name, ok, detail) => {
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
    if (!ok) failures.push(name);
  };

  try {
    for (const [width, height, label] of [[1440, 900, "desktop"], [390, 844, "mobile"]]) {
      const page = await browser.newPage();
      await page.setViewport({ width, height });

      const consoleErrors = [];
      page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160)); });
      page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message.slice(0, 160)}`));

      await page.goto(base, { waitUntil: "networkidle0" });
      await sleep(1200);

      console.log(`\n[${label} ${width}x${height}]`);

      const sections = await page.evaluate(() => ["landingPage", "about", "skills", "experience", "contact"]
        .filter((id) => !document.querySelector(`#${id}`)));
      check("all sections present", sections.length === 0, sections.length ? `missing: ${sections.join(", ")}` : "");

      // The regression this file exists to catch.
      const controls = label === "desktop"
        ? [['button ::-p-text("About me")', "nav About me"],
          ['button ::-p-text("Skills")', "nav Skills"],
          ['button ::-p-text("Experience")', "nav Experience"],
          ['button ::-p-text("Contact me")', "nav Contact me"],
          [".landingPage--scroll-btn", "hero scroll indicator"]]
        : [[".landingPage--scroll-btn", "hero scroll indicator"]];

      for (const [selector, name] of controls) {
        await page.evaluate(() => { document.body.scrollTop = 0; });
        await sleep(350);
        const el = await page.$(selector);
        if (!el) { check(`${name} scrolls`, false, "control not found"); continue; }
        await el.click();
        await sleep(1400);
        const after = await page.evaluate(() => document.body.scrollTop);
        check(`${name} scrolls`, after > 50, `body.scrollTop -> ${Math.round(after)}`);
      }

      const wide = await page.evaluate(() => document.body.scrollWidth > window.innerWidth + 1);
      check("no horizontal overflow", !wide);

      // The hero must be at full opacity before anything is scrolled. It has
      // shipped dimmed twice: once because a view() timeline's exit range is
      // already complete when the subject is shorter than the viewport, and
      // once because the CSS minifier reordered the `animation` shorthand after
      // `animation-timeline`, which resets it. Neither was visible on the dev
      // server, so this check has to run against the built output.
      await page.evaluate(() => { document.body.scrollTop = 0; });
      await sleep(700);
      const heroAtRest = await page.evaluate(() => {
        const hero = document.querySelector("#landingPage");
        return hero ? Number(getComputedStyle(hero).opacity) : 0;
      });
      check("hero is fully visible at rest", heroAtRest > 0.95, `opacity ${heroAtRest}`);

      await page.emulateMediaType("print");
      await sleep(400);
      const print = await page.evaluate(() => {
        const cv = document.querySelector(".print-cv");
        const app = document.querySelector(".appBody");
        return {
          cvShown: cv && getComputedStyle(cv).display !== "none",
          appHidden: app && getComputedStyle(app).display === "none",
          roles: document.querySelectorAll(".print-cv--role").length,
          hasEmail: (cv ? cv.innerText : "").includes("@")
        };
      });
      check("printed CV renders", print.cvShown && print.appHidden && print.roles > 0 && print.hasEmail,
        `roles: ${print.roles}, email: ${print.hasEmail}`);

      check("no console errors", consoleErrors.length === 0, consoleErrors.join(" | "));
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log("");
  if (failures.length) {
    console.error(`Smoke test FAILED: ${failures.length} check(s) - ${failures.join(", ")}`);
    process.exit(1);
  }
  console.log("Smoke test passed.");
}

run().catch((err) => {
  console.error("Smoke test errored:", err.message);
  process.exit(1);
});
