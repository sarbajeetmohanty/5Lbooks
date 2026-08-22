import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const serverPath = path.resolve(rootDir, ".output/server/index.mjs");
const publicDir = path.resolve(rootDir, ".output/public");

async function generateStaticHtml() {
  console.log("Generating static index.html for Hostinger public_html deployment...");

  const port = 38912;
  const server = spawn("node", [serverPath], {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  try {
    // Wait for server to start
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await fetch(`http://127.0.0.1:${port}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch SSR route: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    await fs.mkdir(publicDir, { recursive: true });
    await fs.writeFile(path.resolve(publicDir, "index.html"), html, "utf-8");

    // Copy optimized .htaccess from public directory
    const sourceHtaccess = path.resolve(rootDir, "public/.htaccess");
    try {
      const htaccess = await fs.readFile(sourceHtaccess, "utf-8");
      await fs.writeFile(path.resolve(publicDir, ".htaccess"), htaccess, "utf-8");
    } catch {
      // Fallback rewrite rule
      const htaccess = `<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteBase /\n  RewriteRule ^index\\.html$ - [L]\n  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteRule . /index.html [L,QSA]\n</IfModule>\n`;
      await fs.writeFile(path.resolve(publicDir, ".htaccess"), htaccess, "utf-8");
    }
    console.log("Successfully generated .output/public/index.html and .output/public/.htaccess!");
  } finally {
    server.kill();
  }
}

generateStaticHtml().catch((err) => {
  console.error("Static generation warning:", err);
});
