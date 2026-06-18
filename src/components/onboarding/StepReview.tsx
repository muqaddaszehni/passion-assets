import type { Piece } from '../../types'
import {
  categorySummaries,
  collectionTotals,
  categoryColor,
} from '../../data/collection'
import {
  formatCompactUSD,
  formatDate,
  formatPct,
  formatSignedCompactUSD,
} from '../../lib/format'
import { buildClient, type ClientDraft } from './helpers'

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="eyebrow text-charcoal/45">{label}</div>
      <div
        className={`tnum mt-1.5 font-serif text-2xl leading-none ${
          accent ? 'text-brass' : 'text-navy'
        }`}
      >
        {value}
      </div>
    </div>
  )
}

export default function StepReview({
  draft,
  holdings,
  onBack,
  onConfirm,
}: {
  draft: ClientDraft
  holdings: Piece[]
  onBack: () => void
  onConfirm: () => void
}) {
  const client = buildClient(draft, holdings)
  const totals = collectionTotals(client.holdings, client.totalFamilyWealth)
  const summaries = categorySummaries(holdings).filter((s) => s.count > 0)

  return (
    <div>
      <div className="eyebrow text-charcoal/45">Step 3 of 3</div>
      <h3 className="mt-1 font-serif text-2xl text-navy">Review & confirm</h3>
      <p className="mt-1 text-sm text-charcoal/55">
        Confirm the details below to publish {client.officeName}’s private register.
      </p>

      {/* client + totals */}
      <div className="card mt-6 p-6">
        <div className="flex flex-col gap-1 border-b border-hairline pb-5">
          <span className="font-serif text-2xl text-navy">{client.officeName}</span>
          <span className="text-sm text-charcoal/55">
            {client.familyName} · as at {formatDate(client.asOf)}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          <Stat label="Collection Value" value={formatCompactUSD(totals.value)} />
          <Stat label="Cost Basis" value={formatCompactUSD(totals.cost)} />
          <Stat
            label="Unrealised Gain"
            value={formatSignedCompactUSD(totals.gain)}
            accent
          />
          <Stat label="Return" value={formatPct(totals.gainPct)} accent />
        </div>

        <div className="mt-5 border-t border-hairline pt-4 text-sm text-charcoal/60">
          <span className="tnum">
            {totals.itemCount} holdings ·{' '}
            {(totals.shareOfWealth * 100).toFixed(1)}% of family wealth (
            {formatCompactUSD(client.totalFamilyWealth)})
          </span>
        </div>
      </div>

      {/* by category */}
      {summaries.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {summaries.map((s) => (
            <div key={s.key} className="border border-hairline bg-white p-3">
              <span
                className="mb-2 inline-block h-2 w-2"
                style={{ backgroundColor: s.color }}
              />
              <div className="eyebrow text-charcoal/50">{s.key}</div>
              <div className="tnum mt-1 font-serif text-lg text-navy">
                {formatCompactUSD(s.value)}
              </div>
              <div className="text-[11px] text-charcoal/45">
                {s.count} {s.count === 1 ? 'holding' : 'holdings'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* holdings list */}
      <ul className="mt-6 divide-y divide-hairline border-t border-hairline">
        {holdings.map((p) => {
          const gp =
            ((p.currentValue - p.acquisitionPrice) / p.acquisitionPrice) * 100
          return (
            <li key={p.id} className="flex items-center gap-3 py-3">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0"
                style={{ backgroundColor: categoryColor(p.category) }}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-serif text-[15px] text-navy">
                  {p.name}
                </span>
                <span className="block truncate text-xs text-charcoal/50">
                  {p.subtitle}
                </span>
              </span>
              <span className="tnum shrink-0 text-right text-sm">
                <span className="block text-navy">{formatCompactUSD(p.currentValue)}</span>
                <span
                  className="block text-xs"
                  style={{ color: gp >= 0 ? '#4A5A4E' : '#7A3B47' }}
                >
                  {formatPct(gp)}
                </span>
              </span>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-hairline pt-5">
        <button
          onClick={onBack}
          className="eyebrow text-charcoal/55 transition-colors hover:text-navy"
        >
          ← Back
        </button>
        <button
          onClick={onConfirm}
          className="eyebrow border border-brass bg-brass px-7 py-2.5 text-navy transition-colors hover:bg-brass/90"
        >
          Confirm & open dashboard
        </button>
      </div>
    </div>
  )
}
