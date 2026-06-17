/** Full currency, e.g. $6,800,000 */
export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Compact currency for headline figures, e.g. $6.80M, $29.7M, $295M */
export function formatCompactUSD(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1_000_000_000)
    return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`
  if (abs >= 1_000_000) {
    const m = abs / 1_000_000
    return `${sign}$${m >= 100 ? m.toFixed(0) : m.toFixed(2)}M`
  }
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(0)}K`
  return `${sign}$${abs.toFixed(0)}`
}

/** Signed percent, e.g. +35.9% */
export function formatPct(value: number, digits = 1): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}%`
}

/** Signed compact currency, e.g. +$7.84M */
export function formatSignedCompactUSD(value: number): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  return `${sign}${formatCompactUSD(Math.abs(value))}`
}

/** "14 May 2019" */
export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

/** "May 2019" */
export function formatMonthYear(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
  }).format(d)
}
