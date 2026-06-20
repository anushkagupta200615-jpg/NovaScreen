"use client";

import React, { useState } from "react";
import { Play, Activity } from "lucide-react";
import MolecularViewer from "@/components/MolecularViewer";
import PipelineOrchestrator from "@/components/PipelineOrchestrator";
import ResultsDashboard from "@/components/ResultsDashboard";
import { targets } from "@/data/mockDatasets";

export default function Home() {
  const [selectedTargetId, setSelectedTargetId] = useState<string>(targets[0].id);
  const [status, setStatus] = useState<"idle" | "running" | "completed">("idle");
  const [results, setResults] = useState<any>(null);

  const selectedTarget = targets.find((t) => t.id === selectedTargetId);

  const handleRunScreening = async () => {
    setStatus("running");
    setResults(null);
    
    try {
      const response = await fetch("/api/screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: selectedTargetId }),
      });
      
      const data = await response.json();
      
      if (data.status === "completed") {
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

  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-16 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white flex items-center">
            <Activity className="w-10 h-10 mr-3 text-brand-teal" />
            Nova<span className="text-gradient">Screen</span>
          </h1>
          <p className="mt-2 text-slate-400 max-w-xl">
            AI-powered drug discovery platform. Select a target protein to simulate molecular docking, binding dynamics, and toxicity screening.
          </p>
        </div>
        
        <div className="glass-panel p-2 flex items-center space-x-4">
          <select 
            value={selectedTargetId}
            onChange={(e) => setSelectedTargetId(e.target.value)}
            disabled={status === "running"}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-brand-teal focus:border-brand-teal block w-full p-2.5 outline-none disabled:opacity-50"
          >
            {targets.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <button
            onClick={handleRunScreening}
            disabled={status === "running"}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-brand-teal to-brand-indigo text-slate-950 font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "running" ? (
              <Activity className="w-4 h-4 mr-2 animate-pulse" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {status === "running" ? "Running..." : "Run"}
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        {/* Left Column - 3D Viewer & Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-slate-100">{selectedTarget?.name}</h2>
              <p className="text-slate-400 mt-1">{selectedTarget?.description}</p>
            </div>
            <MolecularViewer pdbId={selectedTarget?.pdbId || null} />
          </div>
          
          <ResultsDashboard results={results} />
        </div>

        {/* Right Column - Orchestrator */}
        <div className="space-y-6">
          <PipelineOrchestrator status={status} />
        </div>
      </main>
    </div>
  );
}

