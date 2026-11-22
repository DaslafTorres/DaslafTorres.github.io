# DaslafTorres.github.io

Personal portfolio of **Daslaf Torres**, AI/LLM engineer. Bilingual (EN/ES), static.

**Live:** <https://daslaftorres.github.io> · **Español:** <https://daslaftorres.github.io/es/>

**Focus:** RAG systems with measurable evaluation · tool-using agents · AI-native full-stack apps.

## What is here

- `/` and `/es/` — landing page: positioning, featured project with real metrics, what is in progress, about, contact.
- `/work/criptolex-cl/` and `/es/work/criptolex-cl/` — case study of the RAG system over Chilean crypto regulation: corpus, chunking, hybrid retrieval, the citation contract, evaluation and the published numbers.

Every number on the site comes from the source project
[`criptolex-cl`](https://github.com/DaslafTorres/criptolex-cl) (`README.md`, `eval/results.json`).

## Stack

| Layer | Choice |
|---|---|
| Site | [Astro](https://astro.build) (static output), hand-written CSS, no UI framework |
| Language | TypeScript |
| Content | Typed data modules in `src/data/` — one file per language pair |
| Hosting | GitHub Pages, deployed from Actions |

Design tokens mirror the `criptolex-cl` UI (`--bg #0a0b0d`, `--accent #8b9cff`) so the site and the live demo read as one product.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

There is no test suite; `npm run build` is the verification step.

## Structure

```
.
├── .github/workflows/deploy.yml   # build + deploy to Pages
├── public/                        # favicon, OG image, demo.gif
├── src/
│   ├── components/                # Header, Footer, Site, CaseStudy
│   ├── data/                      # site.ts, case-study.ts (EN/ES copy)
│   ├── layouts/Base.astro         # head, canonical, hreflang, OG
│   ├── pages/                     # / and /work/criptolex-cl/
│   │   └── es/                    # /es/ and /es/work/criptolex-cl/
│   └── styles/global.css
└── AGENTS.md                      # conventions for contributors and agents
```

## Roadmap

- [x] Positioning and identity
- [x] Project 1 — RAG with measurable evaluation
- [x] Portfolio site and case studies
- [x] Deploy
- [ ] Project 2 — tool-using agent
- [ ] Project 3 — AI-native full-stack app

## License

MIT © 2026 Daslaf Torres
