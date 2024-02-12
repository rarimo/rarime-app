import { JsonApiClient } from '@distributedlab/jac'
import { enableSnap, SnapConnector } from '@rarimo/rarime-connector'

import { config } from '@/config'

export const api = new JsonApiClient({
  baseUrl: config.API_URL,
})

export let zkpSnap: SnapConnector

export const initZkpSnap = async () => {
  const snap = await enableSnap('local:http://localhost:8081')
  zkpSnap = await snap.getConnector()
}
