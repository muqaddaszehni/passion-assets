import { useState } from 'react'
import { collectionTotals } from '../data/collection'
import { useActiveClient } from '../state/ClientsContext'
import {
  formatCompactUSD,
  formatPct,
  formatSignedCompactUSD,
  formatUSD,
} from '../lib/format'

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div>
      <div className="eyebrow text-charcoal/45">{label}</div>
      <div
        className={`tnum mt-1 font-serif leading-none ${
          accent ? 'text-brass' : 'text-navy'
        } text-3xl sm:text-[2.6rem]`}
      >
        {value}
      </div>
      {sub && <div className="tnum mt-1.5 text-sm text-charcoal/60">{sub}</div>}
    </div>
  )
}

export default function DashboardHeader() {
  const client = useActiveClient()
  const t = collectionTotals(client.holdings, client.totalFamilyWealth)
  const totalFamilyWealth = client.totalFamilyWealth
  const [showShare, setShowShare] = useState(false)
  const sharePct = t.shareOfWealth * 100

  return (
    <section className="rise card relative px-6 py-8 sm:px-10 sm:py-10">
      {/* brass corner ticks, like an engraved certificate */}
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-brass/50" />
      <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-brass/50" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-brass/50" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-brass/50" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="eyebrow text-brass">Total Collection Value</div>
          <div className="tnum mt-2 font-serif text-5xl leading-none text-navy sm:text-6xl">
            {formatCompactUSD(t.value)}
          </div>
          <div className="tnum mt-2 text-sm text-charcoal/55">
            {formatUSD(t.value)} · {t.itemCount} holdings across 5 categories
          </div>
        </div>

        {/* wealth toggle */}
        <label className="flex cursor-pointer select-none items-center gap-3 self-start sm:self-end">
          <span className="eyebrow text-charcoal/55">
            Show as % of family wealth
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={showShare}
            onClick={() => setShowShare((v) => !v)}
            className={`relative h-6 w-11 border transition-colors duration-300 ${
              showShare
                ? 'border-brass bg-brass/90'
                : 'border-hairline bg-ivory'
            }`}
          >
            <span
              className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 bg-white shadow-plate transition-all duration-300 ${
                showShare ? 'left-[26px]' : 'left-[3px]'
              }`}
            />
          </button>
        </label>
      </div>

      <div className="my-7 h-px w-full bg-hairline" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
        <Stat
          label="Total Cost Basis"
          value={formatCompactUSD(t.cost)}
          sub={formatUSD(t.cost)}
        />
        <Stat
          label="Unrealised Gain"
          value={formatSignedCompactUSD(t.gain)}
          sub={`${formatPct(t.gainPct)} since acquisition`}
          accent
        />
        <Stat
          label="Categories"
          value="5"
          sub="Art · Watches · Wine · Autos · Property"
        />
      </div>

      {/* family-wealth reveal */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          showShare ? 'mt-7 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border border-hairline bg-ivory/60 px-5 py-5">
            <div className="flex items-baseline justify-between">
              <div className="eyebrow text-charcoal/55">
                Passion assets as a share of total family wealth
              </div>
              <div className="tnum font-serif text-2xl text-brass">
                {sharePct.toFixed(1)}%
              </div>
            </div>

            {/* proportion bar */}
            <div className="mt-4 flex h-7 w-full overflow-hidden border border-hairline">
              <div
                className="flex items-center bg-navy"
                style={{ width: `${sharePct}%` }}
                title={`Passion assets · ${formatCompactUSD(t.value)}`}
              />
              <div
                className="flex items-center bg-brass/25"
                style={{ width: `${100 - sharePct}%` }}
                title={`Other family wealth · ${formatCompactUSD(
                  totalFamilyWealth - t.value,
                )}`}
              />
            </div>

            <div className="tnum mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-charcoal/60">
              <span className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 bg-navy" />
                Passion assets · {formatCompactUSD(t.value)}
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 bg-brass/25" />
                Other family wealth ·{' '}
                {formatCompactUSD(totalFamilyWealth - t.value)}
              </span>
              <span className="text-charcoal/45">
                Total {formatCompactUSD(totalFamilyWealth)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
