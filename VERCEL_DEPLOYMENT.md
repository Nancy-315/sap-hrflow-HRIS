# Vercel Deployment & SPA Routing Guide — SAP HRFlow

This document provides step-by-step instructions to test, build, push to GitHub, and deploy **SAP HRFlow** to Vercel with zero routing or refresh errors.

---

## Step 1 — Local Verification & Build

Before pushing to production, verify that the project builds cleanly without errors:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Test local development:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` and verify the login screen, HR Admin dashboard, Personnel Administration table, and SAP Simulator.

3. **Execute Production Build:**
   ```bash
   npm run build
   ```
   Ensure:
   - **ZERO** TypeScript errors
   - **ZERO** bundling errors
   - Successful output in the `dist/` directory.

---

## Step 2 — Push to GitHub

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: complete SAP HRFlow enterprise HRIS simulation"
   ```

2. Verify that `.gitignore` excludes:
   - `node_modules/`
   - `dist/`
   - `.env` and `.env.local`
   - Temporary log files

3. Create a GitHub repository named:
   ```
   sap-hrflow-hris
   ```

4. Push to main:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/sap-hrflow-hris.git
   git push -u origin main
   ```

---

## Step 3 — Deploy on Vercel

1. Log into your [Vercel Dashboard](https://vercel.com/) using your GitHub account.
2. Click **"Add New Project"** and select **"Import"** next to `sap-hrflow-hris`.
3. Configure Project Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **"Deploy"**.

---

## Step 4 — Single-Page Application (SPA) Routing Configuration

Because **SAP HRFlow** is a client-side Single-Page Application powered by React Router, refreshing the page on deep routes like:
- `/dashboard`
- `/personnel-administration`
- `/organizational-management`
- `/personnel-actions`
- `/time-management`
- `/sap-simulator`
- `/sap-concepts`

would normally return a `404 Not Found` if the server is not instructed to serve `index.html`.

This is solved by the included `vercel.json` file in the root of the project:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Vercel automatically detects this configuration, ensuring that **all deep links and browser refreshes work flawlessly**.

---

## Step 5 — Post-Deployment Verification Checklist

After the deployment finishes, verify the live deployment against these items:
- [ ] Sign in with HR Admin credentials (`admin@hrflow.demo` / `HRFlow@123`)
- [ ] Sign in with Employee credentials (`employee@hrflow.demo` / `Employee@123`)
- [ ] Test browser refresh on `/personnel-administration` (no 404)
- [ ] Create a new employee record and verify it persists after reload
- [ ] Run the Hiring and Transfer simulators in `/sap-simulator`
- [ ] Submit a leave application from `/employee` and approve it from `/leave`
- [ ] Verify responsive layout on mobile viewport
- [ ] Test the "Reset Demo Data" option under `/settings`.
