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
  aod9604: {
    overviewKey: "details.aod9604.overview",
    researchFocusKey: "details.aod9604.focus",
    mechanismKey: "details.aod9604.mechanism",
    benefitKeys: ["details.aod9604.b1", "details.aod9604.b2", "details.aod9604.b3", "details.aod9604.b4"],
    handlingKey: "details.aod9604.handling",
  },
  sermorelin: {
    overviewKey: "details.sermorelin.overview",
    researchFocusKey: "details.sermorelin.focus",
    mechanismKey: "details.sermorelin.mechanism",
    benefitKeys: ["details.sermorelin.b1", "details.sermorelin.b2", "details.sermorelin.b3", "details.sermorelin.b4"],
    handlingKey: "details.sermorelin.handling",
  },
  slupp332: {
    overviewKey: "details.slupp332.overview",
    researchFocusKey: "details.slupp332.focus",
    mechanismKey: "details.slupp332.mechanism",
    benefitKeys: ["details.slupp332.b1", "details.slupp332.b2", "details.slupp332.b3", "details.slupp332.b4"],
    handlingKey: "details.slupp332.handling",
  },
  sma: {
    overviewKey: "details.sma.overview",
    researchFocusKey: "details.sma.focus",
    mechanismKey: "details.sma.mechanism",
    benefitKeys: ["details.sma.b1", "details.sma.b2", "details.sma.b3", "details.sma.b4"],
    handlingKey: "details.sma.handling",
  },
  snap8: {
    overviewKey: "details.snap8.overview",
    researchFocusKey: "details.snap8.focus",
    mechanismKey: "details.snap8.mechanism",
    benefitKeys: ["details.snap8.b1", "details.snap8.b2", "details.snap8.b3", "details.snap8.b4"],
    handlingKey: "details.snap8.handling",
  },
  thymalin: {
    overviewKey: "details.thymalin.overview",
    researchFocusKey: "details.thymalin.focus",
    mechanismKey: "details.thymalin.mechanism",
    benefitKeys: ["details.thymalin.b1", "details.thymalin.b2", "details.thymalin.b3", "details.thymalin.b4"],
    handlingKey: "details.thymalin.handling",
  },
  tha1: {
    overviewKey: "details.tha1.overview",
    researchFocusKey: "details.tha1.focus",
    mechanismKey: "details.tha1.mechanism",
    benefitKeys: ["details.tha1.b1", "details.tha1.b2", "details.tha1.b3", "details.tha1.b4"],
    handlingKey: "details.tha1.handling",
  },
  teamo: {
    overviewKey: "details.teamo.overview",
    researchFocusKey: "details.teamo.focus",
    mechanismKey: "details.teamo.mechanism",
    benefitKeys: ["details.teamo.b1", "details.teamo.b2", "details.teamo.b3", "details.teamo.b4"],
    handlingKey: "details.teamo.handling",
  },
  "tesa-ipa": {
    overviewKey: "details.tesa-ipa.overview",
    researchFocusKey: "details.tesa-ipa.focus",
    mechanismKey: "details.tesa-ipa.mechanism",
    benefitKeys: ["details.tesa-ipa.b1", "details.tesa-ipa.b2", "details.tesa-ipa.b3", "details.tesa-ipa.b4"],
    handlingKey: "details.tesa-ipa.handling",
  },
  "tha1-thymulin": {
    overviewKey: "details.tha1-thymulin.overview",
    researchFocusKey: "details.tha1-thymulin.focus",
    mechanismKey: "details.tha1-thymulin.mechanism",
    benefitKeys: ["details.tha1-thymulin.b1", "details.tha1-thymulin.b2", "details.tha1-thymulin.b3", "details.tha1-thymulin.b4"],
    handlingKey: "details.tha1-thymulin.handling",
  },
  "tha1-thymulin-kpv": {
    overviewKey: "details.tha1-thymulin-kpv.overview",
    researchFocusKey: "details.tha1-thymulin-kpv.focus",
    mechanismKey: "details.tha1-thymulin-kpv.mechanism",
    benefitKeys: ["details.tha1-thymulin-kpv.b1", "details.tha1-thymulin-kpv.b2", "details.tha1-thymulin-kpv.b3", "details.tha1-thymulin-kpv.b4"],
    handlingKey: "details.tha1-thymulin-kpv.handling",
  },
  trz: {
    overviewKey: "details.trz.overview",
    researchFocusKey: "details.trz.focus",
    mechanismKey: "details.trz.mechanism",
    benefitKeys: ["details.trz.b1", "details.trz.b2", "details.trz.b3", "details.trz.b4"],
    handlingKey: "details.trz.handling",
  },
  vip: {
    overviewKey: "details.vip.overview",
    researchFocusKey: "details.vip.focus",
    mechanismKey: "details.vip.mechanism",
    benefitKeys: ["details.vip.b1", "details.vip.b2", "details.vip.b3", "details.vip.b4"],
    handlingKey: "details.vip.handling",
  },
};
