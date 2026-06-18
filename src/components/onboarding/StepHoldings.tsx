import { useState } from 'react'
import type { Piece } from '../../types'
import { categoryColor } from '../../data/collection'
import { formatCompactUSD, formatPct } from '../../lib/format'
import { TextField, SelectField, TextAreaField } from './fields'
import {
  CATEGORY_OPTIONS,
  buildPiece,
  emptyHoldingForm,
  validateHolding,
  type HoldingForm,
} from './helpers'

export default function StepHoldings({
  holdings,
  addHolding,
  removeHolding,
  onBack,
  onNext,
  todayIso,
}: {
  holdings: Piece[]
  addHolding: (p: Piece) => void
  removeHolding: (id: string) => void
  onBack: () => void
  onNext: () => void
  todayIso: string
}) {
  const [form, setForm] = useState<HoldingForm>(emptyHoldingForm)
  const [errors, setErrors] = useState<ReturnType<typeof validateHolding>['errors']>({})
  const set = (patch: Partial<HoldingForm>) => setForm((f) => ({ ...f, ...patch }))

  const handleAdd = () => {
    const v = validateHolding(form)
    if (!v.ok) {
      setErrors(v.errors)
      return
    }
    addHolding(buildPiece(form, todayIso))
    setForm({ ...emptyHoldingForm(), category: form.category })
    setErrors({})
  }

  const total = holdings.reduce((s, p) => s + p.currentValue, 0)

  return (
    <div>
      <div className="eyebrow text-charcoal/45">Step 2 of 3</div>
      <h3 className="mt-1 font-serif text-2xl text-navy">Add holdings</h3>
      <p className="mt-1 text-sm text-charcoal/55">
        Add each piece in the collection. You can add as many as you like — at least
        one is needed to continue.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* the form */}
        <div className="card p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <TextField
                label="Name"
                value={form.name}
                onChange={(v) => set({ name: v })}
                placeholder="e.g. Patek Philippe Nautilus 5711/1A"
                error={errors.name}
              />
            </div>
            <div className="sm:col-span-2">
              <TextField
                label="Maker / artist / district"
                value={form.subtitle}
                onChange={(v) => set({ subtitle: v })}
                placeholder="e.g. Stainless steel · blue dial · 2020"
              />
            </div>
            <SelectField
              label="Category"
              value={form.category}
              onChange={(v) => set({ category: v as HoldingForm['category'] })}
              options={CATEGORY_OPTIONS}
            />
            <TextField
              label="Acquisition price"
              type="number"
              tabular
              hint="USD"
              value={form.acquisitionPrice}
              onChange={(v) => set({ acquisitionPrice: v })}
              placeholder="95000"
              error={errors.acquisitionPrice}
            />
            <TextField
              label="Acquisition date"
              type="date"
              value={form.acquisitionDate}
              onChange={(v) => set({ acquisitionDate: v })}
              error={errors.acquisitionDate}
            />
            <TextField
              label="Current estimated value"
              type="number"
              tabular
              hint="USD"
              value={form.currentValue}
              onChange={(v) => set({ currentValue: v })}
              placeholder="185000"
              error={errors.currentValue}
            />
            <TextField
              label="Last valued"
              type="date"
              hint="defaults to today"
              value={form.lastValued}
              onChange={(v) => set({ lastValued: v })}
            />
            <div className="sm:col-span-2">
              <TextAreaField
                label="Description"
                hint="optional"
                value={form.description}
                onChange={(v) => set({ description: v })}
                placeholder="Condition, full set, exhibition history…"
              />
            </div>
            <div className="sm:col-span-2">
              <TextField
                label="Market reference"
                hint="optional"
                value={form.marketReference}
                onChange={(v) => set({ marketReference: v })}
                placeholder="Comparable auction result…"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleAdd}
              className="eyebrow border border-brass bg-brass/10 px-5 py-2.5 text-navy transition-colors hover:bg-brass/20"
            >
              + Add to register
            </button>
          </div>
        </div>

        {/* running list */}
        <div>
          <div className="flex items-baseline justify-between border-b border-hairline pb-2">
            <span className="eyebrow text-brass">
              Added · {holdings.length}
            </span>
            <span className="tnum text-sm text-charcoal/60">
              {formatCompactUSD(total)}
            </span>
          </div>

          {holdings.length === 0 ? (
            <p className="py-10 text-center text-sm text-charcoal/45">
              No holdings yet. Add the first piece on the left.
            </p>
          ) : (
            <ul className="divide-y divide-hairline">
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
                      <span className="tnum block text-xs text-charcoal/50">
                        {formatCompactUSD(p.currentValue)} · {formatPct(gp)}
                      </span>
                    </span>
                    <button
                      onClick={() => removeHolding(p.id)}
                      className="eyebrow shrink-0 px-2 py-1 text-charcoal/40 transition-colors hover:text-cat-wine"
                      aria-label={`Remove ${p.name}`}
                    >
                      Remove
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-hairline pt-5">
        <button
          onClick={onBack}
          className="eyebrow text-charcoal/55 transition-colors hover:text-navy"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={holdings.length === 0}
          className="eyebrow border border-navy bg-navy px-6 py-2.5 text-ivory transition-colors hover:bg-navy/90 disabled:cursor-not-allowed disabled:border-hairline disabled:bg-hairline disabled:text-charcoal/40"
        >
          Continue → Review
        </button>
      </div>
    </div>
  )
}
