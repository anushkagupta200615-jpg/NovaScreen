"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, X, Zap, Target, ArrowRight } from "lucide-react";
import { targets } from "@/data/mockDatasets";

interface WelcomeModalProps {
  selectedTargetId?: string;
  onSelectTarget?: (id: string) => void;
  onRun?: () => void;
}

export default function WelcomeModal({ selectedTargetId, onSelectTarget, onRun }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Show modal on every load for the demo
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    setStep(1);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleStart = () => {
    handleDismiss();
    if (onRun) {
      setTimeout(onRun, 300); // slight delay so modal dismisses first
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg glass-panel p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -tranzinc-x-1/2 w-full h-32 bg-brand-primary/20 blur-[60px] rounded-full pointer-events-none" />
            
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg shadow-brand-primary/20">
                      <Activity className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">Welcome to NovaScreen</h2>
                      <p className="text-sm text-brand-primary font-medium">Serverless AI Drug Discovery</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-zinc-300 mb-8 leading-relaxed">
                    <p>
                      NovaScreen screens drug candidates against protein targets using <span className="font-semibold text-zinc-100">dynamic molecular simulation</span>. 
                    </p>
                    <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">The Serverless Edge</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Unlike traditional platforms requiring heavy backend clusters, NovaScreen runs its inference and physics logic entirely on the <span className="font-bold text-brand-primary">Vercel Edge Network</span>.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg shadow-brand-secondary/20">
                      <Zap className="w-6 h-6 text-brand-secondary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">How It Works</h2>
                      <p className="text-sm text-brand-secondary font-medium">5-Step AI Inference Pipeline</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-zinc-300 mb-8 leading-relaxed">
                    <p>
                      Our pipeline evaluates molecular binding affinity in real-time. The process involves:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-zinc-400">1</span></div>
                        <span className="text-zinc-400">Parsing the target&apos;s 3D structural <span className="text-zinc-200">PDB file</span>.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-zinc-400">2</span></div>
                        <span className="text-zinc-400">Simulating <span className="text-zinc-200">binding pockets</span> using physics heuristics.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-zinc-400">3</span></div>
                        <span className="text-zinc-400">Filtering candidates against <span className="text-zinc-200">Lipinski&apos;s Rule of Five</span> for safety.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Target className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">Choose a Target</h2>
                      <p className="text-sm text-emerald-400 font-medium">Select a protein to begin screening</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-zinc-300 mb-8 leading-relaxed">
                    <p>Select one of our curated targets below, or choose a custom PDB ID to run a demonstration of the platform.</p>
                    
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-2">
                      {targets.slice(0, 3).map((t) => (
                        <button
                          key={t.id}
                          onClick={() => onSelectTarget && onSelectTarget(t.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${selectedTargetId === t.id ? "bg-brand-primary/10 border border-brand-primary/30" : "hover:bg-zinc-800/50 border border-transparent"}`}
                        >
                          <div>
                            <div className={`font-semibold ${selectedTargetId === t.id ? "text-brand-primary" : "text-zinc-200"}`}>{t.name}</div>
                            <div className="text-[10px] text-zinc-500">{t.pdbId}</div>
                          </div>
                          {selectedTargetId === t.id && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
              <div className="flex gap-1.5">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? "w-6 bg-brand-primary" : "w-1.5 bg-zinc-700"}`} />
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? "w-6 bg-brand-secondary" : "w-1.5 bg-zinc-700"}`} />
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 3 ? "w-6 bg-emerald-400" : "w-1.5 bg-zinc-700"}`} />
              </div>
              <div className="flex gap-3">
                {step < 3 ? (
                  <>
                    <button 
                      onClick={handleDismiss}
                      className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Skip
                    </button>
                    <button 
                      onClick={nextStep}
                      className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-zinc-950 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all active:scale-95"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleStart}
                    className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-zinc-950 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg hover:opacity-90 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    Run Simulation <Zap className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
