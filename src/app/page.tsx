"use client";

import React, { useState } from "react";
import { Play, Activity, Server, Zap, Database } from "lucide-react";
import MolecularViewer from "@/components/MolecularViewer";
import PipelineOrchestrator from "@/components/PipelineOrchestrator";
import ResultsDashboard from "@/components/ResultsDashboard";
import WelcomeModal from "@/components/WelcomeModal";
import DiscoveryBrief from "@/components/DiscoveryBrief";
import { targets } from "@/data/mockDatasets";

export default function Home() {
  const [selectedTargetId, setSelectedTargetId] = useState<string>(targets[0].id);
  const [customPdbId, setCustomPdbId] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "running" | "completed">("idle");
  const [results, setResults] = useState<any>(null);
  const [activeTarget, setActiveTarget] = useState<any>(targets[0]);

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
    <div className="flex flex-col min-h-screen relative">
      <WelcomeModal />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md shadow-brand-teal/20">
              <Activity className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-100">NovaScreen</h1>
              <p className="text-[11px] tracking-wide text-brand-teal">Serverless AI Drug Discovery</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-[10px] font-medium text-slate-300">Next.js 15</span>
              <span className="rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-[10px] font-medium text-slate-300">React 19</span>
              <span className="rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-[10px] font-medium text-slate-300">Vercel Edge</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5">
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
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 space-y-8">
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">AI-Powered Screening</h2>
          <p className="mt-3 text-sm text-slate-400">
            Simulate drug-protein binding dynamically. Screen novel compounds against validated targets natively in the browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Orchestrator & Controls */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <div className="glass-panel p-6">
              <label className="block text-sm font-semibold text-slate-200 mb-1">Target Protein</label>
              <p className="text-xs text-slate-400 mb-4">Select from curated database or provide custom PDB</p>
              
              <select 
                value={selectedTargetId}
                onChange={(e) => setSelectedTargetId(e.target.value)}
                disabled={status === "running"}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-200 transition-colors focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal disabled:opacity-50 mb-3"
              >
                {targets.map((t) => (
                  <option key={t.id} value={t.id}>🧬 {t.name} ({t.pdbId})</option>
                ))}
                <option value="custom">🔍 -- Custom Target (PDB ID) --</option>
              </select>
              
              {selectedTargetId === "custom" && (
                <div className="mb-4">
                  <input 
                    type="text"
                    placeholder="e.g. 1CRN"
                    value={customPdbId}
                    onChange={(e) => setCustomPdbId(e.target.value)}
                    disabled={status === "running"}
                    maxLength={4}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-200 uppercase transition-colors focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal disabled:opacity-50"
                  />
                  <p className="text-[10px] text-slate-500 mt-1 ml-1">Must be a valid 4-character RCSB PDB ID.</p>
                </div>
              )}

              {/* Contextual Stats Pills */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-lg bg-slate-800/40 border border-slate-700/50 px-3 py-1.5">
                  <Database className="w-3 h-3 text-brand-teal" />
                  <span className="text-xs text-slate-300">10+ Compounds</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-slate-800/40 border border-slate-700/50 px-3 py-1.5">
                  <Server className="w-3 h-3 text-brand-indigo" />
                  <span className="text-xs text-slate-300">Vercel Edge</span>
                </div>
              </div>

              <button
                onClick={handleRunScreening}
                disabled={status === "running" || (selectedTargetId === "custom" && customPdbId.trim().length < 4)}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-teal to-brand-indigo px-6 py-3.5 font-semibold text-slate-950 shadow-md shadow-brand-teal/20 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-brand-teal/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center"
              >
                {status === "running" ? (
                  <Zap className="w-4 h-4 mr-2 animate-pulse" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {status === "running" ? "Running Pipeline..." : "Run Discovery Pipeline"}
              </button>
            </div>

            <PipelineOrchestrator status={status} />
          </div>

          {/* Right Column - 3D Viewer & Results */}
          <div className="lg:col-span-3 space-y-6 flex flex-col">
            <div className="glass-panel p-1 border border-slate-700 overflow-hidden relative">
              <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-700 rounded-lg px-3 py-2 pointer-events-none">
                <h3 className="text-sm font-semibold text-slate-100">
                  {status === "completed" ? activeTarget?.name : (selectedTargetId === "custom" ? `Custom Target (${customPdbId.toUpperCase() || "..."})` : targets.find(t => t.id === selectedTargetId)?.name)}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Interactive 3D Structure</p>
              </div>
              <MolecularViewer pdbId={displayTargetId || null} />
            </div>
            
            <ResultsDashboard results={results} />
            
            {status === "completed" && (
              <DiscoveryBrief target={activeTarget} results={results} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 tracking-wide">
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

