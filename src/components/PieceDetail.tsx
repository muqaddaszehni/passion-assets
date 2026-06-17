import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import type { Piece } from '../types'
import { categoryColor } from '../data/collection'
import PiecePlaceholder from './PiecePlaceholder'
import ProvenanceFlow from './ProvenanceFlow'
import {
  formatCompactUSD,
  formatDate,
  formatPct,
  formatSignedCompactUSD,
  formatUSD,
} from '../lib/format'

function MiniTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="border border-hairline bg-white px-2.5 py-1.5 shadow-card">
      <div className="eyebrow text-charcoal/45">{label}</div>
      <div className="tnum text-sm font-medium text-navy">
        {formatCompactUSD(payload[0].value as number)}
      </div>
    </div>
  )
}

function Fact({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="eyebrow text-charcoal/45">{label}</div>
      <div
        className={`tnum mt-1.5 font-serif text-xl leading-none ${
          accent ? 'text-brass' : 'text-navy'
        }`}
      >
        {value}
      </div>
    </div>
  )
}

export default function PieceDetail({
  piece,
  onBack,
}: {
  piece: Piece
  onBack: () => void
}) {
  const gain = piece.currentValue - piece.acquisitionPrice
  const gainPct = (gain / piece.acquisitionPrice) * 100
  const color = categoryColor(piece.category)

  return (
    <div className="rise">
      <button
        onClick={onBack}
        className="eyebrow mb-6 inline-flex items-center gap-2 text-charcoal/55 transition-colors hover:text-navy"
      >
        <span aria-hidden>←</span> Back to the register
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* left: plate + provenance + history */}
        <div className="flex flex-col gap-6">
          <div className="card relative aspect-[4/3] w-full overflow-hidden">
            <PiecePlaceholder
              category={piece.category}
              className="h-full w-full"
            />
            <span className="eyebrow absolute left-4 top-4 bg-navy/0 text-brass/80">
              {piece.category}
            </span>
          </div>

          <section className="card px-5 py-5 sm:px-6">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <div className="eyebrow text-brass">Valuation History</div>
                <h3 className="mt-1 font-serif text-xl text-navy">
                  Estimated value
                </h3>
              </div>
              <div className="tnum text-right text-sm">
                <span style={{ color: gain >= 0 ? '#4A5A4E' : '#7A3B47' }}>
                  {formatPct(gainPct)}
                </span>
                <div className="text-xs text-charcoal/45">since acquisition</div>
              </div>
            </div>
            <div className="h-[170px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={piece.valueHistory}
                  margin={{ top: 6, right: 6, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id={`fill-${piece.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={{ stroke: '#D8D2C6' }}
                    tick={{ fill: '#1C1C1C99', fontSize: 10 }}
                    dy={6}
                  />
                  <YAxis
                    hide
                    domain={['dataMin - dataMin*0.05', 'dataMax + dataMax*0.04']}
                  />
                  <Tooltip
                    content={<MiniTooltip />}
                    cursor={{ stroke: '#B0904F', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={1.75}
                    fill={`url(#fill-${piece.id})`}
                    dot={{ r: 2, fill: '#B0904F', stroke: '#B0904F' }}
                    activeDot={{ r: 4, fill: '#B0904F', stroke: '#fff', strokeWidth: 1.5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* right: catalogue entry */}
        <div className="flex flex-col">
          <span
            className="eyebrow inline-flex w-fit items-center gap-2 text-charcoal/55"
          >
            <span
              className="inline-block h-2.5 w-2.5"
              style={{ backgroundColor: color }}
            />
            {piece.category}
          </span>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-navy sm:text-5xl">
            {piece.name}
          </h1>
          <p className="mt-2 text-charcoal/60">{piece.subtitle}</p>

          <div className="my-6 h-px w-full bg-hairline" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            <Fact label="Est. Value" value={formatCompactUSD(piece.currentValue)} />
            <Fact label="Acquisition" value={formatCompactUSD(piece.acquisitionPrice)} />
            <Fact
              label="Gain"
              value={formatSignedCompactUSD(gain)}
              accent
            />
            <Fact label="Return" value={formatPct(gainPct)} accent />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-charcoal/60">
            <div className="flex justify-between border-b border-hairline py-2">
              <span className="text-charcoal/45">Acquired</span>
              <span className="tnum text-charcoal">
                {formatDate(piece.acquisitionDate)}
              </span>
            </div>
            <div className="flex justify-between border-b border-hairline py-2">
              <span className="text-charcoal/45">Last valued</span>
              <span className="tnum text-charcoal">
                {formatDate(piece.lastValued)}
              </span>
            </div>
            <div className="col-span-2 flex justify-between border-b border-hairline py-2">
              <span className="text-charcoal/45">Current estimate (full)</span>
              <span className="tnum text-charcoal">
                {formatUSD(piece.currentValue)}
              </span>
            </div>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-charcoal/80">
            {piece.description}
          </p>

          {/* market reference */}
          <div className="mt-6 border-l-2 border-brass bg-ivory/60 px-4 py-3">
            <div className="eyebrow text-brass">Market Reference</div>
            <p className="mt-1.5 text-sm italic leading-relaxed text-charcoal/75">
              {piece.marketReference}
            </p>
          </div>

          {/* provenance */}
          <div className="mt-7">
            <div className="eyebrow mb-3 text-charcoal/55">
              Provenance &amp; Valuation Chain
            </div>
            <ProvenanceFlow steps={piece.provenance} />
          </div>
        </div>
      </div>
    </div>
  )
}
