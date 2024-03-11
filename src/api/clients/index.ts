import { JsonApiClient } from '@distributedlab/jac'
import { enableSnap, SnapConnector } from '@rarimo/rarime-connector'

import { config } from '@/config'

export const api = new JsonApiClient({
  baseUrl: config.API_URL,
  credentials: 'include',
})

export let zkpSnap: SnapConnector

export const initZkpSnap = async () => {
  const snap = await enableSnap(...config.SNAP_V_PARAMS)
  zkpSnap = await snap.getConnector()
}
