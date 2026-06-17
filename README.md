# Passion Assets

A private-bank–grade register for a family's **passion assets** — the art, watches,
wine, automobiles and trophy property that rarely appear on a conventional balance
sheet. It catalogues each piece, tracks its valuation over time, and shows how the
collection sits within total family wealth.

> **Illustrative demo — fictional data.** Every figure, name, lot and house is
> invented. Nothing here constitutes advice, a valuation, or an offer.

## Run it

Requires Node 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (default <http://localhost:5173>).

To build a production bundle:

```bash
npm run build
npm run preview
```

## What's inside

- **Dashboard** — total collection value, unrealised gain (% and absolute), and a
  toggle to reveal the collection as a share of total family wealth.
- **Category summaries** — Art, Watches, Wine, Automobiles, Real Estate, each with
  item count, value and return; click one to filter the register below.
- **Charts** — an allocation donut by category and a value-over-time area chart
  (Recharts).
- **The register** — a gallery of individual holdings with category filters and
  sorting by value, gain or recency.
- **Piece detail** — full catalogue description, a cited market reference (a
  comparable auction result), a per-piece valuation history, and a provenance /
  valuation chain rendered as a node diagram (React Flow).

## Stack

Vite · React · TypeScript · Tailwind CSS · Recharts · @xyflow/react (React Flow).
No backend, no auth, no database — all data is local mock data in
`src/data/collection.ts`.

## Where the data lives

Everything the app displays comes from `src/data/collection.ts`. Edit that one file
to change holdings, valuations, history or the total-family-wealth figure used by
the share toggle.
