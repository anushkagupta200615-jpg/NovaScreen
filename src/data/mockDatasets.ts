export interface Target {
  id: string;
  name: string;
  description: string;
  pdbId: string;
}

export const targets: Target[] = [
  {
    id: "target-1",
    name: "COVID-19 Main Protease",
    description: "Key enzyme for viral replication. Reference drug: Nirmatrelvir.",
    pdbId: "6LU7"
  },
  {
    id: "target-2",
    name: "KRAS G12C Lung Cancer",
    description: "Mutated GTPase protein driving cancer cell growth. Reference drug: Sotorasib.",
    pdbId: "6OIM"
  },
  {
    id: "target-3",
    name: "EGFR Kinase Lung Cancer",
    description: "Epidermal growth factor receptor associated with non-small cell lung cancer. Reference drug: Erlotinib.",
    pdbId: "1M17"
  },
  {
    id: "target-4",
    name: "HIV-1 Protease",
    description: "Retroviral aspartyl protease essential for the life-cycle of HIV. Reference drug: Saquinavir.",
    pdbId: "1HIV"
  }
];

export interface Compound {
  id: string;
  name: string;
  smiles: string;
  molecularWeight: number;
  logP: number;
}

export const compounds: Compound[] = [
  { id: "cmp-1", name: "Nirmatrelvir", smiles: "CC1(C2C1C(N(C2)C(=O)C(C(C)(C)C)NC(=O)C(F)(F)F)C(=O)NC(CC3CCNC3=O)C#N)C", molecularWeight: 499.5, logP: 1.8 },
  { id: "cmp-2", name: "Erlotinib", smiles: "COCCOC1=C(C=C2C(=C1)C(=NC=N2)NC3=CC=CC(=C3)C#C)OCCOC", molecularWeight: 393.4, logP: 3.3 },
  { id: "cmp-3", name: "Verubecestat", smiles: "CC1(C(=O)NC(=N)N1C2=CC(=C(C=C2)F)C3=CN=C(C=C3)C(F)(F)F)C", molecularWeight: 409.4, logP: 2.1 }
];

export interface ScreeningResult {
  targetId: string;
  compoundId: string;
  affinityScore: number; // kcal/mol
  toxicityRisk: "Low" | "Medium" | "High";
  lipinskiPass: boolean;
  notes: string;
}

export const screeningResults: ScreeningResult[] = [
  { targetId: "target-1", compoundId: "cmp-1", affinityScore: -9.2, toxicityRisk: "Low", lipinskiPass: true, notes: "Strong hydrogen bonding with Cys145 and His41 catalytic dyad." },
  { targetId: "target-1", compoundId: "cmp-2", affinityScore: -4.1, toxicityRisk: "Low", lipinskiPass: true, notes: "Poor fit in the S1/S2 pockets." },
  { targetId: "target-2", compoundId: "cmp-2", affinityScore: -10.5, toxicityRisk: "Medium", lipinskiPass: true, notes: "Excellent binding within the ATP pocket." },
  { targetId: "target-3", compoundId: "cmp-3", affinityScore: -8.8, toxicityRisk: "Low", lipinskiPass: true, notes: "Optimal interaction with catalytic aspartates." }
];
