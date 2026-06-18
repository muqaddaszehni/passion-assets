# Client Onboarding — Playbook

How a private banker takes a family from first conversation to a live Passion
Assets register. Each real-world step maps to a step in the in-app onboarding
wizard (open it from the client switcher in the header → **Onboard new client**).

> **Illustrative demo — fictional data.** This describes a process, not advice.
> The app holds no real client data and stores everything locally in the browser.

---

## 1. Mandate & scope  → *Wizard Step 1: Client & family office*

Before any data is entered, agree the boundaries of the engagement:

- **Which asset classes** are in scope — Art, Watches, Wine, Automobiles, Real
  Estate. (The register is deliberately limited to passion assets that fall
  outside the conventional balance sheet.)
- **Reporting currency** — this demo reports in USD. Multi-currency holdings are
  converted to the reporting currency at the valuation date.
- **Reporting "as at" date** — the date the register is struck.
- **Total family wealth** — used only to express the collection as a share of
  overall wealth. If undisclosed, the collection is shown as 100% of *known*
  wealth and the share view is omitted from client-facing output.

Captured in the wizard: family office name, family name, reporting date, total
family wealth (optional).

## 2. Data gathering, per asset class  → *Wizard Step 2: Add holdings*

The quality of the register is the quality of its inputs. What to collect:

| Class | Identify it by | Documents to request |
|---|---|---|
| **Art** | Artist, title, medium, year, dimensions | Invoice, exhibition history, condition report, certificate of authenticity |
| **Watches** | Maker, reference, year, full set? | Original certificate, box & papers, service records |
| **Wine** | Producer, vintage, format, bottle count | Purchase records, bonded-storage statement, provenance chain |
| **Automobiles** | Marque, model, year, chassis/engine numbers | Matching-numbers verification, marque certification (e.g. Ferrari Classiche), service history |
| **Real Estate** | Address, tenure, area, listing status | Title, most recent RICS appraisal, refurbishment records |

For each holding the wizard records: name, maker/artist/district, category,
acquisition price and date, current estimated value, last-valued date, an
optional description, and an optional market reference.

## 3. Valuation sourcing  → *the "market reference" line*

Every current value should be defensible. Acceptable sources, in rough order of
strength:

1. **Independent professional appraisal** — RICS for property; a recognised
   specialist for art, watches and cars.
2. **Comparable auction result** — a like-for-like lot sold recently at a major
   house (Christie's, Phillips, Sotheby's, RM/Bonhams). This becomes the
   holding's **market reference** line.
3. **Published index** — e.g. Liv-ex for fine wine, used to roll a cellar
   forward between physical valuations.

Record *where the number came from*, not just the number. A value without a
source is a guess.

## 4. Provenance & documentation

For art and automobiles especially, provenance materially affects value. Capture
the ownership chain and key certifications. In the register each holding carries a
**provenance & valuation chain** — for onboarded holdings this starts as
*Acquired → Current valuation* and is extended as documentation is verified.

## 5. Build the register & publish  → *Wizard Step 3: Review & confirm*

Review the assembled collection: total value, cost basis, unrealised gain, the
category split and the share of family wealth. Confirm to publish the client's
private dashboard. They can then be selected at any time from the client switcher.

## 6. Revaluation cadence & governance

A register is a living document:

- **Watches / wine** — review semi-annually; these markets move quickly.
- **Art / automobiles** — annually, or on a material comparable sale.
- **Real estate** — on each professional appraisal cycle.
- Re-strike the "as at" date at every review and retain the prior marks for the
  value-over-time history.
- Always carry the disclaimer that valuations are indicative and not an offer.

---

### A note on this demo

Onboarded clients are stored **only in your browser** (`localStorage`) — there is
no backend, no server and no multi-device sync. Use **Reset to sample** in the
client switcher to clear onboarded clients and return to the seed collection.
