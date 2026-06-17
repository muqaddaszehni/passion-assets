import { formatDate } from '../lib/format'

export default function BrandHeader({ asOf }: { asOf: string }) {
  return (
    <header className="bg-navy text-ivory">
      <div className="mx-auto max-w-register px-6 sm:px-8">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center border border-brass/60">
              <span className="font-serif text-2xl italic leading-none text-brass">
                P
              </span>
            </div>
            <div className="leading-tight">
              <div className="font-serif text-xl tracking-wide">
                Passion Assets
              </div>
              <div className="eyebrow text-ivory/55">
                Private Collection Register
              </div>
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <div className="eyebrow text-ivory/45">Prepared for</div>
            <div className="font-serif text-lg leading-tight">
              The Lansdowne Family Office
            </div>
            <div className="eyebrow mt-0.5 text-brass/80">
              As at {formatDate(asOf)}
            </div>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-brass/40" />
    </header>
  )
}
