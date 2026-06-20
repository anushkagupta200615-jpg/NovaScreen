"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, FlaskConical } from "lucide-react";
import { ScreeningResult, Compound } from "@/data/mockDatasets";

interface ResultWithCompound extends ScreeningResult {
  compound?: Compound;
}

interface ResultsDashboardProps {
  results: ResultWithCompound[] | null;
}

export default function ResultsDashboard({ results }: ResultsDashboardProps) {
  if (!results || results.length === 0) {
    return (
      <div className="glass-panel p-6 w-full h-full min-h-[300px] flex flex-col items-center justify-center text-slate-400">
        <FlaskConical className="w-12 h-12 mb-4 opacity-50" />
        <p>No results yet. Run the screening pipeline.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 w-full flex flex-col space-y-6"
    >
      <h3 className="text-xl font-semibold text-slate-200">Screening Results</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-400 border-b border-slate-700/50">
            <tr>
              <th className="pb-3 font-medium">Compound</th>
              <th className="pb-3 font-medium text-right">Affinity Score</th>
              <th className="pb-3 font-medium text-center">Toxicity Risk</th>
              <th className="pb-3 font-medium text-center">Lipinski Pass</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {results.map((result, idx) => (
              <motion.tr 
                key={`${result.compoundId}-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-4 font-medium text-slate-200">
                  {result.compound?.name || result.compoundId}
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    {result.compound?.smiles?.substring(0, 15)}...
                  </div>
                </td>
                <td className="py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {result.affinityScore} kcal/mol
                  </span>
                </td>
                <td className="py-4 text-center">
                  {result.toxicityRisk === "Low" ? (
                    <span className="inline-flex items-center text-emerald-400">
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Low
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-amber-400">
                      <ShieldAlert className="w-4 h-4 mr-1" />
                      {result.toxicityRisk}
                    </span>
                  )}
                </td>
                <td className="py-4 text-center">
                  <span className={`inline-block w-3 h-3 rounded-full ${result.lipinskiPass ? "bg-brand-teal" : "bg-red-500"}`} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
