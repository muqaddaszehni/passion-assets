import type { ReactNode } from 'react'

export default function Panel({
  eyebrow,
  title,
  right,
  children,
  className = '',
}: {
  eyebrow?: string
  title?: string
  right?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`card flex flex-col px-5 py-5 sm:px-6 sm:py-6 ${className}`}>
      {(eyebrow || title || right) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {eyebrow && <div className="eyebrow text-brass">{eyebrow}</div>}
            {title && (
              <h2 className="mt-1 font-serif text-2xl leading-tight text-navy">
                {title}
              </h2>
            )}
          </div>
          {right && <div className="shrink-0">{right}</div>}
        </div>
      )}
      {children}
    </section>
  )
}
