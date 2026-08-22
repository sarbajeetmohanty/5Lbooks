# Simpex Media Library — 5,00,000+ Premium eBooks Landing Page

High-converting sales funnel and landing page for the Simpex Media Mega eBook Bundle.

## 🚀 Quick Start Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Visit `http://localhost:8080/` in your browser.

---

## 🏗️ Production Build

```bash
npm run build
```

The build outputs:
- **Client static assets**: `.output/public`
- **SSR Server bundle**: `.output/server`

---

## 🌐 Deploying to Hostinger

### Option A: Static Deployment (Shared Hosting / `public_html`)
1. Run `npm run build` locally.
2. Go to Hostinger File Manager -> `public_html`.
3. Upload all contents from the `.output/public` folder into your `public_html` directory.
4. Ensure `.htaccess` is present for SPA routing.

### Option B: Node.js App Deployment (Hostinger VPS / Node.js Hosting)
1. Clone this repository on your Hostinger server:
   ```bash
   git clone https://github.com/sarbajeetmohanty/5Lbooks.git
   cd 5Lbooks
   npm install
   npm run build
   ```
2. Start the production server with PM2 or Node:
   ```bash
   pm2 start .output/server/index.mjs --name "5Lbooks"
   ```

---

## 🛠️ Tech Stack
- **Framework**: TanStack Start + React 19
- **Bundler**: Vite 8 + Nitro
- **Styling**: Tailwind CSS v4 + OKLCH colors + Radix UI Primitives
- **Icons**: Lucide React

