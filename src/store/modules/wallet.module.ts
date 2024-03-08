import { initRarimoClient, rarimoClient } from '@/api/clients'
import { createStore } from '@/helpers'

type WalletStore = {
  address: string
  balance: string
  denom: string
}

export const [walletStore, useWalletState] = createStore(
  'wallet',
  {
    address: '',
    balance: '',
    denom: '',
  } as WalletStore,
  state => ({
    connect: async () => {
      await initRarimoClient()

      state.address = rarimoClient.wallet.address

      const coins = await rarimoClient.query.getAllBalances(rarimoClient.wallet.address)

      if (!coins.length) return

      state.balance = coins[0].amount
      state.denom = coins[0].denom
    },
  }),
  {
    isPersist: false,
  },
)
