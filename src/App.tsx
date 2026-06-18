import { useEffect, useState } from 'react'
import BrandHeader from './components/BrandHeader'
import DashboardHeader from './components/DashboardHeader'
import CategoryCards from './components/CategoryCards'
import AllocationChart from './components/AllocationChart'
import ValueOverTimeChart from './components/ValueOverTimeChart'
import Gallery, { type SortKey } from './components/Gallery'
import PieceDetail from './components/PieceDetail'
import OnboardingWizard from './components/onboarding/OnboardingWizard'
import Footer from './components/Footer'
import { ClientsProvider, useClients } from './state/ClientsContext'
import type { Category } from './types'

type View = 'dashboard' | 'onboarding'

function AppShell() {
  const { activeClient, activeClientId } = useClients()
  const [view, setView] = useState<View>('dashboard')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Category | 'All'>('All')
  const [sort, setSort] = useState<SortKey>('value')

  const selected = activeClient.holdings.find((p) => p.id === selectedId) ?? null

  // Switching clients clears any open detail and returns to the dashboard.
  useEffect(() => {
    setSelectedId(null)
    setFilter('All')
    setView('dashboard')
  }, [activeClientId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedId, view])

  const openPiece = (id: string) => setSelectedId(id)
  const closePiece = () => setSelectedId(null)

  const selectCategory = (c: Category) => {
    setFilter((prev) => (prev === c ? 'All' : c))
    const el = document.getElementById('register')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BrandHeader onOnboard={() => setView('onboarding')} />

      <main className="mx-auto w-full max-w-register flex-1 px-6 py-8 sm:px-8 sm:py-10">
        {view === 'onboarding' ? (
          <OnboardingWizard onDone={() => setView('dashboard')} />
        ) : selected ? (
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

export default function App() {
  return (
    <ClientsProvider>
      <AppShell />
    </ClientsProvider>
  )
}
