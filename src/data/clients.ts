import type { Client } from '../types'
import {
  COLLECTION,
  COLLECTION_VALUE_HISTORY,
  TOTAL_FAMILY_WEALTH,
} from './collection'

/**
 * Illustrative demo — fictional data.
 * The single code-seeded client. The register becomes multi-client once a
 * banker onboards a second family through the in-app wizard.
 */
export const SEED_CLIENTS: Client[] = [
  {
    id: 'lansdowne',
    officeName: 'The Lansdowne Family Office',
    familyName: 'The Lansdowne Family',
    asOf: '2026-04-30',
    totalFamilyWealth: TOTAL_FAMILY_WEALTH,
    holdings: COLLECTION,
    valueHistory: COLLECTION_VALUE_HISTORY,
    seed: true,
  },
]

export const DEFAULT_CLIENT_ID = SEED_CLIENTS[0].id
