import { JsonApiClient } from '@distributedlab/jac'
import { RarimoClient } from '@rarimo/client'
import { getRarimoClient, RarimeWallet, ZkpSnap } from '@rarimo/rarime-connector'

import { config } from '@/config'

export const api = new JsonApiClient({
  baseUrl: config.API_URL,
})

export const zkpSnap = new ZkpSnap('local:http://localhost:8081', '2.1.0-rc.3')

export const rarimeWallet = new RarimeWallet(
  'rarimo_42-1',
  'local:http://localhost:8081',
  '2.1.0-rc.3',
)

export let rarimoClient: RarimoClient

export const initRarimoClient = async () => {
  rarimoClient = await getRarimoClient(rarimeWallet)
}

// TODO: remove test mock
// const logRarimeWallet = useCallback(async () => {
//   try {
//     const balance = await rarimoClient.query.getAllBalances(rarimoClient.wallet.address)
//
//     console.log(balance)
//
//     const resp = await rarimoClient.tx.delegate(
//       rarimoClient.wallet.address,
//       'rarimovaloper1g9p4ejp9p877j9vdnuyqtgqm4lhm4f6j5a5rz6',
//       {
//         denom: 'stake',
//         amount: BN.fromRaw(0.1, 6).value,
//       },
//     )
//
//     console.log(resp)
//   } catch (error) {
//     ErrorHandler.processWithoutFeedback(error)
//   }
// }, [])
