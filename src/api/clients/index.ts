import { JsonApiClient } from '@distributedlab/jac'
import { makeRarimoClient, makeWallet } from '@rarimo/client'
import { CHAINS, RarimeWallet, ZkpSnap } from '@rarimo/rarime-connector'

import { config } from '@/config'

export const api = new JsonApiClient({
  baseUrl: config.API_URL,
})

export const zkpSnap = new ZkpSnap()

export const rarimeWallet = new RarimeWallet('rarimo_42-1')

const chainInfo = CHAINS[rarimeWallet.chainId]

export const RARIMO_EXPLORER_URLS: Record<keyof typeof CHAINS, string> = {
  'rarimo_42-1': 'https://scan.mainnet-beta.rarimo.com',
  'rarimo_201411-1': 'https://scan.rarimo.com',
}

export const rarimoClient = makeRarimoClient({
  rpcUrl: chainInfo.rpc!,
  apiUrl: chainInfo.rest!,
  prefix: 'rarimo',
  chainName: chainInfo.chainName,
  chainIconUrl: chainInfo.chainSymbolImageUrl,
  currency: {
    denom: chainInfo.stakeCurrency!.coinDenom,
    minDenom: chainInfo.stakeCurrency!.coinMinimalDenom,
    decimals: chainInfo.stakeCurrency!.coinDecimals,
  },
  gasPrice: {
    amount: 0,
    steps: {
      low: chainInfo.feeCurrencies[0].gasPriceStep!.low,
      average: chainInfo.feeCurrencies[0].gasPriceStep!.average,
      high: chainInfo.feeCurrencies[0].gasPriceStep!.high,
    },
  },
})

export const initRarimoClient = async () => {
  await rarimoClient.connect(makeWallet(rarimeWallet))
}
