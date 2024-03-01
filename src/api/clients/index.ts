import { JsonApiClient } from '@distributedlab/jac'
import { RarimeWallet, ZkpSnap } from '@rarimo/rarime-connector'

import { config } from '@/config'

export const api = new JsonApiClient({
  baseUrl: config.API_URL,
})

export const zkpSnap = new ZkpSnap('local:http://localhost:8081', '2.1.0-rc.3')

export const rarimeWallet = new RarimeWallet(
  'eightball-1',
  'local:http://localhost:8081',
  '2.1.0-rc.3',
)
