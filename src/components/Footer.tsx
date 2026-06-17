export default function Footer() {
  return (
    <footer className="mt-16 border-t border-hairline bg-navy text-ivory">
      <div className="mx-auto max-w-register px-6 py-8 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg italic text-brass">P</span>
            <span className="font-serif text-base tracking-wide">
              Passion Assets
            </span>
          </div>
          <div className="text-right">
            <p className="eyebrow text-ivory/45">
              Illustrative demo — fictional data
            </p>
            <p className="mt-1 text-xs text-ivory/40">
              Valuations are indicative and do not constitute advice or an offer.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
