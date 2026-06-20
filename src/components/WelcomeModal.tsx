"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, X } from "lucide-react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal on first load if not dismissed previously
    const hasSeenModal = localStorage.getItem("novascreen_welcome_seen");
    if (!hasSeenModal) {
      // Slight delay for dramatic effect
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("novascreen_welcome_seen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg glass-panel p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-brand-teal/20 blur-[60px] rounded-full pointer-events-none" />
            
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg shadow-brand-teal/20">
                <Activity className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">Welcome to NovaScreen</h2>
                <p className="text-sm text-brand-teal font-medium">Serverless AI Drug Discovery</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 mb-8 leading-relaxed">
              <p>
                NovaScreen screens drug candidates against protein targets using <span className="font-semibold text-slate-100">dynamic molecular simulation</span>. 
              </p>
              <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">The Serverless Edge</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Unlike traditional platforms requiring heavy backend clusters, NovaScreen runs its inference and physics logic entirely on the <span className="font-bold text-brand-teal">Vercel Edge Network</span>. This demonstration serves precomputed docking results for zero-latency presentation.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="h-1.5 rounded-full w-6 bg-brand-teal" />
                <div className="h-1.5 rounded-full w-1.5 bg-slate-700" />
                <div className="h-1.5 rounded-full w-1.5 bg-slate-700" />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleDismiss}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Skip
                </button>
                <button 
                  onClick={handleDismiss}
                  className="px-5 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-brand-teal to-brand-indigo rounded-lg hover:opacity-90 shadow-lg shadow-brand-teal/20 transition-all active:scale-95"
                >
                  Let's Go
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
