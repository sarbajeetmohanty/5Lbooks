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

    // Also write .htaccess for Apache / LiteSpeed (Hostinger default)
    const htaccess = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
`;
    await fs.writeFile(path.resolve(publicDir, ".htaccess"), htaccess, "utf-8");
    console.log("Successfully generated .output/public/index.html and .output/public/.htaccess!");
  } finally {
    server.kill();
  }
}

generateStaticHtml().catch((err) => {
  console.error("Static generation warning:", err);
});
