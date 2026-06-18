import { useMemo, useState } from 'react'
import type { Piece } from '../../types'
import { useClients } from '../../state/ClientsContext'
import StepClient from './StepClient'
import StepHoldings from './StepHoldings'
import StepReview from './StepReview'
import { buildClient, type ClientDraft } from './helpers'

const STEP_LABELS = ['Client', 'Holdings', 'Review']

function todayIso() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function OnboardingWizard({ onDone }: { onDone: () => void }) {
  const { addClient } = useClients()
  const today = useMemo(todayIso, [])

  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<ClientDraft>({
    officeName: '',
    familyName: '',
    asOf: today,
    totalFamilyWealth: '',
  })
  const [holdings, setHoldings] = useState<Piece[]>([])

  const addHolding = (p: Piece) => setHoldings((h) => [...h, p])
  const removeHolding = (id: string) =>
    setHoldings((h) => h.filter((p) => p.id !== id))

  const confirm = () => {
    addClient(buildClient(draft, holdings))
    onDone()
  }

  return (
    <div className="rise">
      {/* header + progress */}
      <div className="flex flex-col gap-4 border-b border-hairline pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="eyebrow text-brass">Onboarding</div>
          <h2 className="mt-1 font-serif text-3xl leading-tight text-navy">
            Onboard a new client
          </h2>
        </div>
        <button
          onClick={onDone}
          className="eyebrow self-start text-charcoal/45 transition-colors hover:text-navy sm:self-end"
        >
          Cancel
        </button>
      </div>

      {/* step indicator */}
      <ol className="mt-5 flex items-center gap-3">
        {STEP_LABELS.map((label, i) => {
          const state = i === step ? 'active' : i < step ? 'done' : 'todo'
          return (
            <li key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`tnum flex h-6 w-6 items-center justify-center border text-[11px] ${
                    state === 'active'
                      ? 'border-brass bg-brass text-navy'
                      : state === 'done'
                        ? 'border-brass text-brass'
                        : 'border-hairline text-charcoal/40'
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`eyebrow ${
                    state === 'todo' ? 'text-charcoal/40' : 'text-navy'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <span className="h-px w-8 bg-hairline" />
              )}
            </li>
          )
        })}
      </ol>

      <div className="mt-8">
        {step === 0 && (
          <StepClient draft={draft} setDraft={setDraft} onNext={() => setStep(1)} />
        )}
        {step === 1 && (
          <StepHoldings
            holdings={holdings}
            addHolding={addHolding}
            removeHolding={removeHolding}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
            todayIso={today}
          />
        )}
        {step === 2 && (
          <StepReview
            draft={draft}
            holdings={holdings}
            onBack={() => setStep(1)}
            onConfirm={confirm}
          />
        )}
      </div>
    </div>
  )
}
