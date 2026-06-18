import { useEffect, useRef, useState } from 'react'
import { useClients } from '../state/ClientsContext'

export default function ClientSwitcher({
  onOnboard,
}: {
  onOnboard: () => void
}) {
  const { clients, activeClient, setActiveClientId, resetDemo } = useClients()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasOnboarded = clients.some((c) => !c.seed)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group flex items-center gap-2.5 text-left"
      >
        <span className="font-serif text-base leading-tight text-ivory sm:text-lg">
          {activeClient.officeName}
        </span>
        <span
          className={`mt-0.5 text-brass transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-3 w-72 border border-hairline bg-white text-charcoal shadow-card"
        >
          <div className="eyebrow border-b border-hairline px-4 py-3 text-charcoal/45">
            Clients
          </div>
          <ul className="max-h-72 overflow-auto py-1">
            {clients.map((c) => {
              const active = c.id === activeClient.id
              return (
                <li key={c.id}>
                  <button
                    role="menuitem"
                    onClick={() => {
                      setActiveClientId(c.id)
                      setOpen(false)
                    }}
                    className={`flex w-full items-start justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-ivory ${
                      active ? 'bg-ivory/70' : ''
                    }`}
                  >
                    <span>
                      <span className="block font-serif text-[15px] leading-tight text-navy">
                        {c.officeName}
                      </span>
                      <span className="block text-xs text-charcoal/50">
                        {c.holdings.length}{' '}
                        {c.holdings.length === 1 ? 'holding' : 'holdings'}
                        {c.seed ? ' · sample' : ''}
                      </span>
                    </span>
                    {active && (
                      <span className="mt-1 text-brass" aria-label="active">
                        ●
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="border-t border-hairline p-1.5">
            <button
              role="menuitem"
              onClick={() => {
                setOpen(false)
                onOnboard()
              }}
              className="eyebrow flex w-full items-center gap-2 px-2.5 py-2.5 text-left text-navy transition-colors hover:bg-ivory"
            >
              <span className="text-brass" aria-hidden>
                +
              </span>
              Onboard new client
            </button>
            {hasOnboarded && (
              <button
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  resetDemo()
                }}
                className="w-full px-2.5 py-2 text-left text-xs text-charcoal/45 transition-colors hover:bg-ivory hover:text-charcoal/70"
              >
                Reset to sample
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
