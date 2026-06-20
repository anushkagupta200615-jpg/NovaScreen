"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScreeningResult, Compound, Target } from "@/data/mockDatasets";

interface ResultWithCompound extends ScreeningResult {
  compound?: Compound;
}

interface BindingRankingsProps {
  results: ResultWithCompound[] | null;
  target?: Target;
}

export default function BindingRankings({ results, target }: BindingRankingsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Default expand first row

  if (!results || results.length === 0 || !target) {
    return null;
  }

  // Sort by affinity score ascending (lower is better)
  const sortedResults = [...results].sort((a, b) => a.affinityScore - b.affinityScore);
  const refDrugName = results.find(r => r.isReferenceDrug)?.compound?.name || "Reference Drug";
  const refScore = results.find(r => r.isReferenceDrug)?.affinityScore || 0;

  return (
    <div className="glass-panel w-full bg-zinc-950/80 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl mt-8">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Binding Rankings</h2>
        <div className="text-xs text-zinc-500">
          Click a row to inspect <span className="mx-2">|</span> {target.compoundsScreened} compounds
        </div>
      </div>

      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] font-bold text-zinc-500 tracking-wider uppercase border-b border-zinc-800/50">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Compound</div>
          <div className="col-span-3 text-right">Binding Score</div>
          <div className="col-span-2 text-center">VS {refDrugName}</div>
          <div className="col-span-2 text-right">Lipinski</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {sortedResults.map((res, idx) => {
            const isExpanded = expandedIndex === idx;
            const diff = res.affinityScore - refScore;
            
            let diffBadge = null;
            if (res.isReferenceDrug) {
               diffBadge = <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">Reference</span>;
            } else if (Math.abs(diff) <= 0.2) {
               diffBadge = <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">~ Similar</span>;
            } else if (diff > 0.2) {
               diffBadge = <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">↓ Weaker</span>;
            } else {
               diffBadge = <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">↑ Stronger</span>;
            }

            return (
              <div 
                key={res.compoundId} 
                className={`border-b border-zinc-800/30 transition-colors cursor-pointer ${
                  isExpanded ? "bg-brand-primary/5" : "hover:bg-zinc-900/30"
                }`}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              >
                {/* Row */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                  <div className="col-span-1 text-sm font-semibold text-zinc-500">
                    {isExpanded ? (
                      <span className="flex w-6 h-6 rounded bg-brand-primary/20 text-brand-primary items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <span className={`text-sm font-medium ${isExpanded ? "text-zinc-100" : "text-zinc-300"}`}>
                      {res.compound?.name}
                    </span>
                    {res.isTopHit && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-brand-primary/20 text-brand-primary border border-brand-primary/30 uppercase">
                        Top Hit
                      </span>
                    )}
                    {res.isReferenceDrug && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-amber-500/20 text-amber-500 border border-amber-500/30 uppercase">
                        FDA Approved
                      </span>
                    )}
                  </div>
                  <div className="col-span-3 text-right">
                    <span className={`font-mono text-sm ${isExpanded ? "text-brand-primary font-bold" : "text-zinc-300"}`}>
                      {res.affinityScore}
                    </span>
                    <span className="text-xs text-zinc-500 ml-1">kcal/mol</span>
                  </div>
                  <div className="col-span-2 flex justify-center items-center">
                    {diffBadge}
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`text-xs font-bold ${
                      res.violations > 0 ? "text-amber-500" : "text-emerald-400"
                    }`}>
                      {res.violations > 0 ? "REVIEW" : "PASS"}
                    </span>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        {/* 4 Cards */}
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-brand-primary mb-1">{res.affinityScore}</div>
                            <div className="text-[10px] text-zinc-500">Binding Score (kcal/mol)</div>
                          </div>
                          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-zinc-200 mb-1">
                              {diff > 0 ? "+" : ""}{diff.toFixed(2)}
                            </div>
                            <div className="text-[10px] text-zinc-500 truncate">vs {refDrugName} (kcal/mol)</div>
                          </div>
                          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-zinc-200 mb-1">{res.compound?.molecularWeight}</div>
                            <div className="text-[10px] text-zinc-500">MW (Da) &lt;500</div>
                          </div>
                          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
                            <div className="text-xl font-bold text-zinc-200 mb-1">{res.violations}/4</div>
                            <div className="text-[10px] text-zinc-500">Lipinski violations</div>
                          </div>
                        </div>

                        {/* PAINS Alert */}
                        {res.painsAlert && (
                          <div className="text-xs text-amber-500 mb-3 font-medium">
                            <span className="font-bold">Why REVIEW:</span> {res.painsAlert} Does not mean the drug won&apos;t work, but needs further optimization.
                          </div>
                        )}

                        {/* Experimental Ki */}
                        {res.experimentalKi && (
                          <div className="text-[11px] text-zinc-500">
                            Known experimental Ki: <span className="font-bold text-zinc-400">{res.experimentalKi}</span> (from published literature)
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
