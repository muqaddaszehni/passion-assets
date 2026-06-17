import { useMemo } from 'react'
import { COLLECTION } from '../data/collection'
import type { Category } from '../types'
import PieceCard from './PieceCard'

export type SortKey = 'value' | 'gain' | 'recent'

const CATEGORIES: (Category | 'All')[] = [
  'All',
  'Art',
  'Watches',
  'Wine',
  'Automobiles',
  'Real Estate',
]

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'value', label: 'Value' },
  { key: 'gain', label: 'Gain %' },
  { key: 'recent', label: 'Recently valued' },
]

function gainPct(p: (typeof COLLECTION)[number]) {
  return (p.currentValue - p.acquisitionPrice) / p.acquisitionPrice
}

export default function Gallery({
  filter,
  sort,
  onFilter,
  onSort,
  onOpen,
}: {
  filter: Category | 'All'
  sort: SortKey
  onFilter: (c: Category | 'All') => void
  onSort: (s: SortKey) => void
  onOpen: (id: string) => void
}) {
  const pieces = useMemo(() => {
    const filtered =
      filter === 'All'
        ? COLLECTION
        : COLLECTION.filter((p) => p.category === filter)
    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'value') return b.currentValue - a.currentValue
      if (sort === 'gain') return gainPct(b) - gainPct(a)
      return +new Date(b.lastValued) - +new Date(a.lastValued)
    })
    return sorted
  }, [filter, sort])

  return (
    <section>
      <div className="mb-5 flex flex-col gap-4 border-b border-hairline pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="eyebrow text-brass">The Register</div>
          <h2 className="mt-1 font-serif text-3xl leading-tight text-navy">
            Individual Holdings
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          {/* category filter */}
          <div className="flex flex-wrap gap-x-1 gap-y-1.5">
            {CATEGORIES.map((c) => {
              const active = filter === c
              return (
                <button
                  key={c}
                  onClick={() => onFilter(c)}
                  className={`eyebrow border px-3 py-1.5 transition-colors duration-200 ${
                    active
                      ? 'border-navy bg-navy text-ivory'
                      : 'border-hairline text-charcoal/60 hover:border-brass hover:text-navy'
                  }`}
                >
                  {c}
                </button>
              )
            })}
          </div>

          {/* sort */}
          <div className="flex items-center gap-2">
            <span className="eyebrow text-charcoal/40">Sort</span>
            <div className="flex border border-hairline">
              {SORTS.map((s, i) => {
                const active = sort === s.key
                return (
                  <button
                    key={s.key}
                    onClick={() => onSort(s.key)}
                    className={`px-3 py-1.5 text-xs transition-colors duration-200 ${
                      i > 0 ? 'border-l border-hairline' : ''
                    } ${
                      active
                        ? 'bg-brass/15 font-medium text-navy'
                        : 'text-charcoal/55 hover:text-navy'
                    }`}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pieces.map((p) => (
          <PieceCard key={p.id} piece={p} onOpen={onOpen} />
        ))}
      </div>

      {pieces.length === 0 && (
        <p className="py-12 text-center text-sm text-charcoal/50">
          No holdings in this category.
        </p>
      )}
    </section>
  )
}
