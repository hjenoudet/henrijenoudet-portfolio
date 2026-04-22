# [henrijenoudet.com](https://henrijenoudet.com) — Engineering & Analytics Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-r183-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Read--Only-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

A high-performance, aesthetically driven personal portfolio and analytics hub. This project serves as a technical demonstration of modern web primitives, real-time spatial telemetry, and automated ETL pipelines.

## 🌌 Architectural Pillars

### 1. Autonomous Fleet Command (AG Digital Twin)
A real-time observability platform for agricultural zones.
- **Spatial Visualization:** Interactive 3D fleet monitoring powered by `react-three-fiber` and `drei`.
- **Edge Intelligence:** Integration of causal math and local VLM (Vision Language Model) diagnostics.
- **Live Telemetry:** Zero-latency updates via Supabase WebSockets for edge-to-cloud synchronization.

### 2. Protein Bars Tracker (Quantitative Macro Analysis)
A dedicated research tool for nutritional macro variance.
- **Automated ETL:** Programmatic fetching of raw vectors from the USDA database every 6 days.
- **Matrix Computation:** Calculates the ΔX matrix of nutritional variance across leading protein bars.
- **Server Components:** Utilizes React Server Components (RSC) for optimized data fetching and minimal client-side hydration.

### 3. Generative UI & Interaction
- **Galaxy Background:** A custom-built Three.js particle system providing a non-distracting, immersive backdrop.
- **Floating Glassmorphism:** Framer Motion-driven UI nodes with interactive physics and spring-based animations.
- **Tailwind 4 Engine:** Leveraging the latest CSS-in-JS performance and utility-first styling.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components)
- **Runtime:** [React 19](https://react.dev/) (Concurrent Rendering)
- **Graphics:** [Three.js](https://threejs.org/) via `@react-three/fiber`
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Backend:** [Supabase](https://supabase.com/) (PostgreSQL + Realtime)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 📜 Principles & Compliance

- **Zero-Mutation Mandate:** The frontend is strictly read-only, ensuring security and data integrity.
- **Open Source:** Everything in this repository is OSS-compliant and free to explore.
- **Data Attribution:** 
  - Biological imagery via **PlantVillage Dataset**.
  - Thermodynamic data via **Open-Meteo**.
  - Nutritional vectors via **USDA FoodData Central**.

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/hjenoudet/henrijenoudet-portfolio.git

# Install dependencies
npm install

# Run the development server
npm run dev
```

*Note: Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for full functionality.*

## 🤝 Connect

- **GitHub:** [@hjenoudet](https://github.com/hjenoudet)
- **LinkedIn:** [Henri Jenoudet](https://linkedin.com/in/hjenoudet)
- **Scholar:** [Google Scholar](https://scholar.google.com/citations?hl=en&user=yx-KdH0AAAAJ)
