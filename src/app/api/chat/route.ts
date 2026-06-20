import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Simulate AI thinking delay to make it feel realistic
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const msgLower = message.toLowerCase();
    let response = "I am the Chief AI Scientist. I can help analyze binding pockets, toxicity profiles, and compound parameters. Please ask me about a specific drug or target.";

    // Mock AI Logic matching keywords
    if (msgLower.includes("toxicity") || msgLower.includes("safe")) {
      response = "Our Edge AI pipeline screens for toxicity using a combination of Lipinski's Rule of Five and PAINS (Pan Assay Interference Compounds) filters. We flag any molecular structures that show a high propensity for off-target binding or poor bioavailability.";
    } else if (msgLower.includes("nirmatrelvir") || msgLower.includes("paxlovid")) {
      response = "Nirmatrelvir acts as a peptidomimetic inhibitor of the SARS-CoV-2 main protease (Mpro). It binds directly to the catalytic cysteine (Cys145) residue, preventing the virus from processing polyproteins necessary for viral replication.";
    } else if (msgLower.includes("best") || msgLower.includes("top")) {
      response = "Based on the recent simulation run, the compound with the lowest binding energy (strongest affinity) without violating toxicity constraints is the most promising lead candidate. You can view these metrics mapped on the scatter plot below the 3D viewer.";
    } else if (msgLower.includes("how") && msgLower.includes("work")) {
      response = "NovaScreen uses dynamic molecular docking simulations. We map the 3D coordinates of the target protein's binding pocket and calculate the theoretical binding free energy (kcal/mol) of various ligand orientations. All of this runs natively in the Vercel Edge Network.";
    } else if (msgLower.includes("hello") || msgLower.includes("hi")) {
      response = "Hello! I am ready to assist with your drug discovery pipeline. Which protein target are we analyzing today?";
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
