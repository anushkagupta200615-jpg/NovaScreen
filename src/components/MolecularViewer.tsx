"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface MolecularViewerProps {
  pdbId: string | null;
}

export default function MolecularViewer({ pdbId }: MolecularViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pdbId || !viewerRef.current) return;

    let viewer: any = null;

    const loadViewer = async () => {
      setLoading(true);
      setError(null);
      try {
        // Dynamically import 3dmol to avoid SSR issues
        const $3Dmol = await import("3dmol");
        
        viewerRef.current!.innerHTML = ""; // Clear previous
        
        viewer = $3Dmol.createViewer(viewerRef.current, {
          backgroundColor: "white", // Transparent doesn't work well sometimes, we'll use a dark background later if possible
          id: "3dmol-viewer",
        });

        // 3Dmol creates a canvas, we want it to blend with dark mode
        viewer.setBackgroundColor(0x020617, 0); // Transparent or zinc-950

        // Download PDB from RCSB
        const uri = `https://files.rcsb.org/download/${pdbId}.pdb`;
        const response = await fetch(uri);
        if (!response.ok) throw new Error("Failed to fetch PDB data");
        const pdbData = await response.text();

        viewer.addModel(pdbData, "pdb");
        viewer.setStyle({}, { cartoon: { color: "spectrum" } }); // colorful cartoon representation
        viewer.zoomTo();
        viewer.render();
      } catch (err: any) {
        console.error("3Dmol Error:", err);
        setError("Failed to load molecular structure.");
      } finally {
        setLoading(false);
      }
    };

    loadViewer();

    return () => {
      if (viewer) {
        viewer.clear();
      }
    };
  }, [pdbId]);

  return (
    <div className="relative w-full h-[400px] glass-panel flex items-center justify-center overflow-hidden">
      {!pdbId && !loading && (
        <div className="text-zinc-400 flex flex-col items-center">
          <p>Select a target to view molecular structure</p>
        </div>
      )}
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm z-10 rounded-2xl">
          <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 text-red-400">
          <p>{error}</p>
        </div>
      )}

      <div ref={viewerRef} className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden" />
    </div>
  );
}
