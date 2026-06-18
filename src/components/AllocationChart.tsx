import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { categorySummaries, collectionTotals } from '../data/collection'
import { useActiveClient } from '../state/ClientsContext'
import Panel from './Panel'
import { formatCompactUSD } from '../lib/format'

export default function AllocationChart() {
  const client = useActiveClient()
  const data = categorySummaries(client.holdings).filter((d) => d.value > 0)
  const total = collectionTotals(
    client.holdings,
    client.totalFamilyWealth,
  ).value

  return (
    <Panel eyebrow="Composition" title="Allocation by Category">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <div className="relative h-[210px] w-[210px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="key"
                cx="50%"
                cy="50%"
                innerRadius={66}
                outerRadius={96}
                paddingAngle={1.5}
                stroke="#F7F4EE"
                strokeWidth={2}
                startAngle={90}
                endAngle={-270}
                isAnimationActive={false}
              >
                {data.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="eyebrow text-charcoal/45">Total</span>
            <span className="tnum font-serif text-2xl text-navy">
              {formatCompactUSD(total)}
            </span>
          </div>
        </div>

        <ul className="w-full flex-1 divide-y divide-hairline">
          {data.map((d) => {
            const pct = (d.value / total) * 100
            return (
              <li
                key={d.key}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="inline-block h-2.5 w-2.5"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-sm text-charcoal">{d.key}</span>
                </span>
                <span className="tnum flex items-baseline gap-3 text-sm">
                  <span className="text-charcoal/55">{pct.toFixed(1)}%</span>
                  <span className="w-20 text-right font-medium text-navy">
                    {formatCompactUSD(d.value)}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </Panel>
  )
}
