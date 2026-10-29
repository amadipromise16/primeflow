# Black Plumbing Heating & Air — Full-Stack Web Application

A full-stack website recreation of **Black Plumbing Heating & Air** (`blackplumbing.com`), engineered with modern UI/UX design, responsive sticky navigation, intelligent background color schemes, and full-stack backend capabilities.

---

## 🌟 Key Recreations & Enhancements

### 1. Recreated Website Structure & Identity
- **Exact Brand Copy & Values**: "Restoring Plumbing, HVAC & Peace of Mind For Over 30 Years", "Licensed experts. Quality work. No shortcuts.", "One Trip Stops The Drip."
- **Official Licensing**: Texas Master Plumber `License #M-40900` & Texas HVAC Class A `License #TACLA145786C`.
- **24/7 Central Hotline**: `(325) 231-4695`.
- **All 7 Physical Branch Offices**:
  1. **Abilene (Corporate HQ)**: 4402 S Danville Dr, Abilene, TX 79605 | (325) 231-4695
  2. **Big Spring**: 1105 E 3rd St, Big Spring, TX 79720 | (432) 935-1117
  3. **Brownwood**: 703 Austin Ave, Brownwood, TX 76801 | (325) 643-5215
  4. **Cleburne**: 1408 N. Main St, Cleburne, TX 76033 | (682) 244-2866
  5. **Kerrville**: 2610 Memorial Blvd, Kerrville, TX 78028 | (830) 240-1708
  6. **Lubbock**: 8215 Avenue D, Lubbock, TX 79423 | (806) 787-2200
  7. **San Angelo**: 501 N Main St, San Angelo, TX 76903 | (325) 659-3747

### 2. Intelligent Modern Color Palette
*Per user directive: "change all the back groung colors just make sure about change all the colors and make other pages look inteligent"*
- **Replaced Murky Camo/Tree-Bark Background**: The original site used an aggressive camouflage tree pattern that cluttered text readability.
- **Architectural Midnight Obsidian Palette**:
  - Primary Dark: `#0A0E17` (Deep Obsidian) with subtle radial mesh glows.
  - Card Surfaces: `#111827` and `#1E293B` with frosted glassmorphism (`backdrop-filter: blur(16px)`).
  - Precision Crimson Red: `#E11D48` (Signature brand accent).
  - Crystalline Ice Blue: `#0EA5E9` (Clean water and HVAC cooling).
  - Amber Gold: `#F59E0B` (Certifications, BBB A+, and ratings).
- **Studio Clean Mode Toggle**: Built-in 1-click theme switcher in the header allowing users to toggle between Midnight Obsidian and Crisp Studio White.

### 3. Sticky Navigation & Mobile Drawer
- Navigation bar sticks to the top with `position: sticky; top: 0;` and subtle elevation on scroll.
- Mobile Hamburger Menu opens a smooth animated slide-out drawer matching the reference video (00:36-00:39), complete with accordion submenus, click-to-call button, and state license tags.
- Sticky Mobile Bottom Call Bar provides immediate 1-tap emergency calling on smartphones.

---

## 📱 11 Intelligent Multi-Page Architecture

1. **`index.html` (Homepage)**:
   - Full hero with live 24/7 status indicator, ratings bar (Google 4.8, FB 4.2, Angi 4.1, BBB A+), signature "ONE TRIP STOPS THE DRIP" pill, 9-card service grid, interactive Texas coverage map with 12 cities, customer reviews carousel, live financing payment calculator, trust seals, fleet illustration, and 7 office cards.
2. **`about.html` (About Us)**:
   - Recreates the exact about page shown in the reference video (00:23 - 00:30): "Licensed Plumbing & HVAC Experts", "We Are Family-Owned Since 1994", "Skilled & Experienced Plumbers across 6+ offices", 30-year interactive timeline (1994 to 2026), and team fleet photo.
3. **`water-heaters.html` (Water Heater Center)**:
   - Recreates the exact water heater page from the video (01:12 - 01:18):
     - Scientific breakdown of Abilene's hard water (240 mg/L calcium carbonate / 14 grains per gallon).
     - Customer quotes from Richard M. (attic replacement with 4 techs) and Larry B. (replaced same-day by 4:30 PM).
     - Interactive Water Heater Diagnostic Symptom Checker Widget.
     - Tank vs. Tankless comparison guide.
4. **`plumbing.html` (Comprehensive Plumbing Hub)**:
   - Drain cleaning & hydro-jetting, electronic slab leak detection, sewer camera inspection, gas line testing, and whole-home repiping.
5. **`hvac.html` (Heating & Air Conditioning)**:
   - Recreates the residential services and emergency repairs sections from the video (00:43), AC repair, high-efficiency furnaces, ductless mini-splits, indoor air quality, and an interactive SEER2 Energy Savings Calculator.
6. **`commercial.html` (Commercial Solutions)**:
   - Rooftop packaged units (RTUs), grease traps, industrial hydro-jetting, and commercial preventative maintenance agreements with priority SLA dispatch.
7. **`locations.html` (Service Locations Directory)**:
   - Dedicated coverage directory featuring the interactive Texas service map, 12 regional cities, and comprehensive branch office addresses with local direct telephone lines.
8. **`financing.html` (Financing Solutions)**:
   - Dedicated financing portal with live monthly loan calculator, 0% APR 18-month promotional breakdown, and instant paperless pre-qualification application simulator.
9. **`schedule.html` (Smart Booking Wizard)**:
   - Step-by-step service scheduling wizard: select category -> preferred date and arrival window -> service address -> generates confirmed booking ID (`BP-TX-XXXXXX`).
10. **`reviews.html` (Customer Reviews Wall)**:
    - Verified reviews from Google, Angi, Facebook, and BBB, star filtering, and an interactive review submission form.
11. **`contact.html` (Contact & Central Dispatch)**:
    - 24/7 emergency dispatch hotline, corporate HQ contact details, branch directory, and general inquiries callback form.

---

## ⚡ Dual Full-Stack Backend Architecture with SQLite

The application features a shared production-grade **SQLite database (`black_plumbing.db`)** that can be run interchangeably with either **Python Flask** or **Node.js**:

### 🗄️ SQLite Database Schema (`black_plumbing.db` & `schema.sql`)
1. **`bookings`**: Stores customer appointments, technician assignments (`Master Tech #4`), scheduled time windows, and booking reference IDs.
2. **`emergencies`**: 24/7 priority emergency dispatch queue with real-time ETA calculation and assigned trucks.
3. **`contact_messages`**: General callback requests, commercial quote inquiries, and dispatch tickets.
4. **`financing_applications`**: Instant paperless pre-qualification applications with calculated credit limits.
5. **`reviews`**: Customer testimonials with star ratings, source badges (Google, Angi, Facebook), and verification flags.
6. **`locations`**: Physical branch directories, live fleet counts, and direct telephone lines for all 7 regional offices.

---

## 🚀 How to Run the Website Locally

### Option A: Python Flask + SQLite
1. Install Python requirements:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the Flask application:
   ```bash
   python app.py
   # Or double-click run_flask.bat on Windows
   ```
3. Open your browser at:
   `http://localhost:5000`

### Option B: Node.js + SQLite
1. Start the server (zero external dependencies required):
   ```bash
   npm start
   # Or run node server.js / double-click run_node.bat
   ```
2. Open your browser at:
   `http://localhost:3000`

---

## 🌐 Hosting on GitHub (GitHub Pages)

This project has been structured and optimized for hosting on **GitHub Pages**:
- Direct static file resolution at repository root with `.nojekyll`.
- Relative asset paths (`css/`, `js/`, `assets/`) compatible with any repository name or custom domain.
- Automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.
- Graceful client-side fallback engines for calculators, diagnostics, and scheduling wizards when running on static hosting.

### Quick Setup:
1. **Initialize Git and Commit**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Black Plumbing Heating & Air modern full-stack website"
   git branch -M main
   ```

2. **Link to your GitHub Repository**:
   Create a new empty repository on [GitHub](https://github.com/new) (e.g., `black-plumbing` or `primeflow`), then run:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch` (or choose `GitHub Actions`).
     - **Branch**: Select `main` / `/ (root)`.
     - Click **Save**.
   - Your website will be live in seconds at:
     `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`

```
http://localhost:3000
```

---

## 🌐 Deployment Options

1. **Node.js Host (Vercel, Render, Railway, Heroku)**:
   - Connect your Git repository; the build command is `npm start`.
2. **Docker Deployment**:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY . .
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```
3. **Static Web Server (Nginx, Netlify, Cloudflare Pages, S3)**:
   - The contents of `public/` can also be served directly as a high-performance static website, with API endpoints proxied to the Node.js backend.

#   p r i m e f l o w  
 