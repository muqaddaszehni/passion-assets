import type { Category } from '../types'

/**
 * Image stand-in styled as an auction-catalogue plate: a refined brass
 * line motif per category on midnight navy, with a hairline inner frame.
 * No external image assets — everything is drawn inline.
 */

const STROKE = '#B0904F'

function Motif({ category }: { category: Category }) {
  const common = {
    fill: 'none',
    stroke: STROKE,
    strokeWidth: 1.25,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    vectorEffect: 'non-scaling-stroke' as const,
  }

  switch (category) {
    case 'Art':
      return (
        <g {...common}>
          <rect x="34" y="26" width="92" height="68" />
          <rect x="40" y="32" width="80" height="56" opacity={0.55} />
          <path d="M40 74 L70 58 L90 70 L120 50" />
          <circle cx="58" cy="48" r="5" />
        </g>
      )
    case 'Watches':
      return (
        <g {...common}>
          <circle cx="80" cy="60" r="30" />
          <circle cx="80" cy="60" r="24" opacity={0.5} />
          <path d="M80 60 L80 44" />
          <path d="M80 60 L93 66" />
          <path d="M80 26 l-7 -8 h14 z" />
          <path d="M80 94 l-7 8 h14 z" />
          <circle cx="80" cy="60" r="1.6" fill={STROKE} />
        </g>
      )
    case 'Wine':
      return (
        <g {...common}>
          <path d="M70 24 h10 v14 c10 6 12 14 12 24 v22 c0 4 -3 6 -7 6 h-20 c-4 0 -7 -2 -7 -6 v-22 c0 -10 2 -18 12 -24 z" />
          <path d="M66 62 h26" opacity={0.6} />
          <path d="M104 30 v20 c0 8 6 12 11 12 v22" />
          <path d="M104 30 c0 8 6 12 11 12" opacity={0.6} />
          <path d="M110 86 h10" />
        </g>
      )
    case 'Automobiles':
      return (
        <g {...common}>
          <path d="M26 70 c4 -2 10 -10 18 -14 c10 -5 22 -7 34 -7 c14 0 26 4 38 12 l14 2 c4 1 6 4 6 8 v3 h-110 z" />
          <path d="M52 49 c8 -4 26 -4 36 1 l8 6 h-52 z" opacity={0.6} />
          <circle cx="52" cy="74" r="9" />
          <circle cx="108" cy="74" r="9" />
        </g>
      )
    case 'Real Estate':
      return (
        <g {...common}>
          <path d="M44 44 L80 24 L116 44" />
          <rect x="50" y="44" width="60" height="50" />
          <line x1="50" y1="94" x2="110" y2="94" />
          <rect x="58" y="54" width="12" height="14" opacity={0.7} />
          <rect x="90" y="54" width="12" height="14" opacity={0.7} />
          <rect x="74" y="76" width="12" height="18" />
        </g>
      )
  }
}

export default function PiecePlaceholder({
  category,
  label,
  className = '',
}: {
  category: Category
  label?: string
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden bg-navy ${className}`}
      aria-hidden="true"
    >
      {/* faint vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 120% at 30% 20%, rgba(176,144,79,0.10), transparent 60%)',
        }}
      />
      <svg
        viewBox="0 0 160 120"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x="8"
          y="8"
          width="144"
          height="104"
          fill="none"
          stroke="rgba(176,144,79,0.35)"
          strokeWidth="1"
        />
        <Motif category={category} />
      </svg>
      {label && (
        <span className="eyebrow absolute bottom-2.5 left-3 text-brass/80">
          {label}
        </span>
      )}
    </div>
  )
}
