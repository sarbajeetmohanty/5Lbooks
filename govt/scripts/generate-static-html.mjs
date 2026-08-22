import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const serverPath = path.resolve(rootDir, ".output/server/index.mjs");
const publicDir = path.resolve(rootDir, ".output/public");

const routes = [
  "/",
  "/privacy-policy",
  "/refund-policy",
  "/terms-and-conditions",
  "/contact"
];

async function generateStaticHtml() {
  console.log("Generating static HTML files for Hostinger public_html deployment...");

  try {
    const serverModule = await import(`file://${serverPath.replace(/\\/g, "/")}`);
    const handler = serverModule.default;

    if (!handler || typeof handler.fetch !== "function") {
      throw new Error("Server export does not contain a fetch handler.");
    }

    await fs.mkdir(publicDir, { recursive: true });

    for (const route of routes) {
      const request = new Request(`http://localhost${route}`);
      const env = {};
      const ctx = {
        waitUntil: () => {},
        passThroughOnException: () => {},
      };

      const response = await handler.fetch(request, env, ctx);
      if (response.ok || response.status === 200) {
        const html = await response.text();
        if (route === "/") {
          await fs.writeFile(path.resolve(publicDir, "index.html"), html, "utf-8");
          console.log("✓ Prerendered / -> index.html");
        } else {
          const routeDir = path.resolve(publicDir, route.replace(/^\//, ""));
          await fs.mkdir(routeDir, { recursive: true });
          await fs.writeFile(path.resolve(routeDir, "index.html"), html, "utf-8");
          await fs.writeFile(path.resolve(publicDir, `${route.replace(/^\//, "")}.html`), html, "utf-8");
          console.log(`✓ Prerendered ${route} -> ${route.replace(/^\//, "")}/index.html & .html`);
        }
      }
    }

    // Ensure optimized .htaccess is present
    const htaccess = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L,QSA]
</IfModule>
`;
    await fs.writeFile(path.resolve(publicDir, ".htaccess"), htaccess, "utf-8");
    await fs.writeFile(path.resolve(rootDir, "public/.htaccess"), htaccess, "utf-8");

    console.log("Successfully generated all static HTML pages and .output/public/.htaccess!");
  } catch (err) {
    console.error("Static generation error:", err);
  }
}

generateStaticHtml();
