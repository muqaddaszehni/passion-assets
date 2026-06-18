import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Client } from '../types'
import { DEFAULT_CLIENT_ID, SEED_CLIENTS } from '../data/clients'

const CLIENTS_KEY = 'passion-assets:clients'
const ACTIVE_KEY = 'passion-assets:activeClient'

/** Read user-added (non-seed) clients from localStorage, guarding bad JSON. */
function loadUserClients(): Client[] {
  try {
    const raw = localStorage.getItem(CLIENTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((c) => c && typeof c.id === 'string')
  } catch {
    return []
  }
}

interface ClientsContextValue {
  clients: Client[]
  activeClient: Client
  activeClientId: string
  setActiveClientId: (id: string) => void
  /** Append a new client, persist it, make it active, return its id. */
  addClient: (client: Client) => string
  /** Clear onboarded clients and return to the seed sample. */
  resetDemo: () => void
}

const ClientsContext = createContext<ClientsContextValue | null>(null)

export function ClientsProvider({ children }: { children: ReactNode }) {
  const [userClients, setUserClients] = useState<Client[]>(loadUserClients)
  const [activeClientId, setActiveId] = useState<string>(() => {
    const stored = localStorage.getItem(ACTIVE_KEY)
    const all = [...SEED_CLIENTS, ...loadUserClients()]
    return stored && all.some((c) => c.id === stored)
      ? stored
      : DEFAULT_CLIENT_ID
  })

  const clients = useMemo(
    () => [...SEED_CLIENTS, ...userClients],
    [userClients],
  )

  const activeClient = useMemo(
    () => clients.find((c) => c.id === activeClientId) ?? clients[0],
    [clients, activeClientId],
  )

  const setActiveClientId = useCallback((id: string) => {
    setActiveId(id)
    try {
      localStorage.setItem(ACTIVE_KEY, id)
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }, [])

  const addClient = useCallback((client: Client) => {
    setUserClients((prev) => {
      const next = [...prev, client]
      try {
        localStorage.setItem(CLIENTS_KEY, JSON.stringify(next))
      } catch {
        /* storage unavailable — keep in-memory only */
      }
      return next
    })
    setActiveId(client.id)
    try {
      localStorage.setItem(ACTIVE_KEY, client.id)
    } catch {
      /* ignore */
    }
    return client.id
  }, [])

  const resetDemo = useCallback(() => {
    setUserClients([])
    setActiveId(DEFAULT_CLIENT_ID)
    try {
      localStorage.removeItem(CLIENTS_KEY)
      localStorage.removeItem(ACTIVE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({
      clients,
      activeClient,
      activeClientId: activeClient.id,
      setActiveClientId,
      addClient,
      resetDemo,
    }),
    [clients, activeClient, setActiveClientId, addClient, resetDemo],
  )

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  )
}

export function useClients(): ClientsContextValue {
  const ctx = useContext(ClientsContext)
  if (!ctx) throw new Error('useClients must be used within ClientsProvider')
  return ctx
}

export function useActiveClient(): Client {
  return useClients().activeClient
}
