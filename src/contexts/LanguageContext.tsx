import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Lang = "en" | "es";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.products": { en: "Products", es: "Productos" },
  "nav.quality": { en: "Quality", es: "Calidad" },
  "nav.contact": { en: "Contact", es: "Contacto" },

  // Disclaimer banner
  "disclaimer.banner": {
    en: "For research purposes only. Not intended for human or animal consumption.",
    es: "Solo para fines de investigación. No destinado al consumo humano o animal.",
  },

  // Hero
  "hero.badge": { en: "Research Grade Peptides", es: "Péptidos de Grado de Investigación" },
  "hero.title.prefix": { en: "Pathway ", es: "Pathway " },
  "hero.title.highlight": { en: "Cellular", es: "Cellular" },
  "hero.title.suffix": { en: "", es: "" },
  "hero.title.poweredBy": { en: "powered by Napa Path Peptides", es: "presentado por Napa Path Peptides" },
  "hero.subtitle": {
    en: "High-purity lyophilized peptides. Third-party tested. Certificate of Analysis with every order.",
    es: "Péptidos liofilizados de alta pureza. Probados por terceros. Certificado de análisis con cada pedido.",
  },
  "hero.cta.products": { en: "View Products", es: "Ver Productos" },
  "hero.cta.reports": { en: "Lab Reports", es: "Informes de Laboratorio" },

  // Trust bar
  "trust.shipping": { en: "Same-Day Shipping until 6 PM", es: "Envío el mismo día hasta las 6 PM" },
  "trust.coa": { en: "Verified COAs", es: "COAs Verificados" },
  "trust.tested": { en: "Batch Tested", es: "Lote Probado" },
  "trust.purity": { en: "99%+ Purity", es: "99%+ Pureza" },
  "trust.support": { en: "Live Support", es: "Soporte en Vivo" },

  // Product section
  "products.badge": { en: "Catalog", es: "Catálogo" },
  "products.title": { en: "Our Products", es: "Nuestros Productos" },
  "products.subtitle": {
    en: "Research-grade peptides. Rigorously tested. Third-party verified for purity and potency.",
    es: "Péptidos de grado de investigación. Rigurosamente probados. Verificados por terceros en pureza y potencia.",
  },
  "products.addToCart": { en: "Add to Cart", es: "Agregar al Carrito" },
  "products.learnMore": { en: "Learn More", es: "Saber Más" },
  "products.info": { en: "Product info", es: "Información del producto" },
  "productDetail.back": { en: "Back to products", es: "Volver a productos" },
  "productDetail.disclaimer": {
    en: "For research use only. Not intended for human or animal consumption, diagnosis, or treatment.",
    es: "Solo para uso en investigación. No destinado al consumo humano o animal, diagnóstico o tratamiento.",
  },
  "products.benefits": { en: "Intended Research", es: "Investigación Prevista" },
  "products.timeline.heading": {
    en: "What may happen in research settings",
    es: "Lo que puede ocurrir en entornos de investigación",
  },

  // Timeline phase labels (shared)
  "timeline.phase.minutes": { en: "Minutes 0–60", es: "Minutos 0–60" },
  "timeline.phase.hours":   { en: "Hours 1–4",    es: "Horas 1–4" },
  "timeline.phase.days":    { en: "Days 1–7",     es: "Días 1–7" },
  "timeline.phase.weeks":   { en: "Weeks 2–8",    es: "Semanas 2–8" },

  // Klow
  "timeline.klow.tagline": { en: "Intended to support metabolic vitality research.", es: "Destinado a apoyar la investigación de vitalidad metabólica." },
  "timeline.klow.p1": { en: "Compound enters circulation. Initial signaling activity may begin.", es: "El compuesto entra en circulación. Puede iniciarse la actividad de señalización inicial." },
  "timeline.klow.p2": { en: "May help support early metabolic and energy-balance pathways.", es: "Puede ayudar a apoyar las vías metabólicas y de equilibrio energético tempranas." },
  "timeline.klow.p3": { en: "Cellular maintenance markers may begin trending in research models.", es: "Los marcadores de mantenimiento celular pueden comenzar a moverse en modelos de investigación." },
  "timeline.klow.p4": { en: "Sustained wellness and vitality markers may become more apparent.", es: "Los marcadores sostenidos de bienestar y vitalidad pueden volverse más evidentes." },

  // Mots-C
  "timeline.motsc.tagline": { en: "Helps support mitochondrial regulation research.", es: "Ayuda a apoyar la investigación de regulación mitocondrial." },
  "timeline.motsc.p1": { en: "Enters circulation. May begin engaging mitochondrial signaling pathways.", es: "Entra en circulación. Puede comenzar a activar vías de señalización mitocondrial." },
  "timeline.motsc.p2": { en: "Cellular energy regulation pathways may shift toward improved efficiency.", es: "Las vías de regulación de energía celular pueden orientarse hacia una mayor eficiencia." },
  "timeline.motsc.p3": { en: "Metabolic flexibility markers may improve in research settings.", es: "Los marcadores de flexibilidad metabólica pueden mejorar en entornos de investigación." },
  "timeline.motsc.p4": { en: "Mitochondrial function markers may become more optimized over time.", es: "Los marcadores de función mitocondrial pueden optimizarse con el tiempo." },

  // NAD+
  "timeline.nad.tagline": { en: "Intended to support cellular energy research.", es: "Destinado a apoyar la investigación de energía celular." },
  "timeline.nad.p1": { en: "Coenzyme enters circulation. May begin supporting NAD+ pools.", es: "La coenzima entra en circulación. Puede comenzar a apoyar los niveles de NAD+." },
  "timeline.nad.p2": { en: "Cellular energy pathways may show early support markers.", es: "Las vías de energía celular pueden mostrar marcadores tempranos de apoyo." },
  "timeline.nad.p3": { en: "Healthy aging and vitality markers may begin trending positively.", es: "Los marcadores de envejecimiento saludable y vitalidad pueden mejorar." },
  "timeline.nad.p4": { en: "Sustained cellular resilience markers may become more apparent.", es: "Los marcadores de resiliencia celular sostenida pueden volverse más evidentes." },

  // TB-500 / BPC-157
  "timeline.tb500.tagline": { en: "Intended to support tissue wellness research.", es: "Destinado a apoyar la investigación de bienestar tisular." },
  "timeline.tb500.p1": { en: "Peptides enter circulation and may localize to areas of interest.", es: "Los péptidos entran en circulación y pueden localizarse en áreas de interés." },
  "timeline.tb500.p2": { en: "Early support of tissue maintenance pathways may begin.", es: "Puede comenzar el apoyo temprano a las vías de mantenimiento tisular." },
  "timeline.tb500.p3": { en: "Mobility and recovery comfort markers may improve in research models.", es: "Los marcadores de movilidad y comodidad de recuperación pueden mejorar." },
  "timeline.tb500.p4": { en: "Sustained tissue wellness markers may become more noticeable.", es: "Los marcadores sostenidos de bienestar tisular pueden volverse más notables." },

  // Reta
  "timeline.reta.tagline": { en: "Intended to support metabolic balance research.", es: "Destinado a apoyar la investigación de equilibrio metabólico." },
  "timeline.reta.p1": { en: "Compound enters circulation and engages relevant receptors.", es: "El compuesto entra en circulación y se acopla a los receptores relevantes." },
  "timeline.reta.p2": { en: "Appetite-signaling and satiety pathways may begin to shift.", es: "Las vías de señalización del apetito y la saciedad pueden comenzar a cambiar." },
  "timeline.reta.p3": { en: "Body composition markers may begin trending in research settings.", es: "Los marcadores de composición corporal pueden comenzar a moverse." },
  "timeline.reta.p4": { en: "Sustained metabolic wellness markers may become more apparent.", es: "Los marcadores sostenidos de bienestar metabólico pueden volverse más evidentes." },

  // SS-31
  "timeline.ss31.tagline": { en: "Intended to support mitochondrial wellness research.", es: "Destinado a apoyar la investigación de bienestar mitocondrial." },
  "timeline.ss31.p1": { en: "Peptide enters circulation and may localize to mitochondrial membranes.", es: "El péptido entra en circulación y puede localizarse en las membranas mitocondriales." },
  "timeline.ss31.p2": { en: "Oxidative balance pathways may begin to show early support.", es: "Las vías de equilibrio oxidativo pueden mostrar apoyo temprano." },
  "timeline.ss31.p3": { en: "Cellular energy markers may improve under metabolic stress models.", es: "Los marcadores de energía celular pueden mejorar bajo modelos de estrés metabólico." },
  "timeline.ss31.p4": { en: "Sustained mitochondrial wellness markers may become more noticeable.", es: "Los marcadores sostenidos de bienestar mitocondrial pueden volverse más notables." },

  // CJC-1295 / Ipamorelin
  "timeline.cjc.tagline": { en: "Intended to support recovery and vitality research.", es: "Destinado a apoyar la investigación de recuperación y vitalidad." },
  "timeline.cjc.p1": { en: "Peptides enter circulation. Pulsatile signaling activity may begin.", es: "Los péptidos entran en circulación. Puede iniciarse la actividad de señalización pulsátil." },
  "timeline.cjc.p2": { en: "Restful sleep and overnight recovery pathways may receive early support.", es: "Las vías de sueño reparador y recuperación nocturna pueden recibir apoyo temprano." },
  "timeline.cjc.p3": { en: "Tissue maintenance and vitality markers may begin trending.", es: "Los marcadores de mantenimiento tisular y vitalidad pueden comenzar a moverse." },
  "timeline.cjc.p4": { en: "Sustained wellness and recovery markers may become more apparent.", es: "Los marcadores sostenidos de bienestar y recuperación pueden volverse más evidentes." },

  // Tesamorelin
  "timeline.tesamorelin.tagline": { en: "Intended to support body composition research.", es: "Destinado a apoyar la investigación de composición corporal." },
  "timeline.tesamorelin.p1": { en: "Compound enters circulation and engages relevant receptors.", es: "El compuesto entra en circulación y se acopla a los receptores relevantes." },
  "timeline.tesamorelin.p2": { en: "Early metabolic-signaling pathways may begin showing activity.", es: "Las vías tempranas de señalización metabólica pueden comenzar a mostrar actividad." },
  "timeline.tesamorelin.p3": { en: "Adipose distribution markers may begin trending in research models.", es: "Los marcadores de distribución adiposa pueden comenzar a moverse." },
  "timeline.tesamorelin.p4": { en: "Sustained body composition markers may become more apparent.", es: "Los marcadores sostenidos de composición corporal pueden volverse más evidentes." },

  // GHK-Cu
  "timeline.ghkcu.tagline": { en: "Intended to support skin wellness research.", es: "Destinado a apoyar la investigación de bienestar cutáneo." },
  "timeline.ghkcu.p1": { en: "Copper peptide enters circulation and may localize to skin tissue.", es: "El péptido de cobre entra en circulación y puede localizarse en el tejido cutáneo." },
  "timeline.ghkcu.p2": { en: "Skin texture and complexion-support pathways may begin engaging.", es: "Las vías de textura cutánea y apoyo a la tez pueden comenzar a activarse." },
  "timeline.ghkcu.p3": { en: "Collagen-appearance markers may begin trending in cosmetic research.", es: "Los marcadores de apariencia de colágeno pueden comenzar a moverse." },
  "timeline.ghkcu.p4": { en: "Healthy-looking complexion markers may become more apparent.", es: "Los marcadores de tez con aspecto saludable pueden volverse más evidentes." },

  // Selank / Semax
  "timeline.selank.tagline": { en: "Intended to support cognitive wellness research.", es: "Destinado a apoyar la investigación de bienestar cognitivo." },
  "timeline.selank.p1": { en: "Peptides enter circulation and may begin engaging neuro-signaling pathways.", es: "Los péptidos entran en circulación y pueden activar vías de señalización neuronal." },
  "timeline.selank.p2": { en: "Mental clarity and focus markers may show early support.", es: "Los marcadores de claridad mental y enfoque pueden mostrar apoyo temprano." },
  "timeline.selank.p3": { en: "Cognitive comfort markers may begin trending in research settings.", es: "Los marcadores de comodidad cognitiva pueden comenzar a moverse." },
  "timeline.selank.p4": { en: "Sustained cognitive wellness markers may become more apparent.", es: "Los marcadores sostenidos de bienestar cognitivo pueden volverse más evidentes." },

  // Glutathione
  "timeline.glutathione.tagline": { en: "Intended to support oxidative-balance research.", es: "Destinado a apoyar la investigación de equilibrio oxidativo." },
  "timeline.glutathione.p1": { en: "Antioxidant compound enters circulation and may begin distributing.", es: "El compuesto antioxidante entra en circulación y puede comenzar a distribuirse." },
  "timeline.glutathione.p2": { en: "Natural detoxification pathways may receive early support.", es: "Las vías naturales de desintoxicación pueden recibir apoyo temprano." },
  "timeline.glutathione.p3": { en: "Oxidative-balance markers may begin trending in research models.", es: "Los marcadores de equilibrio oxidativo pueden comenzar a moverse." },
  "timeline.glutathione.p4": { en: "Sustained cellular-balance markers may become more apparent.", es: "Los marcadores sostenidos de equilibrio celular pueden volverse más evidentes." },

  // Epithalon
  "timeline.epithalon.tagline": { en: "Intended to support longevity-marker research.", es: "Destinado a apoyar la investigación de marcadores de longevidad." },
  "timeline.epithalon.p1": { en: "Peptide enters circulation and may begin engaging pineal-related pathways.", es: "El péptido entra en circulación y puede activar vías relacionadas con la pineal." },
  "timeline.epithalon.p2": { en: "Circadian-rhythm support pathways may show early activity.", es: "Las vías de apoyo al ritmo circadiano pueden mostrar actividad temprana." },
  "timeline.epithalon.p3": { en: "Healthy-aging markers may begin trending in preclinical models.", es: "Los marcadores de envejecimiento saludable pueden comenzar a moverse." },
  "timeline.epithalon.p4": { en: "Sustained longevity-related markers may become more apparent.", es: "Los marcadores sostenidos relacionados con la longevidad pueden volverse más evidentes." },
  "timeline.aod9604.tagline": { en: "Intended to support metabolic and body-composition research.", es: "Destinado a apoyar la investigación metabólica y de composición corporal." },
  "timeline.aod9604.p1": { en: "Peptide enters circulation and may begin engaging lipolytic-related pathways.", es: "El péptido entra en circulación y puede comenzar a activar vías lipolíticas." },
  "timeline.aod9604.p2": { en: "Metabolic-signaling pathways may show early modulation in research models.", es: "Las vías de señalización metabólica pueden mostrar modulación temprana en modelos de investigación." },
  "timeline.aod9604.p3": { en: "Body-composition markers may begin trending in preclinical models.", es: "Los marcadores de composición corporal pueden comenzar a mostrar tendencias en modelos preclínicos." },
  "timeline.aod9604.p4": { en: "Sustained fat-metabolism markers may become more apparent over continued study.", es: "Los marcadores sostenidos del metabolismo de grasas pueden volverse más evidentes con estudio continuo." },
  "timeline.sermorelin.tagline": { en: "Intended to support growth-hormone-axis and recovery research.", es: "Destinado a apoyar la investigación del eje de hormona de crecimiento y recuperación." },
  "timeline.sermorelin.p1": { en: "Peptide enters circulation and may begin engaging GHRH-receptor pathways.", es: "El péptido entra en circulación y puede comenzar a activar las vías del receptor GHRH." },
  "timeline.sermorelin.p2": { en: "Pulsatile growth-hormone signaling may show early modulation in research models.", es: "La señalización pulsátil de hormona de crecimiento puede mostrar modulación temprana en modelos de investigación." },
  "timeline.sermorelin.p3": { en: "Sleep-quality and recovery markers may begin trending in preclinical studies.", es: "Los marcadores de calidad del sueño y recuperación pueden comenzar a mostrar tendencias en estudios preclínicos." },
  "timeline.sermorelin.p4": { en: "Sustained vitality, lean-mass, and recovery markers may become more apparent.", es: "Los marcadores sostenidos de vitalidad, masa magra y recuperación pueden volverse más evidentes." },
  "timeline.slupp332.tagline": { en: "Intended to support mitochondrial-endurance and metabolic research.", es: "Destinado a apoyar la investigación de resistencia mitocondrial y metabólica." },
  "timeline.slupp332.p1": { en: "Compound enters circulation and may begin engaging ERR-receptor pathways.", es: "El compuesto entra en circulación y puede comenzar a activar las vías del receptor ERR." },
  "timeline.slupp332.p2": { en: "Mitochondrial-biogenesis signaling may show early activity in research models.", es: "La señalización de biogénesis mitocondrial puede mostrar actividad temprana en modelos de investigación." },
  "timeline.slupp332.p3": { en: "Endurance and fat-oxidation markers may begin trending in preclinical studies.", es: "Los marcadores de resistencia y oxidación de grasas pueden comenzar a mostrar tendencias en estudios preclínicos." },
  "timeline.slupp332.p4": { en: "Sustained mitochondrial and metabolic-performance markers may become more apparent.", es: "Los marcadores sostenidos de rendimiento mitocondrial y metabólico pueden volverse más evidentes." },

  "timeline.sma.tagline": { en: "Intended to support cosmetic and skin-research models.", es: "Destinado a apoyar modelos de investigación cosmética y de piel." },
  "timeline.sma.p1": { en: "Peptide is applied and may begin engaging muscle-relaxation signaling at the cellular level.", es: "El péptido se aplica y puede comenzar a activar la señalización de relajación muscular a nivel celular." },
  "timeline.sma.p2": { en: "Local microexpression-pathway markers may show early modulation in research models.", es: "Los marcadores de vías de microexpresión local pueden mostrar modulación temprana en modelos de investigación." },
  "timeline.sma.p3": { en: "Skin-texture and smoothness markers may begin trending in cosmetic-research studies.", es: "Los marcadores de textura y suavidad de la piel pueden comenzar a mostrar tendencias en estudios cosméticos." },
  "timeline.sma.p4": { en: "Sustained skin-smoothing markers may become more apparent over continued study.", es: "Los marcadores sostenidos de suavidad de la piel pueden volverse más evidentes con estudio continuo." },
  "timeline.snap8.tagline": { en: "Intended to support cosmetic and skin-appearance research.", es: "Destinado a apoyar investigación cosmética y de apariencia de la piel." },
  "timeline.snap8.p1": { en: "Peptide is applied and may begin engaging SNARE-complex signaling at the cellular level.", es: "El péptido se aplica y puede comenzar a activar la señalización del complejo SNARE a nivel celular." },
  "timeline.snap8.p2": { en: "Microexpression-related pathways may show early modulation in research models.", es: "Las vías relacionadas con la microexpresión pueden mostrar modulación temprana en modelos de investigación." },
  "timeline.snap8.p3": { en: "Skin-smoothness and fine-line markers may begin trending in cosmetic-research studies.", es: "Los marcadores de suavidad y líneas finas de la piel pueden comenzar a mostrar tendencias en estudios cosméticos." },
  "timeline.snap8.p4": { en: "Sustained skin-appearance markers may become more apparent over continued study.", es: "Los marcadores sostenidos de apariencia de la piel pueden volverse más evidentes con estudio continuo." },
  "timeline.thymalin.tagline": { en: "Intended to support immune-balance and longevity research.", es: "Destinado a apoyar investigación de equilibrio inmune y longevidad." },
  "timeline.thymalin.p1": { en: "Peptide enters circulation and may begin engaging thymic-signaling pathways.", es: "El péptido entra en circulación y puede comenzar a activar vías de señalización tímica." },
  "timeline.thymalin.p2": { en: "T-cell modulation markers may show early activity in research models.", es: "Los marcadores de modulación de células T pueden mostrar actividad temprana en modelos de investigación." },
  "timeline.thymalin.p3": { en: "Immune-balance markers may begin trending in preclinical studies.", es: "Los marcadores de equilibrio inmune pueden comenzar a mostrar tendencias en estudios preclínicos." },
  "timeline.thymalin.p4": { en: "Sustained immune and longevity markers may become more apparent.", es: "Los marcadores sostenidos de inmunidad y longevidad pueden volverse más evidentes." },
  "timeline.tha1.tagline": { en: "Intended to support immune-modulation research.", es: "Destinado a apoyar investigación de modulación inmune." },
  "timeline.tha1.p1": { en: "Peptide enters circulation and may begin engaging Toll-like-receptor signaling.", es: "El péptido entra en circulación y puede comenzar a activar la señalización de receptores tipo Toll." },
  "timeline.tha1.p2": { en: "Innate-immune pathway markers may show early modulation in research models.", es: "Los marcadores de vías inmunes innatas pueden mostrar modulación temprana en modelos de investigación." },
  "timeline.tha1.p3": { en: "Immune-resilience markers may begin trending in preclinical studies.", es: "Los marcadores de resiliencia inmune pueden comenzar a mostrar tendencias en estudios preclínicos." },
  "timeline.tha1.p4": { en: "Sustained immune-modulation markers may become more apparent.", es: "Los marcadores sostenidos de modulación inmune pueden volverse más evidentes." },
  "timeline.teamo.tagline": { en: "Intended to support metabolic, recovery, and body-composition research.", es: "Destinado a apoyar investigación metabólica, de recuperación y de composición corporal." },
  "timeline.teamo.p1": { en: "Blend enters circulation and may begin engaging GHRH, mitochondrial, and lipolytic pathways.", es: "La mezcla entra en circulación y puede comenzar a activar vías GHRH, mitocondriales y lipolíticas." },
  "timeline.teamo.p2": { en: "Combined metabolic and recovery signaling may show early modulation in research models.", es: "La señalización combinada metabólica y de recuperación puede mostrar modulación temprana en modelos de investigación." },
  "timeline.teamo.p3": { en: "Body-composition, energy, and recovery markers may begin trending in preclinical models.", es: "Los marcadores de composición corporal, energía y recuperación pueden comenzar a mostrar tendencias en modelos preclínicos." },
  "timeline.teamo.p4": { en: "Sustained metabolic-performance and body-composition markers may become more apparent.", es: "Los marcadores sostenidos de rendimiento metabólico y composición corporal pueden volverse más evidentes." },
  "timeline.tesa-ipa.tagline": { en: "Intended to support GH-axis, recovery, and body-composition research.", es: "Destinado a apoyar investigación del eje GH, recuperación y composición corporal." },
  "timeline.tesa-ipa.p1": { en: "Blend enters circulation and may begin engaging GHRH and ghrelin-receptor pathways.", es: "La mezcla entra en circulación y puede comenzar a activar vías GHRH y del receptor de ghrelina." },
  "timeline.tesa-ipa.p2": { en: "Pulsatile GH signaling may show early modulation in research models.", es: "La señalización pulsátil de GH puede mostrar modulación temprana en modelos de investigación." },
  "timeline.tesa-ipa.p3": { en: "Recovery and body-composition markers may begin trending in preclinical studies.", es: "Los marcadores de recuperación y composición corporal pueden comenzar a mostrar tendencias en estudios preclínicos." },
  "timeline.tesa-ipa.p4": { en: "Sustained vitality and lean-mass markers may become more apparent.", es: "Los marcadores sostenidos de vitalidad y masa magra pueden volverse más evidentes." },
  "timeline.tha1-thymulin.tagline": { en: "Intended to support immune-balance and thymic-function research.", es: "Destinado a apoyar investigación de equilibrio inmune y función tímica." },
  "timeline.tha1-thymulin.p1": { en: "Blend enters circulation and may begin engaging thymic and innate-immune pathways.", es: "La mezcla entra en circulación y puede comenzar a activar vías tímicas e inmunes innatas." },
  "timeline.tha1-thymulin.p2": { en: "T-cell maturation signaling may show early modulation in research models.", es: "La señalización de maduración de células T puede mostrar modulación temprana en modelos de investigación." },
  "timeline.tha1-thymulin.p3": { en: "Immune-resilience markers may begin trending in preclinical studies.", es: "Los marcadores de resiliencia inmune pueden comenzar a mostrar tendencias en estudios preclínicos." },
  "timeline.tha1-thymulin.p4": { en: "Sustained immune-balance and longevity markers may become more apparent.", es: "Los marcadores sostenidos de equilibrio inmune y longevidad pueden volverse más evidentes." },
  "timeline.tha1-thymulin-kpv.tagline": { en: "Intended to support immune, inflammation-balance, and tissue-research models.", es: "Destinado a apoyar modelos de investigación inmune, equilibrio inflamatorio y tisular." },
  "timeline.tha1-thymulin-kpv.p1": { en: "Blend enters circulation and may begin engaging immune and melanocortin pathways.", es: "La mezcla entra en circulación y puede comenzar a activar vías inmunes y de melanocortina." },
  "timeline.tha1-thymulin-kpv.p2": { en: "Innate-immune and inflammation-balance signaling may show early modulation.", es: "La señalización inmune innata y de equilibrio inflamatorio puede mostrar modulación temprana." },
  "timeline.tha1-thymulin-kpv.p3": { en: "Tissue-comfort and immune-resilience markers may begin trending in preclinical studies.", es: "Los marcadores de comodidad tisular y resiliencia inmune pueden comenzar a mostrar tendencias en estudios preclínicos." },
  "timeline.tha1-thymulin-kpv.p4": { en: "Sustained immune-balance and tissue-research markers may become more apparent.", es: "Los marcadores sostenidos de equilibrio inmune y de tejidos pueden volverse más evidentes." },
  "timeline.trz.tagline": { en: "Intended to support metabolic and body-composition research.", es: "Destinado a apoyar investigación metabólica y de composición corporal." },
  "timeline.trz.p1": { en: "Compound enters circulation and may begin engaging incretin-receptor pathways.", es: "El compuesto entra en circulación y puede comenzar a activar vías del receptor de incretina." },
  "timeline.trz.p2": { en: "Glucose and appetite-signaling pathways may show early modulation in research models.", es: "Las vías de señalización de glucosa y apetito pueden mostrar modulación temprana en modelos de investigación." },
  "timeline.trz.p3": { en: "Body-composition and metabolic markers may begin trending in preclinical studies.", es: "Los marcadores de composición corporal y metabólicos pueden comenzar a mostrar tendencias en estudios preclínicos." },
  "timeline.trz.p4": { en: "Sustained weight-management and metabolic markers may become more apparent.", es: "Los marcadores sostenidos de control de peso y metabólicos pueden volverse más evidentes." },
  "timeline.vip.tagline": { en: "Intended to support neuro-immune and circulatory research.", es: "Destinado a apoyar investigación neuro-inmune y circulatoria." },
  "timeline.vip.p1": { en: "Peptide enters circulation and may begin engaging VPAC-receptor pathways.", es: "El péptido entra en circulación y puede comenzar a activar vías del receptor VPAC." },
  "timeline.vip.p2": { en: "Neuro-immune and vasodilatory signaling may show early activity in research models.", es: "La señalización neuro-inmune y vasodilatadora puede mostrar actividad temprana en modelos de investigación." },
  "timeline.vip.p3": { en: "Circulatory and immune-balance markers may begin trending in preclinical studies.", es: "Los marcadores circulatorios y de equilibrio inmune pueden comenzar a mostrar tendencias en estudios preclínicos." },
  "timeline.vip.p4": { en: "Sustained neuro-immune and circulatory markers may become more apparent.", es: "Los marcadores sostenidos neuro-inmunes y circulatorios pueden volverse más evidentes." },



  // Per-product descriptions (cosmetic/wellness research context - hedged language)
  "product.klow.desc": {
    en: "A research blend intended to support metabolic wellness, energy balance, and tissue maintenance. May help promote vitality in preclinical wellness research.",
    es: "Una mezcla de investigación destinada a apoyar el bienestar metabólico, el equilibrio energético y el mantenimiento de tejidos. Puede ayudar a promover la vitalidad en investigación preclínica de bienestar.",
  },
  "product.motsc.desc": {
    en: "Mitochondrial peptide. May help support cellular energy production and metabolic balance in research settings. Intended for wellness and vitality research.",
    es: "Péptido mitocondrial. Puede ayudar a apoyar la producción de energía celular y el equilibrio metabólico en investigación. Destinado a investigación de bienestar y vitalidad.",
  },
  "product.nad.desc": {
    en: "Coenzyme studied for wellness research. May help support cellular energy pathways and healthy aging markers in laboratory settings.",
    es: "Coenzima estudiada para investigación de bienestar. Puede ayudar a apoyar las vías de energía celular y marcadores de envejecimiento saludable en entornos de laboratorio.",
  },
  "product.tb500.desc": {
    en: "Peptide blend intended for tissue wellness research. May help support recovery, mobility, and overall physical comfort in preclinical models.",
    es: "Mezcla de péptidos destinada a investigación de bienestar tisular. Puede ayudar a apoyar la recuperación, movilidad y comodidad física general en modelos preclínicos.",
  },
  "product.reta.desc": {
    en: "Triple-receptor peptide studied for body composition and metabolic wellness. May help support healthy weight management goals in research contexts.",
    es: "Péptido de triple receptor estudiado para composición corporal y bienestar metabólico. Puede ayudar a apoyar objetivos de gestión de peso saludable en contextos de investigación.",
  },
  "product.ss31.desc": {
    en: "Mitochondria-targeted peptide for cellular wellness research. May help support energy production and oxidative balance under metabolic stress.",
    es: "Péptido dirigido a mitocondrias para investigación de bienestar celular. Puede ayudar a apoyar la producción de energía y el equilibrio oxidativo bajo estrés metabólico.",
  },
  "product.cjc.desc": {
    en: "Peptide blend intended for vitality and recovery research. May help support restful sleep, tissue maintenance, and overall wellness markers.",
    es: "Mezcla de péptidos destinada a investigación de vitalidad y recuperación. Puede ayudar a apoyar el sueño reparador, mantenimiento tisular y marcadores de bienestar general.",
  },
  "product.tesamorelin.desc": {
    en: "Peptide analog studied for body composition wellness. May help support healthy adipose distribution and metabolic balance in research models.",
    es: "Análogo de péptido estudiado para bienestar de composición corporal. Puede ayudar a apoyar la distribución saludable de tejido adiposo y equilibrio metabólico en modelos de investigación.",
  },
  "product.ghkcu.desc": {
    en: "Copper peptide for cosmetic and skin wellness research. May help support collagen appearance, skin texture, and healthy-looking complexion.",
    es: "Péptido de cobre para investigación cosmética y de bienestar cutáneo. Puede ayudar a apoyar la apariencia de colágeno, textura de piel y tez con aspecto saludable.",
  },
  "product.selank.desc": {
    en: "Nootropic peptide blend for cognitive wellness research. May help support mental clarity, focus, and overall cognitive comfort in laboratory studies.",
    es: "Mezcla de péptidos nootrópicos para investigación de bienestar cognitivo. Puede ayudar a apoyar la claridad mental, enfoque y comodidad cognitiva general en estudios de laboratorio.",
  },
  "product.glutathione.desc": {
    en: "Antioxidant compound for wellness research. May help support the body's natural detoxification processes and oxidative balance.",
    es: "Compuesto antioxidante para investigación de bienestar. Puede ayudar a apoyar los procesos naturales de desintoxicación del cuerpo y equilibrio oxidativo.",
  },
  "product.epithalon.desc": {
    en: "Pineal peptide for longevity and wellness research. May help support healthy aging markers and circadian rhythm balance in preclinical studies.",
    es: "Péptido pineal para investigación de longevidad y bienestar. Puede ayudar a apoyar marcadores de envejecimiento saludable y equilibrio del ritmo circadiano en estudios preclínicos.",
  },
  "product.sermorelin.desc": {
    en: "GHRH-analog peptide for vitality and recovery research. May help support natural growth-hormone pulses, restful sleep, and lean-tissue maintenance in preclinical models.",
    es: "Péptido análogo de GHRH para investigación de vitalidad y recuperación. Puede ayudar a apoyar los pulsos naturales de hormona de crecimiento, el sueño reparador y el mantenimiento de tejido magro en modelos preclínicos.",
  },
  "product.slupp332.desc": {
    en: "ERR-agonist compound for mitochondrial-endurance research. May help support exercise-mimetic pathways, fat oxidation, and metabolic performance markers in research models.",
    es: "Compuesto agonista de ERR para investigación de resistencia mitocondrial. Puede ayudar a apoyar vías miméticas del ejercicio, oxidación de grasas y marcadores de rendimiento metabólico en modelos de investigación.",
  },

  // Quality section
  "quality.title": { en: "Quality Assurance", es: "Garantía de Calidad" },
  "quality.subtitle": {
    en: "Every vial meets the highest standards for research-grade peptides.",
    es: "Cada vial cumple con los más altos estándares para péptidos de grado de investigación.",
  },
  "quality.1": { en: "Synthesized in ISO-certified facilities", es: "Sintetizado en instalaciones certificadas ISO" },
  "quality.2": { en: "Third-party HPLC & mass spectrometry verified", es: "Verificado por HPLC y espectrometría de masas por terceros" },
  "quality.3": { en: "Certificate of Analysis included with every order", es: "Certificado de análisis incluido con cada pedido" },
  "quality.4": { en: "Proper cold-chain shipping & storage protocols", es: "Protocolos adecuados de envío y almacenamiento en cadena de frío" },
  "quality.5": { en: "Consistent batch-to-batch quality", es: "Calidad consistente de lote a lote" },
  "quality.6": { en: "Transparent sourcing & documentation", es: "Abastecimiento y documentación transparentes" },

  // Footer
  "footer.research": {
    en: "For research purposes only. Not intended for human or animal consumption. All products are sold as research chemicals only.",
    es: "Solo para fines de investigación. No destinado al consumo humano o animal. Todos los productos se venden únicamente como productos químicos de investigación.",
  },
  "footer.noRefund": { en: "No Refund Policy", es: "Política de No Reembolso" },
  "footer.noRefundText": {
    en: "All sales are final. Due to the nature of research compounds, we do not offer refunds, returns, or exchanges. By completing your purchase, you acknowledge and agree to this policy.",
    es: "Todas las ventas son finales. Debido a la naturaleza de los compuestos de investigación, no ofrecemos reembolsos, devoluciones ni cambios. Al completar su compra, usted reconoce y acepta esta política.",
  },
  "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados." },
  "footer.quickLinks": { en: "Quick Links", es: "Enlaces Rápidos" },
  "footer.shop": { en: "Shop", es: "Tienda" },
  "footer.quality": { en: "Quality", es: "Calidad" },
  "footer.support": { en: "Support", es: "Soporte" },
  "footer.aboutUs": { en: "About Us", es: "Sobre Nosotros" },
  "footer.contactUs": { en: "Contact Us", es: "Contáctenos" },
  "footer.policies": { en: "Policies", es: "Políticas" },
  "footer.tos": { en: "Terms of Service", es: "Términos de Servicio" },
  "footer.privacy": { en: "Privacy Policy", es: "Política de Privacidad" },
  "footer.shippingPolicy": { en: "Shipping Policy", es: "Política de Envío" },
  "footer.refundPolicy": { en: "Refund Policy", es: "Política de Reembolso" },
  "footer.ruoPolicy": { en: "Research Use Only (RUO) Policy", es: "Política de Solo Uso en Investigación (RUO)" },
  "policy.back": { en: "Back to Home", es: "Volver al Inicio" },
  "policy.lastUpdated": { en: "Last Updated", es: "Última Actualización" },
  "tos.title": { en: "Terms of Service", es: "Términos de Servicio" },
  "privacy.title": { en: "Privacy Policy", es: "Política de Privacidad" },
  "shipping.title": { en: "Shipping Policy", es: "Política de Envío" },
  "refund.title": { en: "Refund Policy", es: "Política de Reembolso" },
  "ruo.title": { en: "Research Use Only (RUO) Policy", es: "Política de Solo Uso en Investigación (RUO)" },

  // Access code gate
  "access.title": { en: "Enter Access Code", es: "Ingrese Código de Acceso" },
  "access.subtitle": { en: "This site requires an access code to enter.", es: "Este sitio requiere un código de acceso para ingresar." },
  "access.placeholder": { en: "Access code", es: "Código de acceso" },
  "access.invalid": { en: "Invalid access code. Please try again.", es: "Código de acceso inválido. Intente de nuevo." },
  "access.continue": { en: "Continue", es: "Continuar" },

  // Auth gate
  "auth.welcomeBack": { en: "Welcome Back", es: "Bienvenido de Nuevo" },
  "auth.createAccount": { en: "Create Account", es: "Crear Cuenta" },
  "auth.signInContinue": { en: "Sign in to continue.", es: "Inicie sesión para continuar." },
  "auth.createContinue": { en: "Create an account to access the site.", es: "Cree una cuenta para acceder al sitio." },
  "auth.fullName": { en: "Full Name", es: "Nombre Completo" },
  "auth.email": { en: "Email", es: "Correo Electrónico" },
  "auth.password": { en: "Password", es: "Contraseña" },
  "auth.pleaseWait": { en: "Please wait...", es: "Por favor espere..." },
  "auth.signIn": { en: "Sign In", es: "Iniciar Sesión" },
  "auth.signUp": { en: "Create Account", es: "Crear Cuenta" },
  "auth.noAccount": { en: "Don't have an account? Sign up", es: "¿No tiene cuenta? Regístrese" },
  "auth.hasAccount": { en: "Already have an account? Sign in", es: "¿Ya tiene cuenta? Inicie sesión" },
  "auth.accountCreated": { en: "Account created. Please log in.", es: "Cuenta creada. Por favor inicie sesión." },

  // Waiver
  "waiver.title": { en: "Research Use Only Disclaimer", es: "Descargo de Responsabilidad — Solo para Investigación" },
  "waiver.intro": {
    en: "By purchasing from Napapathpeptides, you acknowledge and agree to the following terms and conditions:",
    es: "Al comprar en Napapathpeptides, usted reconoce y acepta los siguientes términos y condiciones:",
  },
  "waiver.agree": {
    en: "I have read, understood, and agree to the terms above. I confirm that I am purchasing these products for research purposes only and not for human or animal consumption.",
    es: "He leído, entendido y acepto los términos anteriores. Confirmo que estoy comprando estos productos solo para fines de investigación y no para consumo humano o animal.",
  },
  "waiver.accept": { en: "I Agree & Enter", es: "Acepto y Entrar" },
  "waiver.research.title": { en: "Research Use Only", es: "Solo para Investigación" },
  "waiver.research.text": {
    en: "All products sold by Napapathpeptides are strictly intended for laboratory research and development purposes only. These products are not intended for use in humans or animals. They are not drugs, food, dietary supplements, or medical devices.",
    es: "Todos los productos vendidos por Napapathpeptides están estrictamente destinados a fines de investigación y desarrollo en laboratorio. Estos productos no están destinados para uso en humanos o animales. No son medicamentos, alimentos, suplementos dietéticos ni dispositivos médicos.",
  },
  "waiver.noconsumption.title": { en: "No Human Consumption", es: "Sin Consumo Humano" },
  "waiver.noconsumption.text": {
    en: "You expressly represent and warrant that you will not use, ingest, inject, or otherwise administer any of these products to humans or animals. Any such use is a violation of our terms of sale and is strictly prohibited.",
    es: "Usted declara y garantiza expresamente que no usará, ingerirá, inyectará ni administrará de ninguna otra manera estos productos a humanos o animales. Cualquier uso de este tipo constituye una violación de nuestros términos de venta y está estrictamente prohibido.",
  },
  "waiver.professional.title": { en: "Professional Use", es: "Uso Profesional" },
  "waiver.professional.text": {
    en: "Products are intended to be handled only by qualified, trained professionals or researchers in a controlled laboratory environment. You assume full responsibility for the safe handling, storage, and disposal of these products in accordance with all applicable local, state, and federal laws.",
    es: "Los productos están destinados a ser manejados únicamente por profesionales calificados y capacitados o investigadores en un entorno de laboratorio controlado. Usted asume toda la responsabilidad por el manejo seguro, almacenamiento y eliminación de estos productos de acuerdo con todas las leyes locales, estatales y federales aplicables.",
  },
  "waiver.nomedical.title": { en: "No Medical Advice", es: "Sin Asesoría Médica" },
  "waiver.nomedical.text": {
    en: "The information provided on this website is for educational and informational purposes only and does not constitute medical advice, diagnosis, or treatment. Napapathpeptides does not provide guidance on dosage, administration, or efficacy for any human or animal application.",
    es: "La información proporcionada en este sitio web es solo para fines educativos e informativos y no constituye asesoría médica, diagnóstico o tratamiento. Napapathpeptides no proporciona orientación sobre dosificación, administración o eficacia para ninguna aplicación humana o animal.",
  },
  "waiver.indemnification.title": { en: "Indemnification", es: "Indemnización" },
  "waiver.indemnification.text": {
    en: "By purchasing these products, you agree to indemnify and hold harmless Napapathpeptides, its officers, directors, employees, and agents from and against any and all claims, damages, liabilities, and expenses (including legal fees) arising out of or related to your use, misuse, or handling of these products.",
    es: "Al comprar estos productos, usted acepta indemnizar y eximir de responsabilidad a Napapathpeptides, sus funcionarios, directores, empleados y agentes de y contra todas y cada una de las reclamaciones, daños, responsabilidades y gastos (incluidos los honorarios legales) que surjan de o estén relacionados con su uso, mal uso o manejo de estos productos.",
  },
  "waiver.compliance.title": { en: "Compliance", es: "Cumplimiento" },
  "waiver.compliance.text": {
    en: "It is the responsibility of the purchaser to ensure that the purchase, possession, and use of these products are compliant with all applicable laws and regulations in their jurisdiction. Napapathpeptides assumes no liability for any legal issues arising from the purchaser's non-compliance.",
    es: "Es responsabilidad del comprador asegurarse de que la compra, posesión y uso de estos productos cumplan con todas las leyes y regulaciones aplicables en su jurisdicción. Napapathpeptides no asume responsabilidad por cualquier problema legal que surja del incumplimiento del comprador.",
  },

  // Cart
  "cart.title": { en: "Your Cart", es: "Su Carrito" },
  "cart.empty": { en: "Your cart is empty.", es: "Su carrito está vacío." },
  "cart.total": { en: "Total", es: "Total" },
  "cart.requestOrder": { en: "Request Your Order", es: "Solicite Su Pedido" },
  "cart.sendInquiry": { en: "Send Inquiry", es: "Enviar Consulta" },
  "cart.inquirySent": { en: "Inquiry Sent!", es: "¡Consulta Enviada!" },
  "cart.emailOnWay": {
    en: "Your inquiry has been sent! We'll review your request and reach out shortly via email or text.",
    es: "¡Su consulta ha sido enviada! Revisaremos su solicitud y nos comunicaremos pronto por correo o mensaje.",
  },
  "cart.textConfirm": { en: "Text for Instant Confirmation", es: "Mensaje para Confirmación Instantánea" },
  "cart.continueBrowsing": { en: "Continue Browsing", es: "Seguir Navegando" },
  "cart.name": { en: "Full Name", es: "Nombre Completo" },
  "cart.email": { en: "Email", es: "Correo Electrónico" },
  "cart.phone": { en: "Phone Number", es: "Número de Teléfono" },
  "cart.namePlaceholder": { en: "John Doe", es: "Juan Pérez" },
  "cart.emailPlaceholder": { en: "you@example.com", es: "tu@ejemplo.com" },
  "cart.phonePlaceholder": { en: "(555) 123-4567", es: "(555) 123-4567" },
  "cart.fieldRequired": { en: "Please fill in all fields", es: "Por favor complete todos los campos" },

  // Session expired
  "session.expired": { en: "Session Expired", es: "Sesión Expirada" },
  "session.expiredText": {
    en: "Your session has expired after 1 hour of activity. Please sign in again to continue browsing.",
    es: "Su sesión ha expirado después de 1 hora de actividad. Por favor inicie sesión de nuevo para continuar navegando.",
  },
  "session.signInAgain": { en: "Sign In Again", es: "Iniciar Sesión de Nuevo" },

  // Language preference note for inquiry
  "inquiry.langNote.es": {
    en: "[Customer prefers to communicate in Spanish — please respond in Spanish]",
    es: "[El cliente prefiere comunicarse en español — por favor responda en español]",
  },
  "inquiry.langNote.en": {
    en: "[Customer prefers to communicate in English — please respond in English]",
    es: "[Customer prefers to communicate in English — please respond in English]",
  },

  // Product detail section labels
  "details.section.overview": { en: "Overview", es: "Descripción General" },
  "details.section.focus": { en: "Research Focus", es: "Enfoque de Investigación" },
  "details.section.mechanism": { en: "Mechanism Studied", es: "Mecanismo Estudiado" },
  "details.section.benefits": { en: "Areas of Research Interest", es: "Áreas de Interés en Investigación" },
  "details.section.handling": { en: "Handling & Storage", es: "Manejo y Almacenamiento" },

  // ===== Klow =====
  "details.klow.overview": { en: "Klow is a research-grade peptide blend studied for its potential role in supporting metabolic vitality and cellular energy balance pathways in laboratory settings.", es: "Klow es una mezcla de péptidos de grado de investigación estudiada por su posible papel en apoyar la vitalidad metabólica y las vías de equilibrio energético celular en entornos de laboratorio." },
  "details.klow.focus": { en: "Metabolic wellness, cellular energy balance, and longevity-related research.", es: "Bienestar metabólico, equilibrio energético celular e investigación relacionada con longevidad." },
  "details.klow.mechanism": { en: "Studied for its interaction with metabolic-signaling pathways that may help support cellular maintenance and energy regulation.", es: "Estudiado por su interacción con vías de señalización metabólica que pueden ayudar a apoyar el mantenimiento celular y la regulación energética." },
  "details.klow.b1": { en: "May help support metabolic flexibility markers", es: "Puede ayudar a apoyar marcadores de flexibilidad metabólica" },
  "details.klow.b2": { en: "Intended to study cellular energy balance", es: "Destinado a estudiar el equilibrio energético celular" },
  "details.klow.b3": { en: "Helps support vitality-related research models", es: "Ayuda a apoyar modelos de investigación de vitalidad" },
  "details.klow.b4": { en: "May contribute to longevity pathway studies", es: "Puede contribuir a estudios de vías de longevidad" },
  "details.klow.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate at 2–8°C and use within 30 days. Protect from light.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar a 2–8°C y usar dentro de 30 días. Proteger de la luz." },

  // ===== Mots-C =====
  "details.motsc.overview": { en: "Mots-C is a mitochondrial-derived peptide studied in research settings for its potential role in supporting mitochondrial regulation and metabolic efficiency.", es: "Mots-C es un péptido derivado mitocondrial estudiado en entornos de investigación por su posible papel en apoyar la regulación mitocondrial y la eficiencia metabólica." },
  "details.motsc.focus": { en: "Mitochondrial wellness, metabolic efficiency, and exercise-physiology research.", es: "Bienestar mitocondrial, eficiencia metabólica e investigación de fisiología del ejercicio." },
  "details.motsc.mechanism": { en: "Investigated for engagement with mitochondrial signaling pathways that may help support cellular energy regulation.", es: "Investigado por su interacción con vías de señalización mitocondrial que pueden ayudar a apoyar la regulación de energía celular." },
  "details.motsc.b1": { en: "May help support mitochondrial efficiency markers", es: "Puede ayudar a apoyar marcadores de eficiencia mitocondrial" },
  "details.motsc.b2": { en: "Intended to study metabolic flexibility", es: "Destinado a estudiar la flexibilidad metabólica" },
  "details.motsc.b3": { en: "Helps support cellular energy balance research", es: "Ayuda a apoyar la investigación de equilibrio energético celular" },
  "details.motsc.b4": { en: "May contribute to healthy-aging pathway models", es: "Puede contribuir a modelos de vías de envejecimiento saludable" },
  "details.motsc.handling": { en: "Store lyophilized vials at -20°C. Reconstitute with bacteriostatic water; refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Reconstituir con agua bacteriostática; refrigerar y usar dentro de 30 días." },

  // ===== NAD+ =====
  "details.nad.overview": { en: "NAD+ is a coenzyme studied for its central role in cellular energy production and a wide range of healthy-aging research models.", es: "NAD+ es una coenzima estudiada por su papel central en la producción de energía celular y una amplia gama de modelos de investigación de envejecimiento saludable." },
  "details.nad.focus": { en: "Cellular energy, healthy-aging, and metabolic-resilience research.", es: "Energía celular, envejecimiento saludable e investigación de resiliencia metabólica." },
  "details.nad.mechanism": { en: "Studied as a substrate in pathways that may help support cellular energy production and DNA-maintenance models.", es: "Estudiado como sustrato en vías que pueden ayudar a apoyar la producción de energía celular y modelos de mantenimiento del ADN." },
  "details.nad.b1": { en: "May help support cellular energy markers", es: "Puede ayudar a apoyar marcadores de energía celular" },
  "details.nad.b2": { en: "Intended to study healthy-aging pathways", es: "Destinado a estudiar vías de envejecimiento saludable" },
  "details.nad.b3": { en: "Helps support vitality and resilience models", es: "Ayuda a apoyar modelos de vitalidad y resiliencia" },
  "details.nad.b4": { en: "May contribute to mitochondrial-function research", es: "Puede contribuir a la investigación de función mitocondrial" },
  "details.nad.handling": { en: "Refrigerate at 2–8°C. Protect from light. Use promptly after opening.", es: "Refrigerar a 2–8°C. Proteger de la luz. Usar prontamente tras abrir." },

  // ===== TB500 / BPC-157 =====
  "details.tb500.overview": { en: "A research blend of TB-500 and BPC-157 studied for its potential role in supporting tissue wellness and recovery-related research models.", es: "Una mezcla de investigación de TB-500 y BPC-157 estudiada por su posible papel en apoyar el bienestar tisular y modelos de investigación relacionados con la recuperación." },
  "details.tb500.focus": { en: "Tissue wellness, mobility comfort, and recovery-pathway research.", es: "Bienestar tisular, comodidad de movilidad e investigación de vías de recuperación." },
  "details.tb500.mechanism": { en: "Investigated for engagement with tissue-maintenance and circulation-support pathways in research models.", es: "Investigado por su interacción con vías de mantenimiento tisular y apoyo circulatorio en modelos de investigación." },
  "details.tb500.b1": { en: "May help support tissue maintenance markers", es: "Puede ayudar a apoyar marcadores de mantenimiento tisular" },
  "details.tb500.b2": { en: "Intended to study recovery comfort pathways", es: "Destinado a estudiar vías de comodidad de recuperación" },
  "details.tb500.b3": { en: "Helps support mobility-related research", es: "Ayuda a apoyar la investigación relacionada con la movilidad" },
  "details.tb500.b4": { en: "May contribute to circulation-support models", es: "Puede contribuir a modelos de apoyo circulatorio" },
  "details.tb500.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  // ===== Reta =====
  "details.reta.overview": { en: "Reta is a research peptide studied for its potential role in supporting metabolic balance and body-composition research models.", es: "Reta es un péptido de investigación estudiado por su posible papel en apoyar el equilibrio metabólico y modelos de investigación de composición corporal." },
  "details.reta.focus": { en: "Metabolic balance, satiety signaling, and body-composition research.", es: "Equilibrio metabólico, señalización de saciedad e investigación de composición corporal." },
  "details.reta.mechanism": { en: "Studied for engagement with multi-receptor metabolic-signaling pathways that may help support appetite-regulation models.", es: "Estudiado por su interacción con vías de señalización metabólica multi-receptor que pueden ayudar a apoyar modelos de regulación del apetito." },
  "details.reta.b1": { en: "May help support satiety-pathway markers", es: "Puede ayudar a apoyar marcadores de la vía de saciedad" },
  "details.reta.b2": { en: "Intended to study body-composition trends", es: "Destinado a estudiar tendencias de composición corporal" },
  "details.reta.b3": { en: "Helps support metabolic-balance research", es: "Ayuda a apoyar la investigación de equilibrio metabólico" },
  "details.reta.b4": { en: "May contribute to glycemic-wellness models", es: "Puede contribuir a modelos de bienestar glicémico" },
  "details.reta.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate at 2–8°C and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar a 2–8°C y usar dentro de 30 días." },

  // ===== SS-31 =====
  "details.ss31.overview": { en: "SS-31 is a mitochondria-targeted research peptide studied for its potential role in supporting mitochondrial wellness and oxidative-balance models.", es: "SS-31 es un péptido de investigación dirigido a mitocondrias estudiado por su posible papel en apoyar el bienestar mitocondrial y modelos de equilibrio oxidativo." },
  "details.ss31.focus": { en: "Mitochondrial wellness, oxidative balance, and cellular-resilience research.", es: "Bienestar mitocondrial, equilibrio oxidativo e investigación de resiliencia celular." },
  "details.ss31.mechanism": { en: "Investigated for localization to mitochondrial inner membranes and engagement with cardiolipin-related pathways.", es: "Investigado por su localización en las membranas internas mitocondriales y su interacción con vías relacionadas con cardiolipina." },
  "details.ss31.b1": { en: "May help support mitochondrial-membrane markers", es: "Puede ayudar a apoyar marcadores de membrana mitocondrial" },
  "details.ss31.b2": { en: "Intended to study oxidative-balance pathways", es: "Destinado a estudiar vías de equilibrio oxidativo" },
  "details.ss31.b3": { en: "Helps support cellular-resilience research", es: "Ayuda a apoyar la investigación de resiliencia celular" },
  "details.ss31.b4": { en: "May contribute to energy-efficiency models", es: "Puede contribuir a modelos de eficiencia energética" },
  "details.ss31.handling": { en: "Store lyophilized vials at -20°C. Reconstitute and refrigerate; use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Reconstituir y refrigerar; usar dentro de 30 días." },

  // ===== CJC-1295 / Ipamorelin =====
  "details.cjc.overview": { en: "A research blend of CJC-1295 and Ipamorelin studied for its potential role in supporting recovery and overnight vitality pathways.", es: "Una mezcla de investigación de CJC-1295 e Ipamorelin estudiada por su posible papel en apoyar las vías de recuperación y vitalidad nocturna." },
  "details.cjc.focus": { en: "Recovery, restful-sleep pathways, and vitality research.", es: "Recuperación, vías de sueño reparador e investigación de vitalidad." },
  "details.cjc.mechanism": { en: "Studied for pulsatile engagement with growth-hormone-releasing pathways in research models.", es: "Estudiado por su activación pulsátil con vías de liberación de hormona de crecimiento en modelos de investigación." },
  "details.cjc.b1": { en: "May help support overnight recovery markers", es: "Puede ayudar a apoyar marcadores de recuperación nocturna" },
  "details.cjc.b2": { en: "Intended to study restful-sleep pathways", es: "Destinado a estudiar vías de sueño reparador" },
  "details.cjc.b3": { en: "Helps support tissue maintenance research", es: "Ayuda a apoyar la investigación de mantenimiento tisular" },
  "details.cjc.b4": { en: "May contribute to vitality-pathway models", es: "Puede contribuir a modelos de vías de vitalidad" },
  "details.cjc.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  // ===== Tesamorelin =====
  "details.tesamorelin.overview": { en: "Tesamorelin is a research peptide studied for its potential role in supporting body-composition and metabolic-signaling research.", es: "Tesamorelin es un péptido de investigación estudiado por su posible papel en apoyar la investigación de composición corporal y señalización metabólica." },
  "details.tesamorelin.focus": { en: "Body composition, adipose distribution, and metabolic-signaling research.", es: "Composición corporal, distribución adiposa e investigación de señalización metabólica." },
  "details.tesamorelin.mechanism": { en: "Investigated as a stabilized GHRH analog engaging metabolic-signaling pathways in research models.", es: "Investigado como un análogo estabilizado de GHRH que activa vías de señalización metabólica en modelos de investigación." },
  "details.tesamorelin.b1": { en: "May help support adipose-distribution markers", es: "Puede ayudar a apoyar marcadores de distribución adiposa" },
  "details.tesamorelin.b2": { en: "Intended to study lean-mass research models", es: "Destinado a estudiar modelos de investigación de masa magra" },
  "details.tesamorelin.b3": { en: "Helps support metabolic-signaling research", es: "Ayuda a apoyar la investigación de señalización metabólica" },
  "details.tesamorelin.b4": { en: "May contribute to vitality-pathway studies", es: "Puede contribuir a estudios de vías de vitalidad" },
  "details.tesamorelin.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  // ===== GHK-Cu =====
  "details.ghkcu.overview": { en: "GHK-Cu is a copper-tripeptide studied in cosmetic and skin-wellness research for its potential role in supporting complexion-related pathways.", es: "GHK-Cu es un tripéptido de cobre estudiado en investigación cosmética y de bienestar cutáneo por su posible papel en apoyar vías relacionadas con la tez." },
  "details.ghkcu.focus": { en: "Cosmetic skin wellness, complexion appearance, and collagen-appearance research.", es: "Bienestar cutáneo cosmético, apariencia de la tez e investigación de apariencia de colágeno." },
  "details.ghkcu.mechanism": { en: "Studied for copper-binding activity that may help support skin-matrix research models.", es: "Estudiado por su actividad de unión al cobre que puede ayudar a apoyar modelos de investigación de matriz cutánea." },
  "details.ghkcu.b1": { en: "May help support skin-texture markers", es: "Puede ayudar a apoyar marcadores de textura cutánea" },
  "details.ghkcu.b2": { en: "Intended to study collagen-appearance pathways", es: "Destinado a estudiar vías de apariencia de colágeno" },
  "details.ghkcu.b3": { en: "Helps support cosmetic complexion research", es: "Ayuda a apoyar la investigación cosmética de la tez" },
  "details.ghkcu.b4": { en: "May contribute to scalp-wellness models", es: "Puede contribuir a modelos de bienestar del cuero cabelludo" },
  "details.ghkcu.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and protect from light.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y proteger de la luz." },

  // ===== Selank / Semax =====
  "details.selank.overview": { en: "A research blend of Selank and Semax studied for its potential role in supporting cognitive comfort and focus-related research models.", es: "Una mezcla de investigación de Selank y Semax estudiada por su posible papel en apoyar la comodidad cognitiva y modelos de investigación relacionados con el enfoque." },
  "details.selank.focus": { en: "Cognitive wellness, mental clarity, and focus-pathway research.", es: "Bienestar cognitivo, claridad mental e investigación de vías de enfoque." },
  "details.selank.mechanism": { en: "Investigated for engagement with neuro-signaling pathways that may help support cognitive-comfort models.", es: "Investigado por su interacción con vías de señalización neuronal que pueden ayudar a apoyar modelos de comodidad cognitiva." },
  "details.selank.b1": { en: "May help support mental-clarity markers", es: "Puede ayudar a apoyar marcadores de claridad mental" },
  "details.selank.b2": { en: "Intended to study focus-pathway research", es: "Destinado a estudiar la investigación de vías de enfoque" },
  "details.selank.b3": { en: "Helps support cognitive-comfort models", es: "Ayuda a apoyar modelos de comodidad cognitiva" },
  "details.selank.b4": { en: "May contribute to neuro-wellness research", es: "Puede contribuir a la investigación de bienestar neuronal" },
  "details.selank.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  // ===== Glutathione =====
  "details.glutathione.overview": { en: "Glutathione is a tripeptide antioxidant studied in research models for its potential role in supporting oxidative-balance pathways.", es: "El glutatión es un tripéptido antioxidante estudiado en modelos de investigación por su posible papel en apoyar las vías de equilibrio oxidativo." },
  "details.glutathione.focus": { en: "Oxidative balance, detoxification-pathway research, and skin-wellness studies.", es: "Equilibrio oxidativo, investigación de vías de desintoxicación y estudios de bienestar cutáneo." },
  "details.glutathione.mechanism": { en: "Studied as a thiol-based antioxidant that may help support oxidative-balance research models.", es: "Estudiado como antioxidante basado en tiol que puede ayudar a apoyar modelos de investigación de equilibrio oxidativo." },
  "details.glutathione.b1": { en: "May help support oxidative-balance markers", es: "Puede ayudar a apoyar marcadores de equilibrio oxidativo" },
  "details.glutathione.b2": { en: "Intended to study detoxification pathways", es: "Destinado a estudiar las vías de desintoxicación" },
  "details.glutathione.b3": { en: "Helps support cosmetic skin-wellness research", es: "Ayuda a apoyar la investigación cosmética de bienestar cutáneo" },
  "details.glutathione.b4": { en: "May contribute to cellular-resilience models", es: "Puede contribuir a modelos de resiliencia celular" },
  "details.glutathione.handling": { en: "Refrigerate at 2–8°C. Protect from light and use promptly after opening.", es: "Refrigerar a 2–8°C. Proteger de la luz y usar prontamente tras abrir." },

  // ===== Epithalon =====
  "details.epithalon.overview": { en: "Epithalon is a research tetrapeptide studied for its potential role in supporting telomere-related and healthy-aging research models.", es: "Epithalon es un tetrapéptido de investigación estudiado por su posible papel en apoyar modelos de investigación relacionados con telómeros y envejecimiento saludable." },
  "details.epithalon.focus": { en: "Healthy-aging, circadian-pathway, and longevity research.", es: "Envejecimiento saludable, vías circadianas e investigación de longevidad." },
  "details.epithalon.mechanism": { en: "Investigated for engagement with telomerase-related and pineal-signaling pathways in research models.", es: "Investigado por su interacción con vías relacionadas con telomerasa y señalización pineal en modelos de investigación." },
  "details.epithalon.b1": { en: "May help support longevity-pathway markers", es: "Puede ayudar a apoyar marcadores de vías de longevidad" },
  "details.epithalon.b2": { en: "Intended to study circadian-rhythm research", es: "Destinado a estudiar la investigación del ritmo circadiano" },
  "details.epithalon.b3": { en: "Helps support healthy-aging models", es: "Ayuda a apoyar modelos de envejecimiento saludable" },
  "details.epithalon.b4": { en: "May contribute to cellular-resilience studies", es: "Puede contribuir a estudios de resiliencia celular" },
  "details.epithalon.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },
  "details.aod9604.overview": { en: "AOD-9604 is a modified fragment of growth hormone studied for its potential role in fat-metabolism and body-composition research.", es: "AOD-9604 es un fragmento modificado de la hormona de crecimiento estudiado por su posible papel en la investigación del metabolismo de grasas y la composición corporal." },
  "details.aod9604.focus": { en: "Fat-metabolism, body-composition, and metabolic-pathway research.", es: "Metabolismo de grasas, composición corporal e investigación de vías metabólicas." },
  "details.aod9604.mechanism": { en: "Investigated for engagement with lipolytic signaling and fat-oxidation pathways in research models.", es: "Investigado por su interacción con señalización lipolítica y vías de oxidación de grasas en modelos de investigación." },
  "details.aod9604.b1": { en: "May help support fat-metabolism pathway markers", es: "Puede ayudar a apoyar marcadores de vías del metabolismo de grasas" },
  "details.aod9604.b2": { en: "Intended to study body-composition research models", es: "Destinado a estudiar modelos de investigación de composición corporal" },
  "details.aod9604.b3": { en: "Helps support metabolic-signaling studies", es: "Ayuda a apoyar estudios de señalización metabólica" },
  "details.aod9604.b4": { en: "May contribute to weight-management pathway research", es: "Puede contribuir a la investigación de vías de control de peso" },
  "details.aod9604.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },
  "details.sermorelin.overview": { en: "Sermorelin is a research peptide analog of GHRH studied for its potential role in supporting endogenous growth-hormone-axis and recovery research models.", es: "Sermorelin es un péptido de investigación análogo de GHRH estudiado por su posible papel en el apoyo a modelos de investigación del eje endógeno de hormona de crecimiento y recuperación." },
  "details.sermorelin.focus": { en: "Growth-hormone-axis, recovery, sleep-quality, and vitality research.", es: "Eje de hormona de crecimiento, recuperación, calidad del sueño e investigación de vitalidad." },
  "details.sermorelin.mechanism": { en: "Investigated for engagement with GHRH-receptor signaling and pulsatile growth-hormone release in research models.", es: "Investigado por su interacción con la señalización del receptor GHRH y la liberación pulsátil de hormona de crecimiento en modelos de investigación." },
  "details.sermorelin.b1": { en: "May help support growth-hormone-axis markers", es: "Puede ayudar a apoyar marcadores del eje de hormona de crecimiento" },
  "details.sermorelin.b2": { en: "Intended to study sleep-quality and recovery research", es: "Destinado a estudiar investigación de calidad del sueño y recuperación" },
  "details.sermorelin.b3": { en: "Helps support lean-tissue maintenance studies", es: "Ayuda a apoyar estudios de mantenimiento de tejido magro" },
  "details.sermorelin.b4": { en: "May contribute to vitality and wellness pathway research", es: "Puede contribuir a la investigación de vías de vitalidad y bienestar" },
  "details.sermorelin.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },
  "details.slupp332.overview": { en: "SLU-PP-332 is a research compound studied as an ERR (estrogen-related receptor) agonist for its potential role in mitochondrial-endurance and exercise-mimetic research.", es: "SLU-PP-332 es un compuesto de investigación estudiado como agonista de ERR (receptor relacionado con estrógeno) por su posible papel en investigación de resistencia mitocondrial y mimética del ejercicio." },
  "details.slupp332.focus": { en: "Mitochondrial-biogenesis, endurance, fat-oxidation, and exercise-mimetic research.", es: "Biogénesis mitocondrial, resistencia, oxidación de grasas e investigación mimética del ejercicio." },
  "details.slupp332.mechanism": { en: "Investigated for engagement with ERR-alpha signaling and mitochondrial-biogenesis pathways in research models.", es: "Investigado por su interacción con la señalización de ERR-alfa y las vías de biogénesis mitocondrial en modelos de investigación." },
  "details.slupp332.b1": { en: "May help support mitochondrial-biogenesis markers", es: "Puede ayudar a apoyar marcadores de biogénesis mitocondrial" },
  "details.slupp332.b2": { en: "Intended to study endurance and exercise-mimetic research", es: "Destinado a estudiar investigación de resistencia y mimética del ejercicio" },
  "details.slupp332.b3": { en: "Helps support fat-oxidation pathway studies", es: "Ayuda a apoyar estudios de vías de oxidación de grasas" },
  "details.slupp332.b4": { en: "May contribute to metabolic-performance research", es: "Puede contribuir a la investigación de rendimiento metabólico" },
  "details.slupp332.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.sma.overview": { en: "SMA (Syn-Ake / SNAP-like Mimetic) is a research peptide studied for its potential role in cosmetic muscle-relaxation pathway research.", es: "SMA es un péptido de investigación estudiado por su posible papel en la investigación de vías cosméticas de relajación muscular." },
  "details.sma.focus": { en: "Cosmetic skin-research, microexpression-pathway, and topical-formulation research.", es: "Investigación cosmética cutánea, vías de microexpresión y formulación tópica." },
  "details.sma.mechanism": { en: "Investigated for engagement with postsynaptic muscle-relaxation pathways in cosmetic research models.", es: "Investigado por su interacción con vías postsinápticas de relajación muscular en modelos cosméticos." },
  "details.sma.b1": { en: "May help support skin-smoothness research markers", es: "Puede ayudar a apoyar marcadores de suavidad cutánea" },
  "details.sma.b2": { en: "Intended for topical cosmetic research models", es: "Destinado a modelos cosméticos tópicos" },
  "details.sma.b3": { en: "Helps support fine-line-appearance studies", es: "Ayuda a apoyar estudios de apariencia de líneas finas" },
  "details.sma.b4": { en: "May contribute to skin-texture research", es: "Puede contribuir a la investigación de textura de la piel" },
  "details.sma.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.snap8.overview": { en: "SNAP-8 is a research peptide studied for its potential role in cosmetic microexpression-pathway and skin-appearance research.", es: "SNAP-8 es un péptido de investigación estudiado por su posible papel en investigación cosmética de vías de microexpresión y apariencia de la piel." },
  "details.snap8.focus": { en: "Cosmetic skin-research, SNARE-complex pathway, and topical-formulation research.", es: "Investigación cosmética cutánea, vías del complejo SNARE y formulación tópica." },
  "details.snap8.mechanism": { en: "Investigated for engagement with SNARE-complex signaling in cosmetic research models.", es: "Investigado por su interacción con la señalización del complejo SNARE en modelos cosméticos." },
  "details.snap8.b1": { en: "May help support skin-smoothness research markers", es: "Puede ayudar a apoyar marcadores de suavidad cutánea" },
  "details.snap8.b2": { en: "Intended for topical cosmetic research models", es: "Destinado a modelos cosméticos tópicos" },
  "details.snap8.b3": { en: "Helps support fine-line-appearance studies", es: "Ayuda a apoyar estudios de apariencia de líneas finas" },
  "details.snap8.b4": { en: "May contribute to skin-texture research", es: "Puede contribuir a la investigación de textura de la piel" },
  "details.snap8.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.thymalin.overview": { en: "Thymalin is a thymic-derived research peptide studied for its potential role in immune-balance and longevity research.", es: "Thymalin es un péptido de investigación derivado del timo estudiado por su posible papel en investigación de equilibrio inmune y longevidad." },
  "details.thymalin.focus": { en: "Immune-balance, thymic-function, and longevity research.", es: "Equilibrio inmune, función tímica e investigación de longevidad." },
  "details.thymalin.mechanism": { en: "Investigated for engagement with thymic-signaling and T-cell modulation pathways.", es: "Investigado por su interacción con señalización tímica y vías de modulación de células T." },
  "details.thymalin.b1": { en: "May help support immune-balance markers", es: "Puede ayudar a apoyar marcadores de equilibrio inmune" },
  "details.thymalin.b2": { en: "Intended to study thymic-function research models", es: "Destinado a estudiar modelos de función tímica" },
  "details.thymalin.b3": { en: "Helps support healthy-aging studies", es: "Ayuda a apoyar estudios de envejecimiento saludable" },
  "details.thymalin.b4": { en: "May contribute to immune-resilience research", es: "Puede contribuir a la investigación de resiliencia inmune" },
  "details.thymalin.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.tha1.overview": { en: "Thymosin Alpha-1 is a research peptide studied for its potential role in immune-modulation and innate-immune-pathway research.", es: "Thymosin Alpha-1 es un péptido de investigación estudiado por su posible papel en modulación inmune y vías inmunes innatas." },
  "details.tha1.focus": { en: "Immune-modulation, Toll-like-receptor pathway, and innate-immune research.", es: "Modulación inmune, vía de receptores tipo Toll e investigación inmune innata." },
  "details.tha1.mechanism": { en: "Investigated for engagement with TLR signaling and immune-cell maturation pathways.", es: "Investigado por su interacción con señalización TLR y vías de maduración de células inmunes." },
  "details.tha1.b1": { en: "May help support immune-modulation markers", es: "Puede ayudar a apoyar marcadores de modulación inmune" },
  "details.tha1.b2": { en: "Intended to study innate-immune research models", es: "Destinado a estudiar modelos inmunes innatos" },
  "details.tha1.b3": { en: "Helps support immune-resilience studies", es: "Ayuda a apoyar estudios de resiliencia inmune" },
  "details.tha1.b4": { en: "May contribute to immune-balance research", es: "Puede contribuir a la investigación de equilibrio inmune" },
  "details.tha1.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.teamo.overview": { en: "TEAMO is a research blend of Tesamorelin, MOTS-C, and AOD-9604 studied for its potential role in metabolic, recovery, and body-composition research.", es: "TEAMO es una mezcla de investigación de Tesamorelin, MOTS-C y AOD-9604 estudiada por su posible papel en investigación metabólica, de recuperación y de composición corporal." },
  "details.teamo.focus": { en: "Metabolic, mitochondrial, recovery, and body-composition research.", es: "Investigación metabólica, mitocondrial, de recuperación y de composición corporal." },
  "details.teamo.mechanism": { en: "Investigated for combined engagement with GHRH, mitochondrial, and lipolytic-signaling pathways.", es: "Investigado por su interacción combinada con vías GHRH, mitocondriales y de señalización lipolítica." },
  "details.teamo.b1": { en: "May help support metabolic-performance markers", es: "Puede ayudar a apoyar marcadores de rendimiento metabólico" },
  "details.teamo.b2": { en: "Intended to study body-composition research models", es: "Destinado a estudiar modelos de composición corporal" },
  "details.teamo.b3": { en: "Helps support recovery and vitality studies", es: "Ayuda a apoyar estudios de recuperación y vitalidad" },
  "details.teamo.b4": { en: "May contribute to fat-metabolism pathway research", es: "Puede contribuir a la investigación de vías del metabolismo de grasas" },
  "details.teamo.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.tesa-ipa.overview": { en: "Tesamorelin / Ipamorelin is a research peptide blend studied for its potential role in growth-hormone-axis, recovery, and body-composition research.", es: "Tesamorelin / Ipamorelin es una mezcla de péptidos de investigación estudiada por su posible papel en investigación del eje de hormona de crecimiento, recuperación y composición corporal." },
  "details.tesa-ipa.focus": { en: "GH-axis, recovery, sleep-quality, and body-composition research.", es: "Eje GH, recuperación, calidad del sueño e investigación de composición corporal." },
  "details.tesa-ipa.mechanism": { en: "Investigated for combined engagement with GHRH and ghrelin-receptor signaling pathways.", es: "Investigado por su interacción combinada con vías de señalización GHRH y del receptor de ghrelina." },
  "details.tesa-ipa.b1": { en: "May help support growth-hormone-axis markers", es: "Puede ayudar a apoyar marcadores del eje de hormona de crecimiento" },
  "details.tesa-ipa.b2": { en: "Intended to study recovery and sleep-quality research", es: "Destinado a estudiar investigación de recuperación y calidad del sueño" },
  "details.tesa-ipa.b3": { en: "Helps support lean-tissue maintenance studies", es: "Ayuda a apoyar estudios de mantenimiento de tejido magro" },
  "details.tesa-ipa.b4": { en: "May contribute to vitality and wellness pathway research", es: "Puede contribuir a la investigación de vías de vitalidad y bienestar" },
  "details.tesa-ipa.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.tha1-thymulin.overview": { en: "Thymosin Alpha-1 / Thymulin is a research blend studied for its potential role in immune-balance and thymic-function research.", es: "Thymosin Alpha-1 / Thymulin es una mezcla de investigación estudiada por su posible papel en investigación de equilibrio inmune y función tímica." },
  "details.tha1-thymulin.focus": { en: "Immune-modulation, thymic-function, and longevity research.", es: "Modulación inmune, función tímica e investigación de longevidad." },
  "details.tha1-thymulin.mechanism": { en: "Investigated for combined engagement with thymic and innate-immune signaling pathways.", es: "Investigado por su interacción combinada con vías de señalización tímica e inmune innata." },
  "details.tha1-thymulin.b1": { en: "May help support immune-balance markers", es: "Puede ayudar a apoyar marcadores de equilibrio inmune" },
  "details.tha1-thymulin.b2": { en: "Intended to study thymic-function research models", es: "Destinado a estudiar modelos de función tímica" },
  "details.tha1-thymulin.b3": { en: "Helps support immune-resilience studies", es: "Ayuda a apoyar estudios de resiliencia inmune" },
  "details.tha1-thymulin.b4": { en: "May contribute to longevity pathway research", es: "Puede contribuir a la investigación de vías de longevidad" },
  "details.tha1-thymulin.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.tha1-thymulin-kpv.overview": { en: "Thymosin Alpha-1 / Thymulin / KPV is a research blend studied for its potential role in immune, inflammation-balance, and tissue-research models.", es: "Thymosin Alpha-1 / Thymulin / KPV es una mezcla de investigación estudiada por su posible papel en modelos inmunes, de equilibrio inflamatorio y tisulares." },
  "details.tha1-thymulin-kpv.focus": { en: "Immune-modulation, inflammation-balance, and tissue-comfort research.", es: "Modulación inmune, equilibrio inflamatorio e investigación de comodidad tisular." },
  "details.tha1-thymulin-kpv.mechanism": { en: "Investigated for combined engagement with immune-signaling and melanocortin pathways.", es: "Investigado por su interacción combinada con vías de señalización inmune y melanocortina." },
  "details.tha1-thymulin-kpv.b1": { en: "May help support immune-balance markers", es: "Puede ayudar a apoyar marcadores de equilibrio inmune" },
  "details.tha1-thymulin-kpv.b2": { en: "Intended to study inflammation-balance research models", es: "Destinado a estudiar modelos de equilibrio inflamatorio" },
  "details.tha1-thymulin-kpv.b3": { en: "Helps support tissue-comfort studies", es: "Ayuda a apoyar estudios de comodidad tisular" },
  "details.tha1-thymulin-kpv.b4": { en: "May contribute to immune-resilience research", es: "Puede contribuir a la investigación de resiliencia inmune" },
  "details.tha1-thymulin-kpv.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.trz.overview": { en: "TRZ is a research compound studied as a multi-receptor agonist for its potential role in metabolic and body-composition research.", es: "TRZ es un compuesto de investigación estudiado como agonista multi-receptor por su posible papel en investigación metabólica y de composición corporal." },
  "details.trz.focus": { en: "Metabolic, glucose-signaling, appetite-pathway, and body-composition research.", es: "Investigación metabólica, de señalización de glucosa, vías del apetito y composición corporal." },
  "details.trz.mechanism": { en: "Investigated for engagement with incretin-receptor signaling in metabolic-research models.", es: "Investigado por su interacción con la señalización del receptor de incretina en modelos metabólicos." },
  "details.trz.b1": { en: "May help support metabolic-pathway markers", es: "Puede ayudar a apoyar marcadores de vías metabólicas" },
  "details.trz.b2": { en: "Intended to study body-composition research models", es: "Destinado a estudiar modelos de composición corporal" },
  "details.trz.b3": { en: "Helps support glucose-signaling studies", es: "Ayuda a apoyar estudios de señalización de glucosa" },
  "details.trz.b4": { en: "May contribute to weight-management pathway research", es: "Puede contribuir a la investigación de vías de control de peso" },
  "details.trz.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },

  "details.vip.overview": { en: "VIP (Vasoactive Intestinal Peptide) is a research peptide studied for its potential role in neuro-immune and circulatory research.", es: "VIP (Péptido Intestinal Vasoactivo) es un péptido de investigación estudiado por su posible papel en investigación neuro-inmune y circulatoria." },
  "details.vip.focus": { en: "Neuro-immune, circulatory, and inflammation-balance research.", es: "Investigación neuro-inmune, circulatoria y de equilibrio inflamatorio." },
  "details.vip.mechanism": { en: "Investigated for engagement with VPAC-receptor signaling in research models.", es: "Investigado por su interacción con la señalización del receptor VPAC en modelos de investigación." },
  "details.vip.b1": { en: "May help support neuro-immune balance markers", es: "Puede ayudar a apoyar marcadores de equilibrio neuro-inmune" },
  "details.vip.b2": { en: "Intended to study circulatory research models", es: "Destinado a estudiar modelos circulatorios" },
  "details.vip.b3": { en: "Helps support inflammation-balance studies", es: "Ayuda a apoyar estudios de equilibrio inflamatorio" },
  "details.vip.b4": { en: "May contribute to vasodilatory pathway research", es: "Puede contribuir a la investigación de vías vasodilatadoras" },
  "details.vip.handling": { en: "Store lyophilized vials at -20°C. After reconstitution, refrigerate and use within 30 days.", es: "Almacenar viales liofilizados a -20°C. Tras la reconstitución, refrigerar y usar dentro de 30 días." },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("npp_lang") as Lang) || "en";
  });

  const setLang = async (l: Lang) => {
    setLangState(l);
    localStorage.setItem("npp_lang", l);
    // Save to profile if logged in
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({ preferred_language: l } as any).eq("user_id", user.id);
      }
    } catch {}
  };

  // On auth state change, load saved preference
  useEffect(() => {
    const loadPref = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("preferred_language").eq("user_id", user.id).single();
        if (data && (data as any).preferred_language) {
          const saved = (data as any).preferred_language as Lang;
          setLangState(saved);
          localStorage.setItem("npp_lang", saved);
        }
      }
    };
    loadPref();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadPref();
    });
    return () => subscription.unsubscribe();
  }, []);

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
