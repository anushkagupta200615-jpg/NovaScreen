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
    let response = "I am the Chief AI Scientist. I can help analyze binding pockets, toxicity profiles, and compound parameters. Could you clarify your question about the molecular target or the drug candidates?";

    // Comprehensive Mock AI Knowledge Base
    if (msgLower.includes("toxicity") || msgLower.includes("safe")) {
      response = "Our Edge AI pipeline screens for toxicity using a combination of Lipinski's Rule of Five and PAINS (Pan Assay Interference Compounds) filters. We flag any molecular structures that show a high propensity for off-target binding or poor bioavailability.";
    } 
    // DRUGS
    else if (msgLower.includes("which drug") || msgLower.includes("what drug")) {
      response = "If you are looking at the 3D Viewer, we are simulating the binding of small molecule inhibitors. The specific drug being analyzed depends on the results table, but our top candidates include Nirmatrelvir (SARS-CoV-2), Erlotinib (EGFR), and Verubecestat (BACE1).";
    }
    else if (msgLower.includes("nirmatrelvir") || msgLower.includes("paxlovid")) {
      response = "Nirmatrelvir acts as a peptidomimetic inhibitor of the SARS-CoV-2 main protease (Mpro). It binds directly to the catalytic cysteine (Cys145) residue, preventing the virus from processing polyproteins necessary for viral replication.";
    } 
    else if (msgLower.includes("erlotinib") || msgLower.includes("tarceva")) {
      response = "Erlotinib is an epidermal growth factor receptor (EGFR) tyrosine kinase inhibitor. It competitively binds to the ATP-binding site of the receptor kinase, which is highly effective in treating non-small cell lung cancer (NSCLC) with specific EGFR mutations.";
    } 
    else if (msgLower.includes("verubecestat")) {
      response = "Verubecestat is a BACE1 inhibitor designed for the treatment of Alzheimer's disease. By inhibiting the beta-secretase 1 enzyme, it aims to reduce the production of amyloid-beta peptides in the brain, though it faces challenges with blood-brain barrier permeability.";
    }
    // TARGETS
    else if (msgLower.includes("sars") || msgLower.includes("covid") || msgLower.includes("protease")) {
      response = "The SARS-CoV-2 Main Protease (Mpro or 3CLpro) is a key enzyme required for viral replication. Because no human proteases have a similar cleavage specificity, it is an excellent drug target with a low risk of toxicity.";
    }
    else if (msgLower.includes("egfr")) {
      response = "EGFR (Epidermal Growth Factor Receptor) is a transmembrane protein. Overexpression or mutations in its kinase domain lead to uncontrolled cell division. We target the ATP-binding pocket to halt this oncogenic signaling.";
    }
    else if (msgLower.includes("bace1") || msgLower.includes("alzheimer")) {
      response = "BACE1 is an aspartic protease responsible for cleaving the amyloid precursor protein. Finding small molecules that can inhibit BACE1 without causing neurological toxicity is a major focus in Alzheimer's drug discovery.";
    }
    else if (msgLower.includes("spike") || msgLower.includes("glycoprotein")) {
      response = "The Spike Glycoprotein sits on the surface of SARS-CoV-2 and binds to the human ACE2 receptor to enter cells. Inhibiting it directly neutralizes the virus, which is the primary mechanism of vaccines and monoclonal antibodies.";
    }
    // GENERAL METRICS
    else if (msgLower.includes("lipinski") || msgLower.includes("rule of five")) {
      response = "Lipinski's Rule of Five evaluates drug-likeness based on 4 criteria: No more than 5 hydrogen bond donors, no more than 10 hydrogen bond acceptors, a molecular mass under 500 Daltons, and an octanol-water partition coefficient (log P) not greater than 5.";
    }
    else if (msgLower.includes("logp") || msgLower.includes("partition")) {
      response = "LogP is the partition coefficient between octanol and water. It measures a drug's lipophilicity (fat-solubility). A LogP between 2 and 5 is generally ideal for oral drugs to successfully cross cell membranes.";
    }
    else if (msgLower.includes("affinity") || msgLower.includes("energy") || msgLower.includes("kcal")) {
      response = "Binding affinity is measured in kcal/mol. A more negative number indicates a stronger, more stable binding between the drug and the protein. We generally look for scores below -8.0 kcal/mol for viable lead compounds.";
    }
    // PLATFORM QUESTIONS
    else if (msgLower.includes("best") || msgLower.includes("top")) {
      response = "Based on the recent simulation run, the compound with the lowest binding energy (strongest affinity) without violating toxicity constraints is the most promising lead candidate. You can view these metrics mapped on the scatter plot below the 3D viewer.";
    } 
    else if (msgLower.includes("how") && msgLower.includes("work")) {
      response = "NovaScreen uses dynamic molecular docking simulations. We map the 3D coordinates of the target protein's binding pocket and calculate the theoretical binding free energy (kcal/mol) of various ligand orientations. All of this runs natively in the Vercel Edge Network.";
    } 
    else if (msgLower.includes("hello") || msgLower.includes("hi")) {
      response = "Hello! I am ready to assist with your drug discovery pipeline. Which protein target are we analyzing today?";
    }
    else if (msgLower.includes("who are you") || msgLower.includes("what are you") || msgLower.includes("made you")) {
      response = "I am the NovaScreen Chief AI Scientist, a sophisticated reasoning model built to assist researchers in analyzing high-throughput screening data, identifying hit compounds, and optimizing lead drug molecules.";
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
