"use client";

import React, { useState } from "react";
import { Play, Activity, Server, Zap, Database, Library } from "lucide-react";
import { motion } from "framer-motion";
import MolecularViewer from "@/components/MolecularViewer";
import PipelineOrchestrator from "@/components/PipelineOrchestrator";
import ResultsDashboard from "@/components/ResultsDashboard";
import AnalyticsChart from "@/components/AnalyticsChart";
import BindingRankings from "@/components/BindingRankings";
import WelcomeModal from "@/components/WelcomeModal";
import DiscoveryBrief from "@/components/DiscoveryBrief";
import ResearchCopilot from "@/components/ResearchCopilot";
import { targets } from "@/data/mockDatasets";

export default function Home() {
  const [selectedTargetId, setSelectedTargetId] = useState<string>(targets[0].id);
  const [customPdbId, setCustomPdbId] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "running" | "completed">("idle");
  const [results, setResults] = useState<any>(null);
  const [activeTarget, setActiveTarget] = useState<any>(targets[0]);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  const handleRunScreening = async () => {
    if (selectedTargetId === "custom" && !customPdbId.trim()) return;

    setStatus("running");
    setResults(null);
    
    try {
      const response = await fetch("/api/screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          targetId: selectedTargetId,
          customPdbId: selectedTargetId === "custom" ? customPdbId.trim().toLowerCase() : undefined
        }),
      });
      
      const data = await response.json();
      
      if (data.status === "completed") {
        setActiveTarget(data.target);
        setResults(data.results);
        setStatus("completed");
      } else {
        throw new Error(data.error || "Failed to screen");
      }
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  const displayTargetId = status === "completed" ? activeTarget?.pdbId : 
    (selectedTargetId === "custom" ? customPdbId.trim().toLowerCase() : targets.find(t => t.id === selectedTargetId)?.pdbId);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-zinc-950">
      {/* Ambient glowing orbs - optimized for scroll performance */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(244,63,94,0.15)_0%,transparent_60%)] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none -z-10" />

      <WelcomeModal 
        selectedTargetId={selectedTargetId} 
        onSelectTarget={setSelectedTargetId} 
        onRun={handleRunScreening}
      />

      <ResearchCopilot
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        targetId={selectedTargetId}
        customPdbId={customPdbId}
      />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-md shadow-brand-primary/20">
              <Activity className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-zinc-100">NovaScreen</h1>
              <p className="text-[11px] tracking-wide text-brand-primary">Serverless AI Drug Discovery</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-[11px] font-bold text-indigo-400 hover:bg-indigo-500/20 transition-colors shadow-sm shadow-indigo-500/10"
            >
              <Library className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Research Copilot</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="rounded-md border border-zinc-700 bg-zinc-800/50 px-2.5 py-1 text-[10px] font-medium text-zinc-300">Next.js 15</span>
              <span className="rounded-md border border-zinc-700 bg-zinc-800/50 px-2.5 py-1 text-[10px] font-medium text-zinc-300">React 19</span>
              <span className="rounded-md border border-zinc-700 bg-zinc-800/50 px-2.5 py-1 text-[10px] font-medium text-zinc-300">Vercel Edge</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1.5">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-emerald-400">READY</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 space-y-8 relative z-10">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">AI-Powered Screening</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Simulate drug-protein binding dynamically. Screen novel compounds against validated targets natively in the browser.
          </p>
        </motion.div>

        <div className="flex flex-col space-y-8 max-w-5xl mx-auto w-full">
          {/* Step 1: Configuration */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-zinc-200 mb-1">Target Protein</label>
                <p className="text-xs text-zinc-400 mb-4">Select from curated database or provide custom PDB</p>
                
                <select 
                  value={selectedTargetId}
                  onChange={(e) => setSelectedTargetId(e.target.value)}
                  disabled={status === "running"}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:opacity-50 mb-3 md:mb-0"
                >
                  {targets.map((t) => (
                    <option key={t.id} value={t.id}>🧬 {t.name} ({t.pdbId})</option>
                  ))}
                  <option value="custom">🔍 -- Custom Target (PDB ID) --</option>
                </select>
                
                {selectedTargetId === "custom" && (
                  <div className="mt-3">
                    <input 
                      type="text"
                      placeholder="e.g. 1CRN"
                      value={customPdbId}
                      onChange={(e) => setCustomPdbId(e.target.value)}
                      disabled={status === "running"}
                      maxLength={4}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 uppercase transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:opacity-50"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1 ml-1">Must be a valid 4-character RCSB PDB ID.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 min-w-[240px]">
                {/* Contextual Stats Pills */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-zinc-800/40 border border-zinc-700/50 px-3 py-1.5 flex-1 justify-center">
                    <Database className="w-3 h-3 text-brand-primary" />
                    <span className="text-xs text-zinc-300">10+ Compounds</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-zinc-800/40 border border-zinc-700/50 px-3 py-1.5 flex-1 justify-center">
                    <Server className="w-3 h-3 text-brand-secondary" />
                    <span className="text-xs text-zinc-300">Vercel Edge</span>
                  </div>
                </div>

                <button
                  onClick={handleRunScreening}
                  disabled={status === "running" || (selectedTargetId === "custom" && customPdbId.trim().length < 4)}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-3.5 font-semibold text-zinc-950 shadow-md shadow-brand-primary/20 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-brand-primary/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center"
                >
                  {status === "running" ? (
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {status === "running" ? "Running Pipeline..." : "Run Discovery Pipeline"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Step 2: 3D Visualization */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel p-1 border border-zinc-700 overflow-hidden relative"
          >
            <div className="absolute top-4 left-4 z-10 bg-zinc-950/80 backdrop-blur-md border border-zinc-700 rounded-lg px-3 py-2 pointer-events-none">
              <h3 className="text-sm font-semibold text-zinc-100">
                {status === "completed" ? activeTarget?.name : (selectedTargetId === "custom" ? `Custom Target (${customPdbId.toUpperCase() || "..."})` : targets.find(t => t.id === selectedTargetId)?.name)}
              </h3>
              <p className="text-[10px] text-zinc-400 mt-0.5">Interactive 3D Structure</p>
            </div>
            <MolecularViewer pdbId={displayTargetId || null} />
          </motion.div>

          {/* Step 3: Pipeline Status */}
          <PipelineOrchestrator status={status} />

          {/* Step 4: Results Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ResultsDashboard results={results} target={activeTarget} />
          </motion.div>

          {/* Step 5: Advanced Analytics & Insights */}
          {status === "completed" && (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnalyticsChart results={results} />
                <DiscoveryBrief target={activeTarget} results={results} />
              </div>
              <BindingRankings results={results} target={activeTarget} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-zinc-500 tracking-wide">
          <p>© 2026 NovaScreen Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Vercel</span>
            <span>·</span>
            <span>Next.js 15 App Router</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

