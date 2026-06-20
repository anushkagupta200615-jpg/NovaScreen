import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { targetId, customPdbId } = await request.json();

    // In a real app, this would query ArXiv or PubMed API with the target details
    // For this demonstration, we return highly relevant mock data.
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const targetName = targetId === 'custom' ? (customPdbId || 'Custom Protein') : (targetId || 'Target');

    const mockPapers = [
      {
        id: "paper-1",
        title: `Deep Learning Approaches for Identifying Novel Inhibitors of ${targetName.toUpperCase()}`,
        authors: ["Dr. Sarah Chen", "Marcus V. Rossi", "et al."],
        year: 2025,
        journal: "Nature Machine Intelligence",
        aiSummary: `This paper discusses a novel generative AI model that successfully identified 4 high-affinity ligands for ${targetName}. The binding pocket analysis in Figure 3 directly relates to your current screening setup.`,
        url: "#"
      },
      {
        id: "paper-2",
        title: `Structural insights into the allosteric modulation of ${targetName.toUpperCase()} via cryogenic electron microscopy`,
        authors: ["Elena Rustov", "James K. Liu"],
        year: 2024,
        journal: "Cell Structure",
        aiSummary: `Highlights a previously unknown allosteric site that could be targeted to avoid the toxicity issues seen in primary active site inhibitors. Consider running a secondary screen focusing on this region.`,
        url: "#"
      },
      {
        id: "paper-3",
        title: "Predictive ADMET Profiling Using Graph Neural Networks",
        authors: ["BioPharm AI Group"],
        year: 2023,
        journal: "Journal of Cheminformatics",
        aiSummary: "Provides the foundational model architecture we are currently using to estimate the toxicity and bioavailability of your generated compounds.",
        url: "#"
      }
    ];

    return NextResponse.json({ papers: mockPapers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch research papers" }, { status: 500 });
  }
}
