import type { Lang } from "./site";

export interface Section {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface CaseCopy {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  standfirst: string;
  facts: { label: string; value: string }[];
  sections: Section[];
  results: { title: string; columns: [string, string, string]; rows: { metric: string; value: string; note: string }[] };
  closing: { title: string; paragraph: string };
  back: string;
}

const en: CaseCopy = {
  meta: {
    title: "criptolex-cl — case study · Daslaf Torres",
    description:
      "How a citation-enforcing RAG system over Chilean crypto regulation was built: article-aware chunking, hybrid retrieval, a server-side citation contract and a 25-question golden set with published metrics.",
  },
  eyebrow: "Case study",
  title: "criptolex-cl",
  standfirst:
    "A retrieval system over Chilean crypto and fintech regulation that cites the document and article behind every sentence — and refuses when the corpus does not support an answer.",
  facts: [
    { label: "Role", value: "Solo: design, build, evaluation, deployment" },
    { label: "Year", value: "2026" },
    { label: "Status", value: "Live, public source" },
    { label: "Cost", value: "$0.002 per answer, $0 in infrastructure" },
  ],
  sections: [
    {
      title: "The problem",
      paragraphs: [
        "Chilean crypto regulation lives in at least four places: the fintech law at the Biblioteca del Congreso Nacional, the CMF rulebook for registration, the UAF circulars on money laundering, and the SII's tax guidance. A trader who wants to know how a sale is taxed has to know which of those answers, and which article.",
        "A general-purpose chatbot is the wrong tool. It does not know that article 17 N° 8 of the income tax law is the one that matters for a natural person selling crypto, and it will happily invent an article number. In a tax or compliance question, a confident wrong citation is worse than no answer.",
      ],
    },
    {
      title: "Why citations are the product",
      paragraphs: [
        "The value is not fluency, it is verifiability. If the answer says the sanction for a minor infraction is a fine of up to 800 UF, the reader needs to click through to article 20 of Law 19.913 and see it. That constraint drives every other decision in the project.",
      ],
      bullets: [
        "Only seven official sources, no blogs and no scraped commentary.",
        "Article-level chunks for laws, so a citation says “article 20”, not “somewhere in this law”.",
        "The server, not the model, decides which sources are returned.",
      ],
    },
    {
      title: "Corpus and chunking",
      paragraphs: [
        "The corpus is 831,549 characters across seven documents, cut into 630 chunks. The chunker is article-aware: it detects monotonic article numbering, which matters because the fintech law embeds the full text of the laws it modifies. A naive regex found articles up to number 254 in a law that ends at 46.",
        "Question-and-answer pages needed a different rule. The SII FAQ was originally split on section headings, which separated an answer from its question. Splitting on “Pregunta:” instead moved the “mayor valor” answer from outside the top five to rank 1.",
      ],
    },
    {
      title: "Retrieval",
      paragraphs: [
        "Retrieval is hybrid: BM25 with Spanish Snowball stemming over the chunk body, dense embeddings in Chroma, reciprocal rank fusion, then a cross-encoder rerank (ms-marco-TinyBERT-L-2-v2) whose scores are fused back in with RRF. Reranking is the step that makes short legal questions work; the first fusion alone put the right article at rank 3 or worse.",
        "On the golden set the retriever reaches hit@5 of 0.90 and MRR@5 of 0.63, at 377 ms p50 on CPU. The misses are documented, not hidden: one list question loses to the procedure that describes reporting, one form question loses to a different form number.",
      ],
    },
    {
      title: "The citation contract",
      paragraphs: [
        "The model never sees free text sources. It receives numbered extracts and must cite them inline. After generation the server parses every bracket, deletes any number that was not supplied, and builds the sources array only from the chunks that survived.",
        "That turns a soft instruction into an invariant: if the answer cites nothing, grounded is false; if it refuses, sources is empty. Full-width citations from some providers are normalised first, because dropping a valid citation would mark a correct answer as ungrounded.",
      ],
    },
    {
      title: "Evaluation",
      paragraphs: [
        "The golden set has 25 questions: 20 answerable across the seven sources and 5 deliberately out of scope — VAT on streaming, US SEC rules, municipal permits — so refusing is not trivially easy. Each expected fact must appear verbatim in its gold chunk, and the harness refuses to score if the corpus and the set drift apart.",
        "Retrieval and generation are measured separately, because a wrong answer can come from either side. That separation is what made the last prompt fix findable.",
      ],
    },
    {
      title: "What broke, and what it taught",
      paragraphs: [
        "A single sentence in the system prompt produced two opposite failures. It only said what to do when the extracts lacked the answer. The model therefore declined a question whose gold chunk was at rank 2, and answered an out-of-scope question about incorporating a company from a neighbouring definition.",
        "Splitting the rule — answer when at least one extract contains the fact, refuse when no extract describes the requested fact or procedure — took abstention accuracy from 0.80 to 1.00, citation recall from 0.85 to 0.90 and fact recall from 0.70 to 0.79.",
        "The last discovery came from recording the demo: “el mayor valor al vender criptomonedas” is refused while “en la venta de criptomonedas” is answered perfectly. Two words move the correct chunk in or out of the top five. The system behaves correctly in both cases; the retriever is the limit.",
      ],
    },
    {
      title: "What I would do next",
      paragraphs: [
        "The remaining false refusal, form 1964, has its gold chunk at rank 7. The fix is retrieval, not generation: boost chunks that match a form number mentioned in the question, and expand list questions so an enumeration does not lose to the procedure that mentions it.",
        "After that: document-level citation precision (the current metric is strict and understates quality), a chunk-size benchmark, and latency grading so the free-tier throttle is reported separately from model time.",
      ],
    },
  ],
  results: {
    title: "Published numbers",
    columns: ["Metric", "Value", "Note"],
    rows: [
      { metric: "retrieval hit@5", value: "0.90", note: "18 of 20 answerable questions" },
      { metric: "retrieval MRR@5", value: "0.63", note: "±0.02 between runs" },
      { metric: "citation recall", value: "0.90", note: "the gold chunk is cited when retrieved" },
      { metric: "citation precision", value: "0.49", note: "strict: gold chunks only" },
      { metric: "fact recall", value: "0.79", note: "expected facts present in the answer" },
      { metric: "abstention accuracy", value: "1.00", note: "5 of 5 out-of-scope questions refused" },
      { metric: "cost", value: "$0.050", note: "25 questions, ~$0.002 each" },
    ],
  },
  closing: {
    title: "Read the code",
    paragraph:
      "The repository contains the ingestion pipeline, the evaluation harness, the golden set and the Docker image. The demo runs the same image that CI publishes.",
  },
  back: "Back to portfolio",
};

const es: CaseCopy = {
  meta: {
    title: "criptolex-cl — caso de estudio · Daslaf Torres",
    description:
      "Cómo se construyó un sistema RAG que exige citas sobre normativa chilena de criptoactivos: chunking por artículo, recuperación híbrida, contrato de citas en el servidor y un conjunto dorado de 25 preguntas con métricas publicadas.",
  },
  eyebrow: "Caso de estudio",
  title: "criptolex-cl",
  standfirst:
    "Un sistema de recuperación sobre normativa chilena de criptoactivos y fintech que cita el documento y el artículo detrás de cada frase — y se abstiene cuando el corpus no respalda una respuesta.",
  facts: [
    { label: "Rol", value: "Solo: diseño, construcción, evaluación y despliegue" },
    { label: "Año", value: "2026" },
    { label: "Estado", value: "En vivo, código público" },
    { label: "Costo", value: "$0.002 por respuesta, $0 de infraestructura" },
  ],
  sections: [
    {
      title: "El problema",
      paragraphs: [
        "La normativa chilena de criptoactivos vive en al menos cuatro lugares: la ley fintech en la Biblioteca del Congreso Nacional, el reglamento de registro de la CMF, las circulares de la UAF sobre lavado de activos y las guías tributarias del SII. Quien quiere saber cómo tributa una venta tiene que saber cuál de esos documentos responde, y en qué artículo.",
        "Un chatbot generalista es la herramienta equivocada. No sabe que el artículo 17 N° 8 de la ley de impuesto a la renta es el que aplica a una persona natural que vende cripto, y con confianza inventará un número de artículo. En una pregunta tributaria o de cumplimiento, una cita falsa y segura es peor que ninguna respuesta.",
      ],
    },
    {
      title: "Por qué las citas son el producto",
      paragraphs: [
        "El valor no está en la fluidez, está en la verificabilidad. Si la respuesta dice que la sanción por una infracción leve es una multa de hasta 800 UF, el lector necesita poder ir al artículo 20 de la Ley 19.913 y verlo. Esa restricción ordena todas las demás decisiones del proyecto.",
      ],
      bullets: [
        "Solo siete fuentes oficiales, sin blogs ni comentarios de terceros.",
        "Chunks a nivel de artículo en las leyes, para que una cita diga “artículo 20” y no “en alguna parte de esta ley”.",
        "El servidor, no el modelo, decide qué fuentes se devuelven.",
      ],
    },
    {
      title: "Corpus y chunking",
      paragraphs: [
        "El corpus son 831.549 caracteres en siete documentos, cortados en 630 chunks. El chunker entiende de artículos: detecta numeración monótona, lo que importa porque la ley fintech incluye el texto completo de las leyes que modifica. Un regex ingenuo encontraba artículos hasta el 254 en una ley que termina en el 46.",
        "Las páginas de preguntas frecuentes necesitaron otra regla. El FAQ del SII se cortaba por secciones, lo que separaba cada respuesta de su pregunta. Cortar por “Pregunta:” movió la respuesta sobre el mayor valor de fuera del top cinco al primer lugar.",
      ],
    },
    {
      title: "Recuperación",
      paragraphs: [
        "La recuperación es híbrida: BM25 con stemming Snowball en español sobre el cuerpo del chunk, embeddings densos en Chroma, fusión por rango recíproco y luego un rerank con cross-encoder (ms-marco-TinyBERT-L-2-v2) cuyos puntajes se vuelven a fusionar con RRF. El rerank es lo que hace funcionar preguntas legales cortas; la primera fusión sola dejaba el artículo correcto en tercer lugar o peor.",
        "Sobre el conjunto dorado, el retriever alcanza hit@5 de 0.90 y MRR@5 de 0.63, con 377 ms de mediana en CPU. Los errores están documentados, no escondidos: una pregunta de listado pierde contra el procedimiento que describe el reporte, y una pregunta sobre un formulario pierde contra otro número de formulario.",
      ],
    },
    {
      title: "El contrato de citas",
      paragraphs: [
        "El modelo nunca ve fuentes en texto libre. Recibe extractos numerados y debe citarlos en línea. Después de generar, el servidor lee cada corchete, elimina cualquier número que no se haya entregado y arma el arreglo de fuentes solo con los chunks que sobrevivieron.",
        "Eso convierte una instrucción blanda en un invariante: si la respuesta no cita nada, grounded es falso; si se abstiene, sources viene vacío. Las citas con corchetes de ancho completo de algunos proveedores se normalizan antes, porque descartar una cita válida marcaría como no respaldada una respuesta correcta.",
      ],
    },
    {
      title: "Evaluación",
      paragraphs: [
        "El conjunto dorado tiene 25 preguntas: 20 respondibles en las siete fuentes y 5 deliberadamente fuera de alcance — IVA al streaming, reglas de la SEC, permisos municipales — para que rechazarlas no sea trivial. Cada hecho esperado debe aparecer textualmente en su chunk dorado, y el arnés se niega a puntuar si el corpus y el conjunto se desalinean.",
        "Recuperación y generación se miden por separado, porque una respuesta mala puede venir de cualquiera de los dos lados. Esa separación es lo que hizo encontrable el último arreglo de prompt.",
      ],
    },
    {
      title: "Qué falló y qué enseñó",
      paragraphs: [
        "Una sola frase del prompt produjo dos fallos opuestos. Solo decía qué hacer cuando los extractos no contenían la respuesta. El modelo, entonces, rechazó una pregunta cuyo chunk dorado estaba en el puesto 2, y respondió una pregunta fuera de alcance sobre constituir una sociedad usando una definición vecina.",
        "Separar la regla — responder cuando al menos un extracto contiene el hecho, abstenerse cuando ningún extracto describe el hecho o procedimiento pedido — subió la precisión de abstención de 0.80 a 1.00, el recall de citas de 0.85 a 0.90 y el recall de hechos de 0.70 a 0.79.",
        "El último hallazgo salió al grabar la demo: “el mayor valor al vender criptomonedas” se rechaza, mientras “en la venta de criptomonedas” se responde perfecto. Dos palabras mueven el chunk correcto dentro o fuera del top cinco. El sistema se comporta bien en ambos casos; el límite es el retriever.",
      ],
    },
    {
      title: "Qué haría después",
      paragraphs: [
        "El rechazo que queda, la declaración jurada 1964, tiene su chunk dorado en el puesto 7. El arreglo es de recuperación, no de generación: dar más peso a los chunks que coinciden con un número de formulario mencionado en la pregunta y expandir las preguntas de listado para que una enumeración no pierda contra el procedimiento que la menciona.",
        "Después: precisión de citas a nivel documento (la métrica actual es estricta y subestima la calidad), un benchmark de tamaño de chunk y separar la latencia del modelo del throttling del tier gratuito.",
      ],
    },
  ],
  results: {
    title: "Números publicados",
    columns: ["Métrica", "Valor", "Nota"],
    rows: [
      { metric: "hit@5 de recuperación", value: "0.90", note: "18 de 20 preguntas respondibles" },
      { metric: "MRR@5 de recuperación", value: "0.63", note: "±0.02 entre corridas" },
      { metric: "recall de citas", value: "0.90", note: "el chunk dorado se cita cuando se recupera" },
      { metric: "precisión de citas", value: "0.49", note: "estricta: solo chunks dorados" },
      { metric: "recall de hechos", value: "0.79", note: "hechos esperados presentes en la respuesta" },
      { metric: "precisión de abstención", value: "1.00", note: "5 de 5 fuera de alcance rechazadas" },
      { metric: "costo", value: "$0.050", note: "25 preguntas, ~$0.002 cada una" },
    ],
  },
  closing: {
    title: "Leer el código",
    paragraph:
      "El repositorio contiene la ingesta, el arnés de evaluación, el conjunto dorado y la imagen Docker. La demo corre la misma imagen que publica CI.",
  },
  back: "Volver al portafolio",
};

export const caseCopy: Record<Lang, CaseCopy> = { en, es };
