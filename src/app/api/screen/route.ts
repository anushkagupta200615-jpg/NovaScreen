import { NextRequest, NextResponse } from "next/server";
import { targets, compounds, screeningResults } from "@/data/mockDatasets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetId } = body;

    if (!targetId) {
      return NextResponse.json({ error: "Missing targetId" }, { status: 400 });
    }

    // Simulate backend processing time (e.g. running AI models)
    // In a real scenario, this would be a long running job.
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const target = targets.find((t) => t.id === targetId);
    if (!target) {
      return NextResponse.json({ error: "Target not found" }, { status: 404 });
    }

    const results = screeningResults
      .filter((r) => r.targetId === targetId)
      .map((r) => {
        const compound = compounds.find((c) => c.id === r.compoundId);
        return {
          ...r,
          compound,
        };
      })
      .sort((a, b) => a.affinityScore - b.affinityScore); // lower score is better (stronger binding)

    return NextResponse.json({
      target,
      results,
      status: "completed",
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
