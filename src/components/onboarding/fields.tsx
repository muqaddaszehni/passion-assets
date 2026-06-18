import type { ReactNode } from 'react'

const inputBase =
  'w-full border border-hairline bg-white px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-brass focus:outline-none focus:ring-0 transition-colors'

function Label({
  children,
  hint,
}: {
  children: ReactNode
  hint?: string
}) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-2">
      <span className="eyebrow text-charcoal/55">{children}</span>
      {hint && <span className="text-[11px] text-charcoal/35">{hint}</span>}
    </div>
  )
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  type = 'text',
  tabular = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
  hint?: string
  type?: 'text' | 'number' | 'date'
  tabular?: boolean
}) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={type === 'number' ? 'decimal' : undefined}
        min={type === 'number' ? 0 : undefined}
        className={`${inputBase} ${tabular ? 'tnum' : ''} ${
          error ? 'border-cat-wine' : ''
        }`}
      />
      {error && <span className="mt-1 block text-[11px] text-cat-wine">{error}</span>}
    </label>
  )
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
}) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={`${inputBase} resize-none leading-relaxed`}
      />
    </label>
  )
}
