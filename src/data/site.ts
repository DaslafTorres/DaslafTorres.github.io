export type Lang = "en" | "es";

export const EMAIL = "daslaftorresarteaga@gmail.com";
export const GITHUB_URL = "https://github.com/DaslafTorres";
export const DEMO_URL = "https://daslaftorresarteaga--criptolex-cl-web.us-east.modal.run";
export const REPO_URL = "https://github.com/DaslafTorres/criptolex-cl";

export interface Metric {
  value: string;
  label: string;
}

export interface Copy {
  meta: { title: string; description: string };
  nav: { work: string; about: string; contact: string };
  skip: string;
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    pitch: string;
    availability: string;
    primaryCta: string;
    secondaryCta: string;
  };
  featured: {
    label: string;
    summary: string;
    metrics: Metric[];
    stackLabel: string;
    stack: string[];
    demo: string;
    repo: string;
    case: string;
    caption: string;
  };
  more: {
    label: string;
    title: string;
    items: { title: string; body: string; status: string }[];
  };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };
  contact: {
    label: string;
    title: string;
    body: string;
    emailLabel: string;
    githubLabel: string;
  };
  footer: { built: string; note: string };
}

const en: Copy = {
  meta: {
    title: "Daslaf Torres — AI/LLM Engineer",
    description:
      "I build applications with LLMs on real data: retrieval systems with measurable evaluation, citation-enforcing generation, and services that ship. Portfolio of Daslaf Torres, AI/LLM engineer in Chile.",
  },
  nav: { work: "Work", about: "About", contact: "Contact" },
  skip: "Skip to content",
  hero: {
    eyebrow: "Portfolio · 2026",
    name: "Daslaf Torres",
    role: "AI/LLM Engineer",
    pitch:
      "I build applications with LLMs on real data — retrieval systems with measurable evaluation, citation-enforcing generation, and services that run in production.",
    availability: "Open to full-time roles · Chile · remote-friendly",
    primaryCta: "Open the live demo",
    secondaryCta: "Read the case study",
  },
  featured: {
    label: "Featured project",
    tagline: "RAG with citations",
    summary:
      "A retrieval assistant over Chilean crypto and fintech regulation. Every answer cites the official document and article it came from, and says so when the corpus does not support it. Built on seven public sources from BCN, CMF, UAF and SII.",
    metrics: [
      { value: "0.90", label: "hit@5 over 20 questions" },
      { value: "0.90", label: "citation recall" },
      { value: "1.00", label: "out-of-scope refusals" },
      { value: "$0.002", label: "per answer" },
    ],
    stackLabel: "Stack",
    stack: [
      "Python 3.12",
      "FastAPI",
      "Chroma",
      "BM25 + cross-encoder",
      "Qwen 3.8 27B on Groq",
      "Docker",
      "Modal",
    ],
    demo: "Live demo",
    repo: "Source",
    case: "Case study",
    caption: "Recorded on the live deployment: an answer with its sources, then an out-of-scope question that is refused.",
  },
  more: {
    label: "In progress",
    title: "What I am building next.",
    items: [
      {
        title: "Agent with tools",
        body: "A bounded agent that audits repositories and reports findings with evidence, cost limits and visible traces.",
        status: "Design",
      },
      {
        title: "LLM-native app",
        body: "Streaming, auth, per-user quotas and observability — the parts of an AI product that are not the model.",
        status: "Planned",
      },
    ],
  },
  about: {
    label: "About",
    title: "From reading regulation to building systems that read it.",
    paragraphs: [
      "I have a computer science degree and spent years trading crypto, which meant reading regulation by hand: tax circulars, AML rules, the fintech law. The slow part was never the trade — it was finding the article.",
      "criptolex-cl is the answer to that. It is not a chatbot over PDFs: it is a retrieval system with a citation contract enforced on the server, a golden set that validates itself against the corpus, and published numbers that say where it fails.",
      "I am early in AI engineering and I know it. What I bring is a finished system — ingestion, evaluation, deployment, cost control — and the ability to explain every decision, including the ones that did not work.",
    ],
    facts: [
      { label: "Focus", value: "Retrieval · evaluation · LLM applications" },
      { label: "Based in", value: "Chile · remote-friendly" },
      { label: "Languages", value: "Spanish (native) · English (professional)" },
    ],
  },
  contact: {
    label: "Contact",
    title: "Let's talk.",
    body: "I am looking for my first full-time AI/LLM engineering role. If you are building with LLMs and want someone who measures before shipping, write me.",
    emailLabel: "Email",
    githubLabel: "GitHub",
  },
  footer: {
    built: "Built with Astro · deployed on GitHub Pages",
    note: "The demo runs on Modal and may take a few seconds to wake up.",
  },
};

const es: Copy = {
  meta: {
    title: "Daslaf Torres — Ingeniero de IA/LLM",
    description:
      "Construyo aplicaciones con LLMs sobre datos reales: sistemas de recuperación con evaluación medible, generación que exige citas y servicios en producción. Portafolio de Daslaf Torres, ingeniero de IA/LLM en Chile.",
  },
  nav: { work: "Proyectos", about: "Sobre mí", contact: "Contacto" },
  skip: "Ir al contenido",
  hero: {
    eyebrow: "Portafolio · 2026",
    name: "Daslaf Torres",
    role: "Ingeniero de IA/LLM",
    pitch:
      "Construyo aplicaciones con LLMs sobre datos reales — sistemas de recuperación con evaluación medible, generación que exige citas y servicios que corren en producción.",
    availability: "Disponible para jornada completa · Chile · trabajo remoto",
    primaryCta: "Abrir la demo",
    secondaryCta: "Leer el caso de estudio",
  },
  featured: {
    label: "Proyecto destacado",
    tagline: "RAG con citas",
    summary:
      "Un asistente de recuperación sobre normativa chilena de criptoactivos y fintech. Cada respuesta cita el documento y el artículo exactos de los que sale, y lo dice cuando el corpus no la respalda. Construido sobre siete fuentes públicas del BCN, la CMF, la UAF y el SII.",
    metrics: [
      { value: "0.90", label: "hit@5 sobre 20 preguntas" },
      { value: "0.90", label: "recall de citas" },
      { value: "1.00", label: "rechazos fuera de alcance" },
      { value: "$0.002", label: "por respuesta" },
    ],
    stackLabel: "Stack",
    stack: [
      "Python 3.12",
      "FastAPI",
      "Chroma",
      "BM25 + cross-encoder",
      "Qwen 3.8 27B en Groq",
      "Docker",
      "Modal",
    ],
    demo: "Demo en vivo",
    repo: "Código",
    case: "Caso de estudio",
    caption:
      "Grabado sobre el despliegue real: una respuesta con sus fuentes y luego una pregunta fuera de alcance que se rechaza.",
  },
  more: {
    label: "En curso",
    title: "Lo que viene ahora.",
    items: [
      {
        title: "Agente con herramientas",
        body: "Un agente acotado que audita repositorios y reporta hallazgos con evidencia, límite de costo y trazas visibles.",
        status: "Diseño",
      },
      {
        title: "App nativa de LLM",
        body: "Streaming, autenticación, cuotas por usuario y observabilidad — las partes de un producto de IA que no son el modelo.",
        status: "Planeado",
      },
    ],
  },
  about: {
    label: "Sobre mí",
    title: "De leer normativa a construir sistemas que la leen.",
    paragraphs: [
      "Tengo título en ciencias de la computación y pasé años operando cripto, lo que significó leer normativa a mano: circulares de impuestos, reglas de prevención de lavado, la ley fintech. Lo lento nunca fue la operación, era encontrar el artículo.",
      "criptolex-cl es la respuesta a eso. No es un chatbot sobre PDFs: es un sistema de recuperación con un contrato de citas validado en el servidor, un conjunto dorado que se verifica contra el corpus y métricas publicadas que dicen dónde falla.",
      "Estoy empezando en ingeniería de IA y lo sé. Lo que traigo es un sistema terminado — ingesta, evaluación, despliegue, control de costos — y la capacidad de explicar cada decisión, incluidas las que no resultaron.",
    ],
    facts: [
      { label: "Enfoque", value: "Recuperación · evaluación · aplicaciones con LLM" },
      { label: "Ubicación", value: "Chile · trabajo remoto" },
      { label: "Idiomas", value: "Español (nativo) · inglés (profesional)" },
    ],
  },
  contact: {
    label: "Contacto",
    title: "Conversemos.",
    body: "Busco mi primer rol de jornada completa en ingeniería de IA/LLM. Si estás construyendo con LLMs y quieres a alguien que mide antes de publicar, escríbeme.",
    emailLabel: "Correo",
    githubLabel: "GitHub",
  },
  footer: {
    built: "Hecho con Astro · publicado en GitHub Pages",
    note: "La demo corre en Modal y puede tardar unos segundos en despertar.",
  },
};

export const copy: Record<Lang, Copy> = { en, es };

export function homePath(lang: Lang): string {
  return lang === "es" ? "/es/" : "/";
}

export function casePath(lang: Lang): string {
  return lang === "es" ? "/es/work/criptolex-cl/" : "/work/criptolex-cl/";
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}
