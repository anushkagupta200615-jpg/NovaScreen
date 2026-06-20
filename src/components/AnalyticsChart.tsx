"use client";

import React, { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell
} from "recharts";

interface AnalyticsChartProps {
  results: any[];
}

const getColor = (toxicity: string) => {
  switch(toxicity) {
    case "Low": return "#34d399"; // emerald-400
    case "Medium": return "#fbbf24"; // amber-400
    case "High": return "#f87171"; // red-400
    default: return "#a1a1aa";
  }
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-lg shadow-xl text-sm">
        <p className="font-bold text-zinc-100 mb-1">{data.name}</p>
        <p className="text-zinc-300">Affinity: <span className="text-brand-primary">{data.affinity} kcal/mol</span></p>
        <p className="text-zinc-300">Mol. Weight: {data.mw} g/mol</p>
        <p className="text-zinc-300">Toxicity Risk: <span style={{ color: getColor(data.toxicity) }}>{data.toxicity}</span></p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsChart({ results }: AnalyticsChartProps) {
  // Prepare data for the scatter plot
  // X-axis: Molecular Weight
  // Y-axis: Binding Affinity
  // Z-axis (bubble size): Inverse LogP or constant
  // Color: Red/Yellow/Green based on Toxicity Risk

  const data = useMemo(() => {
    if (!results) return [];
    return results.map(r => ({
      name: r.compound.name,
      affinity: r.affinityScore,
      mw: r.compound.molecularWeight,
      logP: r.compound.logP,
      toxicity: r.toxicityRisk,
    }));
  }, [results]);

  if (!results || results.length === 0) return null;

  return (
    <div className="glass-panel p-6 mt-6">
      <h3 className="text-lg font-semibold text-zinc-100 mb-1">Binding Affinity vs. Molecular Weight</h3>
      <p className="text-xs text-zinc-400 mb-6">Lower binding energy indicates stronger affinity. Green compounds indicate low toxicity risk.</p>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis 
              type="number" 
              dataKey="mw" 
              name="Molecular Weight" 
              unit="g/mol" 
              stroke="#a1a1aa" 
              domain={['dataMin - 50', 'dataMax + 50']}
              tick={{ fill: '#a1a1aa', fontSize: 12 }}
            />
            <YAxis 
              type="number" 
              dataKey="affinity" 
              name="Binding Affinity" 
              unit=" kcal/mol" 
              stroke="#a1a1aa"
              domain={['auto', 'auto']}
              reversed={true} // lower is better, so it goes higher up visually if reversed? Wait, standard is lower is better, so lower negative number is better. If we reverse, -10 is higher than -4.
              tick={{ fill: '#a1a1aa', fontSize: 12 }}
            />
            <ZAxis type="number" dataKey="logP" range={[60, 200]} name="LogP" />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Compounds" data={data} animationDuration={1000}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.toxicity)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
