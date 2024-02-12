import { config } from '@config'
import { JsonApiClient } from '@distributedlab/jac'
import { enableSnap, SnapConnector } from '@rarimo/rarime-connector'

export const api = new JsonApiClient({
  baseUrl: config.API_URL,
})

export let zkpSnap: SnapConnector

export const initZkpSnap = async () => {
  const snap = await enableSnap(...config.SNAP_V_PARAMS)
  zkpSnap = await snap.getConnector()
}
