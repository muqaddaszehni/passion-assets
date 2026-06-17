import type { Category, CategoryMeta, Piece, ValuePoint } from '../types'

/**
 * Illustrative demo — fictional data.
 * All figures are reporting-currency USD. Names, houses and lots are invented.
 */

export const REPORTING_CURRENCY = 'USD'

/** Constant used by the "share of total family wealth" toggle. */
export const TOTAL_FAMILY_WEALTH = 295_000_000

export const CATEGORY_META: CategoryMeta[] = [
  { key: 'Art', color: '#2A3A52', note: 'Post-war & contemporary' },
  { key: 'Watches', color: '#B0904F', note: 'Complications & steel sport' },
  { key: 'Wine', color: '#7A3B47', note: 'Bordeaux & Burgundy en primeur' },
  { key: 'Automobiles', color: '#4A5A4E', note: 'Pre-1975 thoroughbreds' },
  { key: 'Real Estate', color: '#9C8B6E', note: 'Trophy residential' },
]

export const COLLECTION: Piece[] = [
  {
    id: 'art-meridian',
    name: 'Meridian (Study in Cadmium)',
    subtitle: 'Aurelia Vance · b. 1968',
    category: 'Art',
    acquisitionPrice: 4_200_000,
    acquisitionDate: '2019-05-14',
    currentValue: 6_800_000,
    lastValued: '2026-03-02',
    blurb:
      'Oil and tempera on linen, 2016. The artist’s signature horizon band in cadmium and lead white.',
    description:
      'A defining canvas from Vance’s celebrated “Horizon” cycle, executed at the height of her market ascent. Meridian pairs a luminous cadmium band against a field of cool lead white, a composition the artist has described as “the last minute of daylight, held still.” Exhibited at the 2018 survey at the Fondation Lemaître, Geneva, and illustrated on the cover of the accompanying monograph. Condition is excellent; the work has never been restored. Held in a controlled-environment store in Geneva Freeport.',
    marketReference:
      'Comparable: Vance, “Equinox II” (2015), sold Christie’s London, Oct 2024, for £5.9m (US$7.4m) against a £3.5–4.5m estimate.',
    valueHistory: [
      { date: '2019', value: 4_200_000 },
      { date: '2020', value: 4_600_000 },
      { date: '2021', value: 5_400_000 },
      { date: '2022', value: 6_100_000 },
      { date: '2023', value: 5_900_000 },
      { date: '2024', value: 6_500_000 },
      { date: '2025', value: 6_700_000 },
      { date: '2026', value: 6_800_000 },
    ],
    provenance: [
      { id: 'p1', title: 'The Artist’s Studio', detail: 'Geneva, 2016' },
      { id: 'p2', title: 'Galerie Vautier', detail: 'Primary sale, 2017' },
      { id: 'p3', title: 'Private collection, family', detail: 'Acquired May 2019' },
      { id: 'p4', title: 'Independent valuation', detail: 'Hausmann & Cie, Mar 2026' },
    ],
  },
  {
    id: 'watch-nautilus',
    name: 'Patek Philippe Nautilus 5711/1A',
    subtitle: 'Stainless steel · blue dial · 2020',
    category: 'Watches',
    acquisitionPrice: 95_000,
    acquisitionDate: '2020-09-21',
    currentValue: 185_000,
    lastValued: '2026-04-18',
    blurb:
      'The discontinued steel reference. Acquired at retail; secondary market multiple since.',
    description:
      'Reference 5711/1A in stainless steel with the sunburst blue dial, acquired new from an authorised dealer in 2020 — the year before Patek Philippe formally discontinued the line. Full set: original certificate, presentation box and unworn protective stickers retained. The reference has become the defining steel sports watch of its generation and remains in structural short supply. Serviced and authenticated; runs within +2 sec/day.',
    marketReference:
      'Comparable: 5711/1A blue dial, full set, achieved CHF 168,000 at Phillips Geneva, Nov 2024.',
    valueHistory: [
      { date: '2020', value: 95_000 },
      { date: '2021', value: 240_000 },
      { date: '2022', value: 205_000 },
      { date: '2023', value: 168_000 },
      { date: '2024', value: 176_000 },
      { date: '2025', value: 182_000 },
      { date: '2026', value: 185_000 },
    ],
    provenance: [
      { id: 'p1', title: 'Authorised Dealer', detail: 'Retail, Sep 2020' },
      { id: 'p2', title: 'Family collection', detail: 'Held since acquisition' },
      { id: 'p3', title: 'Specialist valuation', detail: 'Apr 2026' },
    ],
  },
  {
    id: 'watch-royaloak',
    name: 'Audemars Piguet Royal Oak 15500ST',
    subtitle: 'Stainless steel · “Grande Tapisserie” blue · 2021',
    category: 'Watches',
    acquisitionPrice: 48_000,
    acquisitionDate: '2021-06-09',
    currentValue: 72_000,
    lastValued: '2026-04-18',
    blurb:
      'The 41mm successor to the 15400. Integrated bracelet, blue tapisserie dial.',
    description:
      'Reference 15500ST, the 41mm evolution of Gérald Genta’s 1972 design, with the deep blue “Grande Tapisserie” dial. Acquired through an authorised boutique in 2021. Complete with box, papers and spare links. A cornerstone luxury-steel reference that has held a firm premium to retail through the post-2022 normalisation.',
    marketReference:
      'Comparable: 15500ST blue, full set, sold US$69,000 at Sotheby’s online, Feb 2025.',
    valueHistory: [
      { date: '2021', value: 48_000 },
      { date: '2022', value: 84_000 },
      { date: '2023', value: 70_000 },
      { date: '2024', value: 68_000 },
      { date: '2025', value: 71_000 },
      { date: '2026', value: 72_000 },
    ],
    provenance: [
      { id: 'p1', title: 'AP Boutique', detail: 'Retail, Jun 2021' },
      { id: 'p2', title: 'Family collection', detail: 'Held since acquisition' },
      { id: 'p3', title: 'Specialist valuation', detail: 'Apr 2026' },
    ],
  },
  {
    id: 'watch-rm011',
    name: 'Richard Mille RM 011 Flyback',
    subtitle: 'NTPT carbon · Felipe Massa · 2019',
    category: 'Watches',
    acquisitionPrice: 210_000,
    acquisitionDate: '2019-11-30',
    currentValue: 295_000,
    lastValued: '2026-04-18',
    blurb:
      'Flyback chronograph in NTPT carbon. Skeletonised automatic with annual calendar.',
    description:
      'The RM 011 Flyback Chronograph in NTPT carbon, the model that established Richard Mille’s contemporary collector following. Skeletonised automatic movement with flyback chronograph, annual calendar and 60-minute countdown. Acquired from the secondary market in 2019 with full provenance. Lightweight case, exceptional wrist presence; among the most liquid references in the marque.',
    marketReference:
      'Comparable: RM 011 NTPT carbon achieved HK$2.3m (US$294,000) at a Hong Kong auction, May 2025.',
    valueHistory: [
      { date: '2019', value: 210_000 },
      { date: '2020', value: 225_000 },
      { date: '2021', value: 280_000 },
      { date: '2022', value: 310_000 },
      { date: '2023', value: 286_000 },
      { date: '2024', value: 290_000 },
      { date: '2025', value: 293_000 },
      { date: '2026', value: 295_000 },
    ],
    provenance: [
      { id: 'p1', title: 'Specialist dealer', detail: 'Secondary, Nov 2019' },
      { id: 'p2', title: 'Family collection', detail: 'Held since acquisition' },
      { id: 'p3', title: 'Specialist valuation', detail: 'Apr 2026' },
    ],
  },
  {
    id: 'wine-cellar',
    name: 'Grand Cru Cellar Allocation',
    subtitle: 'Bordeaux 1er Cru & Côte de Nuits · 1,840 bottles',
    category: 'Wine',
    acquisitionPrice: 380_000,
    acquisitionDate: '2018-02-10',
    currentValue: 520_000,
    lastValued: '2026-02-28',
    blurb:
      'A standing cellar of first-growth Bordeaux and grand-cru Burgundy, stored in bond.',
    description:
      'A curated cellar built en primeur from 2010 onward: verticals of first-growth Bordeaux (Lafite, Latour, Margaux) and grand-cru Burgundy from the Côte de Nuits, alongside a deep Champagne reserve. 1,840 bottles held in professional bonded storage in London, fully insured and provenance-tracked, with cellar-management records since first purchase. Drinking windows are actively managed; the allocation is rebalanced annually.',
    marketReference:
      'Benchmark: the Liv-ex Fine Wine 1000 index returned roughly +37% over the holding period; recent first-growth case prices corroborate the mark.',
    valueHistory: [
      { date: '2018', value: 380_000 },
      { date: '2019', value: 405_000 },
      { date: '2020', value: 430_000 },
      { date: '2021', value: 478_000 },
      { date: '2022', value: 535_000 },
      { date: '2023', value: 505_000 },
      { date: '2024', value: 512_000 },
      { date: '2026', value: 520_000 },
    ],
    provenance: [
      { id: 'p1', title: 'En primeur purchases', detail: 'From 2010' },
      { id: 'p2', title: 'Bonded storage, London', detail: 'In bond since 2018' },
      { id: 'p3', title: 'Cellar valuation', detail: 'Feb 2026' },
    ],
  },
  {
    id: 'auto-ferrari',
    name: 'Ferrari 275 GTB/4',
    subtitle: 'Scaglietti coachwork · 1967 · matching numbers',
    category: 'Automobiles',
    acquisitionPrice: 2_400_000,
    acquisitionDate: '2017-07-03',
    currentValue: 3_600_000,
    lastValued: '2026-01-20',
    blurb:
      'Four-cam, matching-numbers 275 GTB/4 in Rosso Corsa. Classiche-certified.',
    description:
      'A 1967 Ferrari 275 GTB/4 with Pininfarina-designed, Scaglietti-built berlinetta coachwork and the four-cam V12. Matching-numbers engine, gearbox and body, finished in Rosso Corsa over Nero leather. Ferrari Classiche “Red Book” certified, with documented ownership history and a continuous service record. Eligible for the most prestigious touring and concours events. Stored in a climate-controlled collection in Hong Kong.',
    marketReference:
      'Comparable: a matching-numbers 275 GTB/4 sold US$3.55m at a Monterey auction, Aug 2024.',
    valueHistory: [
      { date: '2017', value: 2_400_000 },
      { date: '2018', value: 2_650_000 },
      { date: '2019', value: 2_900_000 },
      { date: '2020', value: 2_850_000 },
      { date: '2021', value: 3_100_000 },
      { date: '2022', value: 3_350_000 },
      { date: '2023', value: 3_300_000 },
      { date: '2024', value: 3_480_000 },
      { date: '2025', value: 3_550_000 },
      { date: '2026', value: 3_600_000 },
    ],
    provenance: [
      { id: 'p1', title: 'First owner, Italy', detail: 'Delivered 1967' },
      { id: 'p2', title: 'European collection', detail: '1991–2017' },
      { id: 'p3', title: 'Family collection', detail: 'Acquired Jul 2017' },
      { id: 'p4', title: 'Classiche certification', detail: 'Red Book, 2018' },
    ],
  },
  {
    id: 're-townhouse',
    name: 'Chester Square Townhouse',
    subtitle: 'Belgravia, London SW1 · Grade II listed',
    category: 'Real Estate',
    acquisitionPrice: 14_500_000,
    acquisitionDate: '2015-11-25',
    currentValue: 18_200_000,
    lastValued: '2026-03-31',
    blurb:
      'A stucco-fronted Grade II listed townhouse on a garden square in Belgravia.',
    description:
      'A six-storey, stucco-fronted Grade II listed townhouse on one of Belgravia’s most sought-after garden squares, with approximately 7,100 sq ft of accommodation, a passenger lift, off-street parking and access to the private communal gardens. Comprehensively refurbished in 2016 to an exacting specification. Held freehold through a family holding structure; let on a confidential basis between family use. Valuation reflects prime central London pricing as at the last RICS appraisal.',
    marketReference:
      'Comparable: a refurbished Chester Square house of similar footprint was placed under offer near £15.8m (US$19.9m) in Q4 2025.',
    valueHistory: [
      { date: '2015', value: 14_500_000 },
      { date: '2017', value: 15_400_000 },
      { date: '2019', value: 16_100_000 },
      { date: '2021', value: 16_800_000 },
      { date: '2022', value: 17_400_000 },
      { date: '2023', value: 17_200_000 },
      { date: '2024', value: 17_700_000 },
      { date: '2025', value: 18_000_000 },
      { date: '2026', value: 18_200_000 },
    ],
    provenance: [
      { id: 'p1', title: 'Vendor (private treaty)', detail: 'Acquired Nov 2015' },
      { id: 'p2', title: 'Refurbishment', detail: 'Completed 2016' },
      { id: 'p3', title: 'Family holding structure', detail: 'Freehold' },
      { id: 'p4', title: 'RICS appraisal', detail: 'Mar 2026' },
    ],
  },
]

/** Collection-level valuation curve (USD), year-end snapshots. */
export const COLLECTION_VALUE_HISTORY: ValuePoint[] = [
  { date: '2017', value: 16_200_000 },
  { date: '2018', value: 18_050_000 },
  { date: '2019', value: 22_900_000 },
  { date: '2020', value: 23_700_000 },
  { date: '2021', value: 26_600_000 },
  { date: '2022', value: 28_200_000 },
  { date: '2023', value: 27_300_000 },
  { date: '2024', value: 28_650_000 },
  { date: '2025', value: 29_300_000 },
  { date: '2026', value: 29_672_000 },
]

// ---- derived helpers --------------------------------------------------------

export function categoryColor(category: Category): string {
  return CATEGORY_META.find((c) => c.key === category)?.color ?? '#2A3A52'
}

export interface CategorySummary {
  key: Category
  color: string
  note: string
  count: number
  value: number
  cost: number
  gain: number
  gainPct: number
}

export function categorySummaries(): CategorySummary[] {
  return CATEGORY_META.map((meta) => {
    const items = COLLECTION.filter((p) => p.category === meta.key)
    const value = items.reduce((s, p) => s + p.currentValue, 0)
    const cost = items.reduce((s, p) => s + p.acquisitionPrice, 0)
    const gain = value - cost
    return {
      key: meta.key,
      color: meta.color,
      note: meta.note,
      count: items.length,
      value,
      cost,
      gain,
      gainPct: cost > 0 ? (gain / cost) * 100 : 0,
    }
  })
}

export interface CollectionTotals {
  value: number
  cost: number
  gain: number
  gainPct: number
  itemCount: number
  shareOfWealth: number // 0..1
}

export function collectionTotals(): CollectionTotals {
  const value = COLLECTION.reduce((s, p) => s + p.currentValue, 0)
  const cost = COLLECTION.reduce((s, p) => s + p.acquisitionPrice, 0)
  const gain = value - cost
  return {
    value,
    cost,
    gain,
    gainPct: cost > 0 ? (gain / cost) * 100 : 0,
    itemCount: COLLECTION.length,
    shareOfWealth: value / TOTAL_FAMILY_WEALTH,
  }
}
