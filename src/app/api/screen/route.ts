import { NextRequest, NextResponse } from "next/server";
import { targets, compounds, screeningResults } from "@/data/mockDatasets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetId, customPdbId } = body;

    if (!targetId) {
      return NextResponse.json({ error: "Missing targetId" }, { status: 400 });
    }

    // Simulate backend processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    let target: any;
    let results: any[];

    if (targetId === "custom") {
      if (!customPdbId) {
        return NextResponse.json({ error: "Missing customPdbId" }, { status: 400 });
      }
      target = {
        id: "custom",
        name: `Custom Target (${customPdbId.toUpperCase()})`,
        description: "User-provided custom protein target from RCSB.",
        pdbId: customPdbId,
      };
      
      // Generate some dynamic fake results for the custom target
      results = compounds.map((c, idx) => ({
        targetId: "custom",
        compoundId: c.id,
        affinityScore: -Math.abs(Number((Math.random() * 8 + 4).toFixed(1))), // random between -4 and -12
        toxicityRisk: Math.random() > 0.7 ? (Math.random() > 0.5 ? "High" : "Medium") : "Low",
        lipinskiPass: Math.random() > 0.2,
        notes: "Dynamic binding simulation completed.",
        compound: c,
      })).sort((a, b) => a.affinityScore - b.affinityScore);

    } else {
      target = targets.find((t) => t.id === targetId);
      if (!target) {
        return NextResponse.json({ error: "Target not found" }, { status: 404 });
      }

      results = screeningResults
        .filter((r) => r.targetId === targetId)
        .map((r) => {
          const compound = compounds.find((c) => c.id === r.compoundId);
          return {
            ...r,
            compound,
          };
        })
        .sort((a, b) => a.affinityScore - b.affinityScore);
        
      // If no specific results exist for the newly added targets, fallback to some fake ones
      if (results.length === 0) {
        results = compounds.map((c) => ({
          targetId: target.id,
          compoundId: c.id,
          affinityScore: -Math.abs(Number((Math.random() * 6 + 4).toFixed(1))),
          toxicityRisk: "Low",
          lipinskiPass: true,
          notes: "General affinity profiling completed.",
          compound: c,
        })).sort((a, b) => a.affinityScore - b.affinityScore);
      }
    }

    return NextResponse.json({
      target,
      results,
      status: "completed",
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
