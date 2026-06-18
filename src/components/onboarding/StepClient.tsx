import type { ClientDraft } from './helpers'
import { TextField } from './fields'

const STEPS = [
  {
    n: '01',
    t: 'Mandate & scope',
    d: 'Capture the family office, the reporting date, and total wealth so the collection can be framed against it.',
  },
  {
    n: '02',
    t: 'Build the register',
    d: 'Enter each piece — acquisition and current valuation, with a comparable to support the mark.',
  },
  {
    n: '03',
    t: 'Review & confirm',
    d: 'Check the totals and exposure, then publish the client’s private dashboard.',
  },
]

export default function StepClient({
  draft,
  setDraft,
  onNext,
}: {
  draft: ClientDraft
  setDraft: (d: ClientDraft) => void
  onNext: () => void
}) {
  const set = (patch: Partial<ClientDraft>) => setDraft({ ...draft, ...patch })
  const canProceed = draft.officeName.trim().length > 0

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      {/* how onboarding works — the playbook in brief */}
      <aside className="border border-hairline bg-ivory/60 p-6">
        <div className="eyebrow text-brass">How onboarding works</div>
        <p className="mt-2 font-serif text-xl leading-snug text-navy">
          From mandate to a private register, in three steps.
        </p>
        <ul className="mt-5 space-y-5">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-3.5">
              <span className="tnum mt-0.5 font-serif text-base text-brass">
                {s.n}
              </span>
              <span>
                <span className="block text-sm font-medium text-navy">{s.t}</span>
                <span className="mt-0.5 block text-[13px] leading-relaxed text-charcoal/60">
                  {s.d}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-hairline pt-4 text-[11px] leading-relaxed text-charcoal/45">
          See <span className="italic">docs/CLIENT-ONBOARDING.md</span> for the full
          process — data to gather per asset class, valuation sourcing and review
          cadence.
        </p>
      </aside>

      {/* client form */}
      <div>
        <div className="eyebrow text-charcoal/45">Step 1 of 3</div>
        <h3 className="mt-1 font-serif text-2xl text-navy">Client & family office</h3>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField
              label="Family office name"
              value={draft.officeName}
              onChange={(v) => set({ officeName: v })}
              placeholder="e.g. The Marchetti Family Office"
            />
          </div>
          <div className="sm:col-span-2">
            <TextField
              label="Family name"
              value={draft.familyName}
              onChange={(v) => set({ familyName: v })}
              placeholder="e.g. The Marchetti Family"
            />
          </div>
          <TextField
            label="Reporting date"
            type="date"
            value={draft.asOf}
            onChange={(v) => set({ asOf: v })}
          />
          <TextField
            label="Total family wealth"
            type="number"
            tabular
            hint="USD · optional"
            value={draft.totalFamilyWealth}
            onChange={(v) => set({ totalFamilyWealth: v })}
            placeholder="e.g. 250000000"
          />
        </div>

        <p className="mt-3 text-[12px] leading-relaxed text-charcoal/45">
          Total wealth drives the “share of family wealth” view. Leave it blank to
          default to the collection’s own value.
        </p>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="eyebrow border border-navy bg-navy px-6 py-2.5 text-ivory transition-colors hover:bg-navy/90 disabled:cursor-not-allowed disabled:border-hairline disabled:bg-hairline disabled:text-charcoal/40"
          >
            Continue → Holdings
          </button>
        </div>
      </div>
    </div>
  )
}
