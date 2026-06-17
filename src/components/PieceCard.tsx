import type { Piece } from '../types'
import PiecePlaceholder from './PiecePlaceholder'
import {
  formatCompactUSD,
  formatMonthYear,
  formatPct,
} from '../lib/format'

export default function PieceCard({
  piece,
  onOpen,
}: {
  piece: Piece
  onOpen: (id: string) => void
}) {
  const gainPct =
    ((piece.currentValue - piece.acquisitionPrice) / piece.acquisitionPrice) *
    100
  const up = gainPct >= 0

  return (
    <button
      onClick={() => onOpen(piece.id)}
      className="group card flex flex-col overflow-hidden text-left transition-all duration-300 hover:shadow-plate hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] w-full">
        <PiecePlaceholder
          category={piece.category}
          label={piece.category}
          className="h-full w-full"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-4">
        <h3 className="font-serif text-lg leading-snug text-navy transition-colors group-hover:text-brass">
          {piece.name}
        </h3>
        <p className="mt-0.5 text-xs text-charcoal/55">{piece.subtitle}</p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="eyebrow text-charcoal/40">Est. Value</div>
            <div className="tnum mt-1 font-serif text-xl text-navy">
              {formatCompactUSD(piece.currentValue)}
            </div>
          </div>
          <div className="text-right">
            <div className="eyebrow text-charcoal/40">Change</div>
            <div
              className="tnum mt-1 text-sm font-medium"
              style={{ color: up ? '#4A5A4E' : '#7A3B47' }}
            >
              {formatPct(gainPct)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3 text-[11px] text-charcoal/45">
          <span className="tnum">
            Acq. {formatCompactUSD(piece.acquisitionPrice)}
          </span>
          <span>Valued {formatMonthYear(piece.lastValued)}</span>
        </div>
      </div>
    </button>
  )
}
