export interface Target {
  id: string;
  name: string;
  description: string;
  pdbId: string;
  resolution: string;
  atoms: number;
  bindingSiteResidues: string[];
  compoundsScreened: number;
  biologicalContext: string;
  therapeuticRelevance: string;
  benchmarkTotalTime: string;
  benchmarkPerCompound: string;
}

export const targets: Target[] = [
  {
    id: "target-1",
    name: "SARS-CoV-2 Main Protease",
    description: "Key enzyme for viral replication. Reference drug: Nirmatrelvir.",
    pdbId: "6LU7",
    resolution: "2.16Å",
    atoms: 76038,
    bindingSiteResidues: ["His41", "Cys145", "Glu166", "His164"],
    compoundsScreened: 20,
    biologicalContext: "The SARS-CoV-2 main protease (Mpro/3CLpro) cleaves viral polyproteins at 11 conserved sites, an essential step in viral replication. It has no human homolog, making it an ideal drug target with minimal off-target risk.",
    therapeuticRelevance: "Blocking this protease prevents viral replication. Nirmatrelvir (Paxlovid) targets this exact protein. Emerging SARS-CoV-2 variants show signs of nirmatrelvir resistance, creating urgent need for next-generation inhibitors.",
    benchmarkTotalTime: "174.0s",
    benchmarkPerCompound: "8.7s"
  },
  {
    id: "target-2",
    name: "KRAS G12C Lung Cancer",
    description: "Mutated GTPase protein driving cancer cell growth. Reference drug: Sotorasib.",
    pdbId: "6OIM",
    resolution: "1.60Å",
    atoms: 22620,
    bindingSiteResidues: ["Cys12", "His95", "Tyr96"],
    compoundsScreened: 15,
    biologicalContext: "KRAS is a small GTPase that acts as a master switch in cell proliferation. The G12C mutation locks it in an active state, driving oncogenesis.",
    therapeuticRelevance: "Sotorasib targets the G12C pocket, but resistance mechanisms are evolving, making it critical to find novel allosteric inhibitors.",
    benchmarkTotalTime: "85.2s",
    benchmarkPerCompound: "5.6s"
  },
  {
    id: "target-3",
    name: "EGFR Kinase Lung Cancer",
    description: "Epidermal growth factor receptor associated with non-small cell lung cancer. Reference drug: Erlotinib.",
    pdbId: "1M17",
    resolution: "2.60Å",
    atoms: 119907,
    bindingSiteResidues: ["Met793", "Cys797", "Leu844"],
    compoundsScreened: 12,
    biologicalContext: "EGFR is a transmembrane protein that regulates cell growth. Mutations in its kinase domain lead to uncontrolled division in non-small cell lung cancer.",
    therapeuticRelevance: "Erlotinib is a first-generation inhibitor, but T790M and C797S mutations cause severe drug resistance.",
    benchmarkTotalTime: "210.5s",
    benchmarkPerCompound: "17.5s"
  },
  {
    id: "target-4",
    name: "HIV-1 Protease",
    description: "Retroviral aspartyl protease essential for the life-cycle of HIV. Reference drug: Saquinavir.",
    pdbId: "1HIV",
    resolution: "2.00Å",
    atoms: 45635,
    bindingSiteResidues: ["Asp25", "Ile50", "Val82"],
    compoundsScreened: 10,
    biologicalContext: "HIV-1 protease cleaves newly synthesized polyproteins to create mature infectious viral particles.",
    therapeuticRelevance: "Saquinavir was the first PI approved for HIV, but multi-drug resistant strains necessitate continuously finding unique binding scaffolds.",
    benchmarkTotalTime: "92.0s",
    benchmarkPerCompound: "9.2s"
  }
];

export interface Compound {
  id: string;
  name: string;
  smiles: string;
  molecularWeight: number;
  logP: number;
  hbd: number;
  hba: number;
}

export const compounds: Compound[] = [
  { id: "cmp-1", name: "Nirmatrelvir (Paxlovid)", smiles: "CC1(C2C1C(N(C2)C(=O)C(C(C)(C)C)NC(=O)C(F)(F)F)C(=O)NC(CC3CCNC3=O)C#N)C", molecularWeight: 499.5, logP: 1.8, hbd: 3, hba: 5 },
  { id: "cmp-2", name: "Shikonin", smiles: "CC(=CCC(C1=C(C=C2C(=C1O)C(=O)C=CC2=O)O)O)C", molecularWeight: 288.3, logP: 2.1, hbd: 3, hba: 5 },
  { id: "cmp-3", name: "Calpain Inhibitor II", smiles: "CC(C)CC(C=O)NC(=O)C(CC(C)C)NC(=O)C(C)NC(=O)C(C)NC(=O)C", molecularWeight: 333.4, logP: 2.0, hbd: 2, hba: 4 },
  { id: "cmp-4", name: "Luteolin", smiles: "C1=CC(=C(C=C1C2=CC(=O)C3=C(C=C(C=C3O2)O)O)O)O", molecularWeight: 300.3, logP: 2.6, hbd: 4, hba: 6 },
  { id: "cmp-5", name: "Sotorasib", smiles: "CC1=C(C(=O)N(C1=O)C2=C(C=CC=C2F)C3=C(C=C(C=N3)Cl)O)C4=CC=C(C=C4)C#N", molecularWeight: 560.0, logP: 3.5, hbd: 1, hba: 7 },
  { id: "cmp-6", name: "WZ4002", smiles: "CN1CCN(CC1)C2=CC=C(C=C2)NC3=NC=C(C(=N3)NC4=CC=CC(=C4)C#N)C(F)(F)F", molecularWeight: 467.5, logP: 4.2, hbd: 2, hba: 6 },
  { id: "cmp-7", name: "Saquinavir", smiles: "CC(C)(C)NC(=O)C1CC2CCCCC2C(C1)N3CC(CC3C(=O)NC(CC4=CC=CC=C4)C(O)CC5=CC=CC=C5)O", molecularWeight: 670.8, logP: 4.5, hbd: 4, hba: 6 }
];

export interface ScreeningResult {
  targetId: string;
  compoundId: string;
  affinityScore: number; // kcal/mol
  toxicityRisk: "Low" | "Medium" | "High";
  violations: number;
  painsAlert: string | null;
  structuralAnalysis?: string;
  isTopHit?: boolean;
  referenceDrug?: {
    name: string;
    affinityScore: number;
  }
}

export const screeningResults: ScreeningResult[] = [
  { 
    targetId: "target-1", 
    compoundId: "cmp-2", // Shikonin
    affinityScore: -6.79, 
    toxicityRisk: "Medium", 
    violations: 0,
    painsAlert: "PAINS alert (quinone_A(370)): chemical pattern known to cause false positives in lab assays.",
    isTopHit: true,
    referenceDrug: { name: "Nirmatrelvir (Paxlovid)", affinityScore: -6.71 },
    structuralAnalysis: "The top candidate, Shikonin, exhibits a stronger binding affinity to the SARS-CoV-2 main protease (6LU7) with a binding energy of -6.79 kcal/mol, compared to Nirmatrelvir (Paxlovid), which has a binding energy of -6.71 kcal/mol, showing a mere -0.08 kcal/mol difference. This enhanced binding is largely attributed to its precise fit into the active site cleft of the protease. Specifically, Shikonin forms multiple hydrogen bonds and hydrophobic interactions with key residues such as His41, Cys145, and Glu166. The aromatic ring of Shikonin aligns well with the hydrophobic pocket defined by these residues, allowing for strong van der Waals interactions and additional hydrogen bonding opportunities. Additionally, the hydroxyl group of Shikonin interacts favorably with the polar environment around His164, further stabilizing the complex. These interactions collectively contribute to the superior binding affinity of Shikonin over Nirmatrelvir, making it a promising lead compound in the drug discovery process. The detailed interaction map reveals that Shikonin's ability to engage multiple binding sites simultaneously provides a robust and stable interaction profile. For instance, the aromatic ring of Shikonin stacks against the hydrophobic patch formed by P1' and P2' residues (Cys145 and Glu166), while the hydroxyl group forms a hydrogen bond with the carbonyl oxygen of Glu166. This multi-point engagement not only increases the overall binding energy but also enhances the specificity of Shikonin for the SARS-CoV-2 main protease, reducing the likelihood of off-target effects. Thus, the structural analysis underscores the importance of these specific interactions in achieving the observed binding affinity, highlighting Shikonin as a potent inhibitor with significant therapeutic potential."
  },
  { targetId: "target-1", compoundId: "cmp-1", affinityScore: -6.71, toxicityRisk: "Low", violations: 0, painsAlert: null },
  { targetId: "target-1", compoundId: "cmp-3", affinityScore: -6.66, toxicityRisk: "Low", violations: 0, painsAlert: null },
  { targetId: "target-1", compoundId: "cmp-4", affinityScore: -6.55, toxicityRisk: "Medium", violations: 0, painsAlert: "PAINS alert (catechol_A(92))" },

  { 
    targetId: "target-2", 
    compoundId: "cmp-5", // Sotorasib
    affinityScore: -8.59, 
    toxicityRisk: "Low", 
    violations: 1,
    painsAlert: null,
    isTopHit: true,
    referenceDrug: { name: "Sotorasib", affinityScore: -8.59 },
    structuralAnalysis: "Sotorasib forms a covalent bond with Cys12 in the KRAS G12C mutant, irreversibly locking the protein in an inactive state. The interactions are heavily stabilized by the Switch II pocket."
  },

  { 
    targetId: "target-3", 
    compoundId: "cmp-6", // WZ4002
    affinityScore: -8.82, 
    toxicityRisk: "Low", 
    violations: 0,
    painsAlert: null,
    isTopHit: true,
    referenceDrug: { name: "Erlotinib", affinityScore: -7.50 },
    structuralAnalysis: "WZ4002 forms an irreversible covalent bond with Cys797 in the ATP binding pocket of EGFR, overcoming the T790M gatekeeper mutation resistance seen with Erlotinib."
  },

  { 
    targetId: "target-4", 
    compoundId: "cmp-7", // Saquinavir
    affinityScore: -6.26, 
    toxicityRisk: "Low", 
    violations: 2,
    painsAlert: null,
    isTopHit: true,
    referenceDrug: { name: "Saquinavir", affinityScore: -6.26 },
    structuralAnalysis: "Saquinavir binds symmetrically into the active site of the HIV-1 protease homodimer, mimicking the transition state of the peptide substrate and coordinating with the catalytic Asp25 residues."
  }
];
