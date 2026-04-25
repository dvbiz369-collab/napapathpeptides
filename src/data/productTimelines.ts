// Timeline data for each product info popover.
// Wellness/cosmetic-research framing only — hedged language ("may", "helps support", "intended to").
// No medical/diagnostic/treatment claims.

export interface TimelinePhase {
  labelKey: string; // translation key for the phase label (e.g. "Minutes 0-60")
  textKey: string;  // translation key for the body text
}

export interface ProductTimeline {
  taglineKey: string; // short closing line (e.g. "Supports mitochondrial regulation")
  phases: TimelinePhase[];
}

// Each product gets 4 phases for a compact card-friendly layout.
export const productTimelines: Record<string, ProductTimeline> = {
  klow: {
    taglineKey: "timeline.klow.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.klow.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.klow.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.klow.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.klow.p4" },
    ],
  },
  motsc: {
    taglineKey: "timeline.motsc.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.motsc.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.motsc.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.motsc.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.motsc.p4" },
    ],
  },
  nad: {
    taglineKey: "timeline.nad.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.nad.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.nad.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.nad.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.nad.p4" },
    ],
  },
  tb500: {
    taglineKey: "timeline.tb500.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.tb500.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.tb500.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.tb500.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.tb500.p4" },
    ],
  },
  reta: {
    taglineKey: "timeline.reta.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.reta.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.reta.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.reta.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.reta.p4" },
    ],
  },
  ss31: {
    taglineKey: "timeline.ss31.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.ss31.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.ss31.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.ss31.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.ss31.p4" },
    ],
  },
  cjc: {
    taglineKey: "timeline.cjc.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.cjc.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.cjc.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.cjc.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.cjc.p4" },
    ],
  },
  tesamorelin: {
    taglineKey: "timeline.tesamorelin.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.tesamorelin.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.tesamorelin.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.tesamorelin.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.tesamorelin.p4" },
    ],
  },
  ghkcu: {
    taglineKey: "timeline.ghkcu.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.ghkcu.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.ghkcu.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.ghkcu.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.ghkcu.p4" },
    ],
  },
  selank: {
    taglineKey: "timeline.selank.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.selank.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.selank.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.selank.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.selank.p4" },
    ],
  },
  glutathione: {
    taglineKey: "timeline.glutathione.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.glutathione.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.glutathione.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.glutathione.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.glutathione.p4" },
    ],
  },
  epithalon: {
    taglineKey: "timeline.epithalon.tagline",
    phases: [
      { labelKey: "timeline.phase.minutes", textKey: "timeline.epithalon.p1" },
      { labelKey: "timeline.phase.hours",   textKey: "timeline.epithalon.p2" },
      { labelKey: "timeline.phase.days",    textKey: "timeline.epithalon.p3" },
      { labelKey: "timeline.phase.weeks",   textKey: "timeline.epithalon.p4" },
    ],
  },
};
