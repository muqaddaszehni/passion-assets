import { categorySummaries } from '../data/collection'
import { useActiveClient } from '../state/ClientsContext'
import type { Category } from '../types'
import { formatCompactUSD, formatPct } from '../lib/format'

export default function CategoryCards({
  active,
  onSelect,
}: {
  active: Category | 'All'
  onSelect: (c: Category) => void
}) {
  const client = useActiveClient()
  const summaries = categorySummaries(client.holdings)

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-3 lg:grid-cols-5">
      {summaries.map((s) => {
        const isActive = active === s.key
        return (
          <button
            key={s.key}
            onClick={() => onSelect(s.key)}
            className={`group relative flex flex-col items-start bg-ivory px-4 py-5 text-left transition-colors duration-200 hover:bg-white ${
              isActive ? 'bg-white' : ''
            }`}
          >
            <span
              className="absolute left-0 top-0 h-full w-[3px] transition-opacity duration-200"
              style={{
                backgroundColor: s.color,
                opacity: isActive ? 1 : 0,
              }}
            />
            <span
              className="mb-3 inline-block h-2.5 w-2.5"
              style={{ backgroundColor: s.color }}
            />
            <span className="eyebrow text-charcoal/55">{s.key}</span>
            <span className="tnum mt-2 font-serif text-2xl leading-none text-navy">
              {formatCompactUSD(s.value)}
            </span>
            <span className="mt-2 text-xs text-charcoal/55">
              {s.count} {s.count === 1 ? 'holding' : 'holdings'}
            </span>
            <span
              className="tnum mt-0.5 text-xs"
              style={{
                color: s.count === 0 ? '#1C1C1C40' : s.gain >= 0 ? '#4A5A4E' : '#7A3B47',
              }}
            >
              {s.count === 0 ? '—' : formatPct(s.gainPct)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
