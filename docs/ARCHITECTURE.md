# Architecture & Developer Guide

Technical reference for **Passion Assets** — a single-page React app that
catalogues a family's passion assets (art, watches, wine, automobiles, trophy
property), tracks valuations, and onboards new clients. No backend; all data is
local mock data plus anything entered through the onboarding wizard (persisted to
the browser's `localStorage`).

For the *product* overview and run instructions, see [`README.md`](../README.md).
For the *business* process behind onboarding, see
[`CLIENT-ONBOARDING.md`](./CLIENT-ONBOARDING.md).

---

## 1. Stack

| Concern | Choice |
|---|---|
| Build / dev server | Vite 5 |
| UI | React 18 + TypeScript (strict) |
| Styling | Tailwind CSS 3 (custom theme) |
| Charts | Recharts 2 (donut, area/line) |
| Node diagrams | @xyflow/react (React Flow 12) — provenance chains |
| Fonts | Cormorant Garamond (headings) + Inter (body), via Google Fonts |
| State | React state + one small Context; persistence via `localStorage` |
| Routing | None — view state in `App.tsx` (dashboard / detail / onboarding) |

## 2. Run, build, deploy

```bash
npm install      # install deps
npm run dev      # local dev server (default http://localhost:5173)
npm run build    # tsc --noEmit type-check, then vite production build -> dist/
npm run preview  # serve the built dist/ locally
```

**Deployment** is automatic via GitHub Actions → GitHub Pages
(`.github/workflows/deploy.yml`): every push to `master` builds and publishes to
<https://muqaddaszehni.github.io/passion-assets/>. `vite.config.ts` sets
`base: '/passion-assets/'` for production builds only (dev stays at `/`), so asset
paths resolve under the repo subpath.

## 3. Project structure

```
index.html                 # page title, fonts, favicon, #root mount
src/
  main.tsx                 # React entry, mounts <App/>
  index.css                # Tailwind layers + base styles, .eyebrow/.card/.tnum, paper grain,
                           #   React Flow + Recharts overrides, the `rise` reveal animation
  App.tsx                  # ClientsProvider wrapper + AppShell (view state, piece lookup)
  types.ts                 # Category, ValuePoint, ProvenanceStep, Piece, CategoryMeta, Client

  data/
    collection.ts          # seed holdings (COLLECTION), CATEGORY_META, category colors,
                           #   PURE helpers: categorySummaries(), collectionTotals(),
                           #   deriveCollectionValueHistory(); TOTAL_FAMILY_WEALTH, value history
    clients.ts             # SEED_CLIENTS — wraps the seed collection as the Lansdowne client

  state/
    ClientsContext.tsx     # clients list, active client, addClient/resetDemo, localStorage persistence

  lib/
    format.ts              # currency / percent / date formatters (Intl-based)

  components/
    BrandHeader.tsx        # navy top bar; hosts ClientSwitcher; shows active client + "as at" date
    ClientSwitcher.tsx     # header dropdown: pick client, "Onboard new client", "Reset to sample"
    DashboardHeader.tsx    # hero: total value, gain, family-wealth share toggle
    CategoryCards.tsx      # 5 category summary cards (act as register filters)
    AllocationChart.tsx    # Recharts donut by category (hides zero-value categories)
    ValueOverTimeChart.tsx # Recharts area chart; client curve or derived curve
    Gallery.tsx            # holdings grid + category filter + sort (value/gain/recency)
    PieceCard.tsx          # one gallery tile
    PieceDetail.tsx        # full catalogue entry: facts, description, market reference,
                           #   per-piece value history, provenance diagram
    ProvenanceFlow.tsx     # React Flow node diagram (custom node, fit-to-view)
    PiecePlaceholder.tsx   # inline-SVG "catalogue plate" per category (no image assets)
    Panel.tsx              # reusable card/section frame with eyebrow + title
    Footer.tsx             # navy footer + "Illustrative demo — fictional data"
    onboarding/
      OnboardingWizard.tsx # 3-step container: step state, progress indicator, confirm -> addClient
      StepClient.tsx       # Step 1: client/family-office form + "how onboarding works" intro
      StepHoldings.tsx     # Step 2: add-holding form + running list (add/remove)
      StepReview.tsx       # Step 3: computed totals, category split, holdings list, confirm
      fields.tsx           # styled TextField / SelectField / TextAreaField
      helpers.ts           # form types, validation, buildPiece(), buildClient()

docs/
  ARCHITECTURE.md          # this file
  CLIENT-ONBOARDING.md     # business playbook, mapped to the wizard
.github/workflows/deploy.yml
```

## 4. Data model (`src/types.ts`)

- **`Piece`** — one holding: id, name, subtitle, category, acquisition price/date,
  current value, last-valued date, blurb, description, `marketReference`,
  `valueHistory: ValuePoint[]`, `provenance: ProvenanceStep[]`.
- **`Client`** — id, `officeName`, `familyName`, `asOf`, `totalFamilyWealth`,
  `holdings: Piece[]`, optional `valueHistory` (curated curve; derived from
  holdings when absent), `seed?` (true for code-seeded clients, never written to
  localStorage).
- **`Category`** — the fixed union: `Art | Watches | Wine | Automobiles | Real Estate`.
- **`CategoryMeta`** — per-category color + note, defined in `collection.ts`.

## 5. State & data flow

The app was refactored from a single module-global collection to **client-scoped**
data so multiple clients can coexist:

- `ClientsContext` holds `clients = [...SEED_CLIENTS, ...userClients]` and the
  `activeClientId`. `useActiveClient()` returns the active `Client`.
- The data helpers in `collection.ts` are **pure** — they take arguments rather
  than reading a global:
  - `categorySummaries(holdings)` → per-category count/value/gain.
  - `collectionTotals(holdings, totalFamilyWealth)` → value, cost, gain, gainPct,
    itemCount, shareOfWealth.
  - `deriveCollectionValueHistory(holdings)` → collection curve for clients with no
    curated `valueHistory`, by interpolating each holding linearly between its
    acquisition and last-valued years (avoids false dips from sparse histories).
- Each display component calls `useActiveClient()` and passes the active client's
  `holdings` / `totalFamilyWealth` into those helpers. `PieceDetail` takes a single
  `piece` prop and is client-agnostic.
- `App.tsx`'s `AppShell` owns view state (`dashboard | onboarding`), the selected
  piece id, and gallery filter/sort. Switching clients clears the open detail and
  returns to the dashboard.

### Persistence

`ClientsContext` hydrates user-added clients from
`localStorage["passion-assets:clients"]` and the active id from
`["passion-assets:activeClient"]`, both guarded against bad JSON. Seed clients
always come from code and are never persisted. `resetDemo()` clears both keys.

## 6. Onboarding flow

1. **Step 1 (`StepClient`)** — capture office/family name, reporting date, total
   family wealth. Continue is gated on a non-empty office name.
2. **Step 2 (`StepHoldings`)** — add pieces one at a time. `validateHolding`
   requires name + positive acquisition price + positive current value +
   acquisition date. `buildPiece()` fills the rest: a yearly-interpolated
   `valueHistory`, a minimal `Acquired → Current valuation` provenance, sensible
   default blurb/description/market-reference. ≥1 holding required to continue.
3. **Step 3 (`StepReview`)** — shows computed totals (reusing the pure helpers),
   category split and holdings. Confirm → `buildClient()` assembles the `Client`,
   `addClient()` persists it and makes it active, and the app returns to the
   dashboard now showing the new client.

## 7. Design system

Defined in `tailwind.config.js` + `src/index.css`:

- **Palette**: navy `#0E1B2E`, ivory `#F7F4EE`, brass `#B0904F`, charcoal
  `#1C1C1C`, hairline `#D8D2C6`; muted category swatches (`cat.art/watches/wine/
  autos/realestate`).
- **Type**: `font-serif` = Cormorant Garamond (display), `font-sans` = Inter (body).
- **Idioms**: `.eyebrow` (letter-spaced small-caps label), `.card` (hairline +
  soft shadow), `.tnum` (tabular figures), 1px hairline borders, a faint paper
  grain on `body`, the `rise` staggered reveal. No emoji, no bright gradients.

## 8. Known limitations (by design)

- No photo uploads — holdings use the category SVG "plates" in `PiecePlaceholder`.
- No backend / multi-device sync — onboarded clients live only in the current
  browser's `localStorage`.
- Single reporting currency (USD); multi-currency would be converted upstream.
- The production bundle is a single chunk (~780 kB / ~230 kB gzip) — fine for a
  demo; could be code-split (lazy-load Recharts/React Flow) if needed.

## 9. How to extend

- **Change the seed collection** — edit `src/data/collection.ts` (holdings,
  values, curated `COLLECTION_VALUE_HISTORY`, `TOTAL_FAMILY_WEALTH`).
- **Rename / re-scope the sample client** — edit `src/data/clients.ts`.
- **Add a code-seeded second client** — append a `Client` to `SEED_CLIENTS`.
- **Add a category** — extend the `Category` union in `types.ts`, add an entry to
  `CATEGORY_META` (key + color + note) and a motif in `PiecePlaceholder.tsx`.
- **Add a new holding field** — extend `Piece`, the `HoldingForm` + `buildPiece`
  in `onboarding/helpers.ts`, and render it in `PieceDetail`.
