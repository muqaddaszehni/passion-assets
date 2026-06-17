import { useEffect, useState } from 'react'
import BrandHeader from './components/BrandHeader'
import DashboardHeader from './components/DashboardHeader'
import CategoryCards from './components/CategoryCards'
import AllocationChart from './components/AllocationChart'
import ValueOverTimeChart from './components/ValueOverTimeChart'
import Gallery, { type SortKey } from './components/Gallery'
import PieceDetail from './components/PieceDetail'
import Footer from './components/Footer'
import { COLLECTION } from './data/collection'
import type { Category } from './types'

const AS_OF = '2026-04-30'

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Category | 'All'>('All')
  const [sort, setSort] = useState<SortKey>('value')

  const selected = COLLECTION.find((p) => p.id === selectedId) ?? null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedId])

  const openPiece = (id: string) => setSelectedId(id)
  const closePiece = () => setSelectedId(null)

  const selectCategory = (c: Category) => {
    setFilter((prev) => (prev === c ? 'All' : c))
    const el = document.getElementById('register')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BrandHeader asOf={AS_OF} />

      <main className="mx-auto w-full max-w-register flex-1 px-6 py-8 sm:px-8 sm:py-10">
        {selected ? (
          <PieceDetail piece={selected} onBack={closePiece} />
        ) : (
          <div className="flex flex-col gap-10">
            <DashboardHeader />

            <div>
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="eyebrow text-brass">By Category</h2>
                <span className="text-xs text-charcoal/45">
                  Select a category to filter the register
                </span>
              </div>
              <CategoryCards active={filter} onSelect={selectCategory} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AllocationChart />
              <ValueOverTimeChart />
            </div>

            <div id="register" className="scroll-mt-8">
              <Gallery
                filter={filter}
                sort={sort}
                onFilter={setFilter}
                onSort={setSort}
                onOpen={openPiece}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
