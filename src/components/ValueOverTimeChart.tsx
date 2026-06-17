import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import { COLLECTION_VALUE_HISTORY } from '../data/collection'
import Panel from './Panel'
import { formatCompactUSD, formatPct } from '../lib/format'

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null
  const value = payload[0].value as number
  return (
    <div className="border border-hairline bg-white px-3 py-2 shadow-card">
      <div className="eyebrow text-charcoal/45">{label}</div>
      <div className="tnum mt-0.5 font-serif text-lg text-navy">
        {formatCompactUSD(value)}
      </div>
    </div>
  )
}

export default function ValueOverTimeChart() {
  const data = COLLECTION_VALUE_HISTORY
  const first = data[0].value
  const last = data[data.length - 1].value
  const change = ((last - first) / first) * 100

  return (
    <Panel
      eyebrow="Trajectory"
      title="Value Over Time"
      right={
        <div className="text-right">
          <div className="eyebrow text-charcoal/45">
            {data[0].date}–{data[data.length - 1].date}
          </div>
          <div className="tnum font-serif text-xl text-brass">
            {formatPct(change)}
          </div>
        </div>
      }
    >
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="valueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2A3A52" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#2A3A52" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#D8D2C6"
              strokeDasharray="2 4"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{ stroke: '#D8D2C6' }}
              tick={{ fill: '#1C1C1C99', fontSize: 11 }}
              dy={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              tick={{ fill: '#1C1C1C99', fontSize: 11 }}
              tickFormatter={(v) => formatCompactUSD(v as number)}
              domain={['dataMin - 2000000', 'dataMax + 1000000']}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: '#B0904F', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0E1B2E"
              strokeWidth={1.75}
              fill="url(#valueFill)"
              dot={{ r: 2.5, fill: '#B0904F', stroke: '#B0904F' }}
              activeDot={{ r: 4.5, fill: '#B0904F', stroke: '#fff', strokeWidth: 1.5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
