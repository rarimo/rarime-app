import { JsonApiClient } from '@distributedlab/jac'
import { RarimoClient } from '@rarimo/client'
import { getRarimoClient, RarimeWallet, ZkpSnap } from '@rarimo/rarime-connector'

import { config } from '@/config'

export const api = new JsonApiClient({
  baseUrl: config.API_URL,
})

export const zkpSnap = new ZkpSnap()

export const rarimeWallet = new RarimeWallet('rarimo_42-1')

export let rarimoClient: RarimoClient

export const initRarimoClient = async () => {
  rarimoClient = await getRarimoClient(rarimeWallet)
}
