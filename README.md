<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/activity.svg" width="80" height="80" alt="NovaScreen Logo">
  <h1 align="center">NovaScreen</h1>
  <p align="center">
    <strong>A next-generation, AI-driven drug discovery and molecular simulation platform.</strong>
  </p>
  <p align="center">
    <a href="https://nova-screen.vercel.app"><strong>🔴 Live Demo: nova-screen.vercel.app</strong></a>
  </p>
</div>

---

## 🧬 Overview

**NovaScreen** is a high-fidelity web application inspired by real-world AI drug discovery workflows. It provides a stunning, interactive interface to visualize complex molecular structures, simulate target binding, and analyze compound toxicity.

Built to be exceptionally fast and perfectly suited for serverless deployment on Vercel, NovaScreen utilizes a "mock simulation" engine powered by precomputed scientific datasets—allowing you to showcase advanced computational biology concepts with zero backend compute costs.

---

## ✨ Key Features

- **Interactive 3D Protein Visualization**: Leverages `3dmol.js` to render dynamic, color-coded ribbon structures directly in the browser by fetching data natively from the RCSB Protein Data Bank.
- **Animated AI Pipeline**: A stunning `framer-motion` orchestrated 5-step pipeline that visually simulates molecular docking, binding dynamics, and affinity scoring in real-time.
- **Glassmorphism Design System**: A premium, dark-mode aesthetic utilizing tailored slate, teal, and indigo gradients, built with Tailwind CSS v4.
- **Serverless Architecture**: 100% Next.js Monolithic repository. The "backend" (API routes) securely serve local datasets, completely removing the need for a separate Python/Flask stack.

---

## 🏗️ Architecture

```
Next.js Frontend (3Dmol.js protein viewer)
        |
FastAPI Backend (port 8080)
        |
LangGraph Pipeline (5 sequential agents)
  |-- Target Identifier (Qwen 2.5-7B via vLLM)
  |-- Molecular Dynamics (AutoDock Vina + OpenMM on MI300X)
  |-- Binding Scorer (Qwen 2.5-7B via vLLM)
  |-- Toxicity Screener (RDKit)
  |-- Discovery Reporter (Qwen 2.5-7B via vLLM)
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| GPU | AMD Instinct MI300X (192GB HBM3) via AMD Developer Cloud |
| Molecular Docking | AutoDock Vina 1.2.x, Meeko, Open Babel |
| Physics Simulation | OpenMM 8.x, AMBER14 force field, OpenCL backend |
| Protein Prep | pdb2pqr, propka |

---

## 🎯 Disease Targets

| Target | PDB | Compounds | Reference Drug | Top Hit (Vina) |
|--------|-----|-----------|---------------|----------------|
| COVID-19 Main Protease | 6LU7 | 20 | Nirmatrelvir (Paxlovid) | Shikonin (-6.79 kcal/mol) |
| KRAS G12C Lung Cancer | 6OIM | 15 | Sotorasib (Lumakras) | SML-8-73-1 (-8.59 kcal/mol) |
| EGFR Kinase Lung Cancer | 1M17 | 12 | Erlotinib (Tarceva) | WZ4002 (-8.82 kcal/mol) |
| HIV-1 Protease | 1HIV | 10 | Saquinavir | Saquinavir (-6.26 kcal/mol) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anushkagupta200615-jpg/NovaScreen.git
   cd NovaScreen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to the local development server URL provided in your terminal, or visit the live deployment at [https://nova-screen.vercel.app](https://nova-screen.vercel.app).

---

## 🌐 Deployment

NovaScreen is optimized for **Vercel**. Since both the frontend and the mock backend API are bundled within the Next.js framework, deployment is instantaneous:

1. Push your code to GitHub.
2. Import the repository into your Vercel dashboard.
3. Deploy! No environment variables or external databases are required.

---

<div align="center">
  <i>Built with ❤️ for the future of computational biology.</i>
</div>
