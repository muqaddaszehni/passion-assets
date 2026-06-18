import type { Category, Client, Piece, ValuePoint } from '../../types'
import { formatMonthYear } from '../../lib/format'

export const CATEGORY_OPTIONS: Category[] = [
  'Art',
  'Watches',
  'Wine',
  'Automobiles',
  'Real Estate',
]

export interface ClientDraft {
  officeName: string
  familyName: string
  asOf: string
  totalFamilyWealth: string // raw input; parsed on build
}

export interface HoldingForm {
  name: string
  subtitle: string
  category: Category
  acquisitionPrice: string
  acquisitionDate: string
  currentValue: string
  lastValued: string
  description: string
  marketReference: string
}

export function emptyHoldingForm(): HoldingForm {
  return {
    name: '',
    subtitle: '',
    category: 'Art',
    acquisitionPrice: '',
    acquisitionDate: '',
    currentValue: '',
    lastValued: '',
    description: '',
    marketReference: '',
  }
}

const yearOf = (iso: string) => new Date(iso + 'T00:00:00').getFullYear()

/** Linear yearly curve from (acqYear, cost) to (valYear, current value). */
function buildValueHistory(
  acqDate: string,
  acqVal: number,
  valDate: string,
  curVal: number,
): ValuePoint[] {
  const y0 = yearOf(acqDate)
  const y1 = Math.max(yearOf(valDate), y0)
  if (y1 === y0) return [{ date: String(y0), value: curVal }]
  const points: ValuePoint[] = []
  for (let y = y0; y <= y1; y++) {
    const t = (y - y0) / (y1 - y0)
    points.push({ date: String(y), value: Math.round(acqVal + t * (curVal - acqVal)) })
  }
  return points
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32)
}

function makeId(prefix: string, name: string) {
  const rand = Math.random().toString(36).slice(2, 7)
  return `${prefix}-${slugify(name) || 'item'}-${rand}`
}

export interface HoldingValidation {
  ok: boolean
  errors: Partial<Record<keyof HoldingForm, string>>
}

export function validateHolding(form: HoldingForm): HoldingValidation {
  const errors: HoldingValidation['errors'] = {}
  if (!form.name.trim()) errors.name = 'Required'
  const acq = Number(form.acquisitionPrice)
  if (!form.acquisitionPrice || !(acq > 0)) errors.acquisitionPrice = 'Enter an amount'
  const cur = Number(form.currentValue)
  if (!form.currentValue || !(cur > 0)) errors.currentValue = 'Enter an amount'
  if (!form.acquisitionDate) errors.acquisitionDate = 'Required'
  return { ok: Object.keys(errors).length === 0, errors }
}

/** Build a complete Piece from a validated holding form. */
export function buildPiece(form: HoldingForm, todayIso: string): Piece {
  const acquisitionPrice = Number(form.acquisitionPrice)
  const currentValue = Number(form.currentValue)
  const lastValued = form.lastValued || todayIso
  const acquisitionDate = form.acquisitionDate

  return {
    id: makeId('h', form.name),
    name: form.name.trim(),
    subtitle: form.subtitle.trim() || form.category,
    category: form.category,
    acquisitionPrice,
    acquisitionDate,
    currentValue,
    lastValued,
    blurb: form.description.trim().slice(0, 140) || `${form.category} holding.`,
    description:
      form.description.trim() ||
      'Added during client onboarding. A fuller catalogue description and condition report can be attached on review.',
    marketReference:
      form.marketReference.trim() ||
      'No external comparable recorded yet — to be sourced at the next valuation review.',
    valueHistory: buildValueHistory(
      acquisitionDate,
      acquisitionPrice,
      lastValued,
      currentValue,
    ),
    provenance: [
      { id: 'p1', title: 'Acquired', detail: formatMonthYear(acquisitionDate) },
      { id: 'p2', title: 'Current valuation', detail: formatMonthYear(lastValued) },
    ],
  }
}

/** Assemble the final Client from the client draft + built holdings. */
export function buildClient(draft: ClientDraft, holdings: Piece[]): Client {
  const wealth = Number(draft.totalFamilyWealth)
  return {
    id: makeId('c', draft.officeName),
    officeName: draft.officeName.trim() || 'New Family Office',
    familyName: draft.familyName.trim() || draft.officeName.trim() || 'New Family',
    asOf: draft.asOf,
    totalFamilyWealth:
      wealth > 0 ? wealth : holdings.reduce((s, p) => s + p.currentValue, 0),
    holdings,
    // valueHistory intentionally omitted — derived from holdings on display.
  }
}
