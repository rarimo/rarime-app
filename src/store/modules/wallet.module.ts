import { CHAINS } from '@rarimo/rarime-connector'

import { initRarimoClient, rarimoClient } from '@/api/clients'
import { createStore } from '@/helpers'

type WalletStore = {
  address: string
  balances: {
    amount: string
    denom: string
    decimals: number
  }[]
}

export const [walletStore, useWalletState] = createStore(
  'wallet',
  {
    address: '',
    balances: [],
  } as WalletStore,
  state => ({
    connect: async () => {
      await initRarimoClient()

      state.address = rarimoClient.wallet.address
    },
    loadBalances: async () => {
      const coins = await rarimoClient.query.getAllBalances(rarimoClient.wallet.address)

      state.balances = coins.map(coin => {
        const decimals = CHAINS[rarimoClient.wallet.chainId].currencies.find(
          currency => currency.coinDenom.toLowerCase() === coin.denom.toLowerCase(),
        )?.coinDecimals

        if (!decimals)
          throw new TypeError(
            `Currency ${coin.denom} on Chain ${rarimoClient.wallet.chainId} has no decimals`,
          )

        return {
          amount: coin.amount,
          denom: coin.denom,
          decimals,
        }
      })

      if (!state.balances.length) {
        state.balances = [
          {
            amount: '',
            denom: CHAINS[rarimoClient.wallet.chainId].currencies[0].coinDenom,
            decimals: CHAINS[rarimoClient.wallet.chainId].currencies[0].coinDecimals,
          },
        ]
      }
    },
  }),
  {
    isPersist: false,
  },
)
