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
  "products.info": { en: "Product info", es: "Información del producto" },
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
    en: "Your email confirmation is on its way. Want an instant response? Text us directly.",
    es: "Su confirmación por correo electrónico está en camino. ¿Quiere una respuesta instantánea? Envíenos un mensaje de texto.",
  },
  "cart.textConfirm": { en: "Text for Instant Confirmation", es: "Mensaje para Confirmación Instantánea" },
  "cart.continueBrowsing": { en: "Continue Browsing", es: "Seguir Navegando" },

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
