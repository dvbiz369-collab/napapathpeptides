// Extended details for each product detail page.
// Wellness/cosmetic-research framing only — hedged language.
// No medical/diagnostic/treatment claims.

export interface ProductDetail {
  overviewKey: string;        // 1–2 sentence intro
  researchFocusKey: string;   // primary research area
  mechanismKey: string;       // how it is studied
  benefitKeys: string[];      // 4 bullet research-interest benefits
  handlingKey: string;        // reconstitution/storage note
}

export const productDetails: Record<string, ProductDetail> = {
  klow: {
    overviewKey: "details.klow.overview",
    researchFocusKey: "details.klow.focus",
    mechanismKey: "details.klow.mechanism",
    benefitKeys: ["details.klow.b1", "details.klow.b2", "details.klow.b3", "details.klow.b4"],
    handlingKey: "details.klow.handling",
  },
  motsc: {
    overviewKey: "details.motsc.overview",
    researchFocusKey: "details.motsc.focus",
    mechanismKey: "details.motsc.mechanism",
    benefitKeys: ["details.motsc.b1", "details.motsc.b2", "details.motsc.b3", "details.motsc.b4"],
    handlingKey: "details.motsc.handling",
  },
  nad: {
    overviewKey: "details.nad.overview",
    researchFocusKey: "details.nad.focus",
    mechanismKey: "details.nad.mechanism",
    benefitKeys: ["details.nad.b1", "details.nad.b2", "details.nad.b3", "details.nad.b4"],
    handlingKey: "details.nad.handling",
  },
  tb500: {
    overviewKey: "details.tb500.overview",
    researchFocusKey: "details.tb500.focus",
    mechanismKey: "details.tb500.mechanism",
    benefitKeys: ["details.tb500.b1", "details.tb500.b2", "details.tb500.b3", "details.tb500.b4"],
    handlingKey: "details.tb500.handling",
  },
  reta: {
    overviewKey: "details.reta.overview",
    researchFocusKey: "details.reta.focus",
    mechanismKey: "details.reta.mechanism",
    benefitKeys: ["details.reta.b1", "details.reta.b2", "details.reta.b3", "details.reta.b4"],
    handlingKey: "details.reta.handling",
  },
  ss31: {
    overviewKey: "details.ss31.overview",
    researchFocusKey: "details.ss31.focus",
    mechanismKey: "details.ss31.mechanism",
    benefitKeys: ["details.ss31.b1", "details.ss31.b2", "details.ss31.b3", "details.ss31.b4"],
    handlingKey: "details.ss31.handling",
  },
  cjc: {
    overviewKey: "details.cjc.overview",
    researchFocusKey: "details.cjc.focus",
    mechanismKey: "details.cjc.mechanism",
    benefitKeys: ["details.cjc.b1", "details.cjc.b2", "details.cjc.b3", "details.cjc.b4"],
    handlingKey: "details.cjc.handling",
  },
  tesamorelin: {
    overviewKey: "details.tesamorelin.overview",
    researchFocusKey: "details.tesamorelin.focus",
    mechanismKey: "details.tesamorelin.mechanism",
    benefitKeys: ["details.tesamorelin.b1", "details.tesamorelin.b2", "details.tesamorelin.b3", "details.tesamorelin.b4"],
    handlingKey: "details.tesamorelin.handling",
  },
  ghkcu: {
    overviewKey: "details.ghkcu.overview",
    researchFocusKey: "details.ghkcu.focus",
    mechanismKey: "details.ghkcu.mechanism",
    benefitKeys: ["details.ghkcu.b1", "details.ghkcu.b2", "details.ghkcu.b3", "details.ghkcu.b4"],
    handlingKey: "details.ghkcu.handling",
  },
  selank: {
    overviewKey: "details.selank.overview",
    researchFocusKey: "details.selank.focus",
    mechanismKey: "details.selank.mechanism",
    benefitKeys: ["details.selank.b1", "details.selank.b2", "details.selank.b3", "details.selank.b4"],
    handlingKey: "details.selank.handling",
  },
  glutathione: {
    overviewKey: "details.glutathione.overview",
    researchFocusKey: "details.glutathione.focus",
    mechanismKey: "details.glutathione.mechanism",
    benefitKeys: ["details.glutathione.b1", "details.glutathione.b2", "details.glutathione.b3", "details.glutathione.b4"],
    handlingKey: "details.glutathione.handling",
  },
  epithalon: {
    overviewKey: "details.epithalon.overview",
    researchFocusKey: "details.epithalon.focus",
    mechanismKey: "details.epithalon.mechanism",
    benefitKeys: ["details.epithalon.b1", "details.epithalon.b2", "details.epithalon.b3", "details.epithalon.b4"],
    handlingKey: "details.epithalon.handling",
  },
};
