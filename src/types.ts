export type Category =
  | 'Art'
  | 'Watches'
  | 'Wine'
  | 'Automobiles'
  | 'Real Estate'

export interface ValuePoint {
  /** ISO-ish label, e.g. "2019" or "2024 Q2" */
  date: string
  /** value in USD */
  value: number
}

export interface ProvenanceStep {
  id: string
  title: string
  detail: string
}

export interface Piece {
  id: string
  name: string
  /** maker, artist, region, district — the line beneath the name */
  subtitle: string
  category: Category
  acquisitionPrice: number
  acquisitionDate: string // ISO yyyy-mm-dd
  currentValue: number
  lastValued: string // ISO yyyy-mm-dd
  /** short line shown on the gallery plate */
  blurb: string
  /** full catalogue description on the detail view */
  description: string
  /** comparable auction / market reference */
  marketReference: string
  /** per-piece valuation history for the detail chart */
  valueHistory: ValuePoint[]
  /** ownership / valuation chain shown as a node diagram */
  provenance: ProvenanceStep[]
}

export interface CategoryMeta {
  key: Category
  /** muted swatch used in charts and accents */
  color: string
  /** one-line character note for the category */
  note: string
}
