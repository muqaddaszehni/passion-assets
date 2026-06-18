# Changelog

All notable changes to Passion Assets. Dates are approximate; this is a demo
project, not a released package.

## [1.1.0] — Client onboarding

Added the ability to bring new families into the register.

- **Guided 3-step onboarding wizard** — client & family office → add holdings →
  review & confirm → land on the new client's dashboard. Opened from the client
  switcher in the header.
- **Client switcher** in the header with **Reset to sample**.
- **localStorage persistence** — onboarded clients survive a page reload.
- **Client-scoped data layer** — refactored `categorySummaries()` /
  `collectionTotals()` into pure functions that take a client's holdings; added
  `deriveCollectionValueHistory()`; introduced the `Client` type, `SEED_CLIENTS`,
  and a `ClientsContext`. The seed Lansdowne collection is unchanged.
- **Onboarding playbook** (`docs/CLIENT-ONBOARDING.md`) + architecture guide
  (`docs/ARCHITECTURE.md`); README updated.

## [1.0.0] — Initial build

The collection register.

- Dashboard: total collection value, unrealised gain (% and absolute), and a
  "share of total family wealth" toggle.
- Five category summary cards (Art, Watches, Wine, Automobiles, Real Estate).
- Allocation donut + value-over-time area chart (Recharts).
- Gallery of holdings with category filters and sort by value / gain / recency;
  inline-SVG "catalogue plate" placeholders per category (no image assets).
- Piece detail: catalogue description, cited market reference, per-piece value
  history, and a provenance chain rendered as a React Flow node diagram.
- "Restrained luxury" design system: navy / ivory / brass, Cormorant Garamond +
  Inter, hairline borders, small-caps labels.
- Fictional sample collection (a blue-chip contemporary painting, three high-end
  watches, a fine-wine cellar, a classic Ferrari, a Belgravia townhouse).
- Deployed to GitHub Pages via GitHub Actions on push to `master`.
