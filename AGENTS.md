# AGENTS.md

Personal portfolio of **Daslaf Torres**, AI/LLM engineer. Static site, bilingual EN/ES.

## Commands

- `npm install` — npm, not pnpm. Node 24.
- `npm run dev` — dev server on :4321
- `npm run build` — static output to `dist/`; the only verification step in this repo
- `npm run preview` — serve the build

No tests, linter or typecheck script exists. Do not invent one; run `npm run build`
before committing anything under `src/` or the Astro config.

## Hard constraints

- The site's value is measured numbers. Every metric must match the source project,
  `C:\Users\Graphics\Desktop\criptolex-cl` (`README.md`, `eval/results.json`).
  Never invent, estimate or round a metric up. There is one real project; the other
  two cards are explicitly "in progress" and must stay that way until the repos exist.
- Deploy target is GitHub Pages at https://daslaftorres.github.io, repo
  `DaslafTorres/DaslafTorres.github.io` (renamed from `portfolio`; old URLs redirect).
  Pages must use `build_type=workflow`, not a branch source.
- English is canonical: `hreflang x-default` points to `/`, Spanish lives under `/es/`.

## Conventions

- Every page exists twice: `src/pages/x.astro` (EN) and `src/pages/es/x.astro` (ES).
  Pass the equivalent `altPath` to `<Base>` and `<Header>` so the language switch
  lands on the same page, not the home page.
- All user-visible copy lives in `src/data/site.ts` and `src/data/case-study.ts`,
  typed by `Lang`. Components receive `lang` and read from there; no hardcoded
  strings in `.astro` files.
- Styling is a single stylesheet with design tokens (`src/styles/global.css`).
  No Tailwind, no Astro integrations. Tokens mirror the criptolex-cl UI
  (`--bg #0a0b0d`, `--accent #8b9cff`) so the site and the demo read as one product.
- `Base.astro` references `/favicon.svg` and `/og.png` (1200×630). Both must exist
  in `public/` or the head sends 404s.

## Gotchas

- `README.md` still describes the original plan (Astro 5 + Tailwind + Vercel). The
  code is the source of truth; update the README when the site ships, not before.
- `public/demo.gif` is 3.7 MB, recorded from the live deployment with Playwright and
  ffmpeg. Re-recording is a deliberate task: the demo must first be redeployed with
  the current image, or the GIF shows stale behaviour.
- `C:\Users\Graphics\Desktop\criptolex-cl` is a separate repository with its own CI,
  image and Modal deployment. Read it for numbers; do not edit it from here.
- The demo has a cold start (~10 s). Do not treat a slow first response as a bug
  when smoke-testing.
