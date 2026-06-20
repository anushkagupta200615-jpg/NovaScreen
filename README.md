<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/activity.svg" width="80" height="80" alt="NovaScreen Logo">
  <h1 align="center">NovaScreen</h1>
  <p align="center">
    <strong>A next-generation, AI-driven drug discovery and molecular simulation platform.</strong>
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

NovaScreen employs a unified frontend and backend utilizing the **Next.js 15 App Router**. 

### 1. The Presentation Layer (Frontend)
- **Framework**: React 19 / Next.js 15
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism CSS variables
- **Animation**: `framer-motion` for complex state transitions
- **Components**:
  - `MolecularViewer`: Client-side rendered 3D canvas (WebGL).
  - `PipelineOrchestrator`: Reactive state machine visualizing the AI screening process.
  - `ResultsDashboard`: Data presentation layer for binding affinities and Lipinski's checks.

### 2. The Data & Logic Layer (Backend/API)
- **API Routes**: Located at `/api/screen/route.ts`. Handles incoming screening requests, introduces artificial computational delays (to simulate heavy ML workloads), and returns sorted results.
- **Mock Database**: `mockDatasets.ts` serves as our offline, serverless-friendly database containing compound strings (SMILES), target descriptions, and pre-calculated affinity scores.

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
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

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
