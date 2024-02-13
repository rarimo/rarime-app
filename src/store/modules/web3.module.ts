import { isMetamaskInstalled, isSnapInstalled } from '@rarimo/rarime-connector'

import { config } from '@/config'
import { createStore } from '@/helpers'
import { SUPPORTED_PROVIDERS } from '@/types'

type Web3State = {
  providerType?: SUPPORTED_PROVIDERS
  isMetamaskInstalled?: boolean
  isSnapInstalled?: boolean
}

const [web3Store, useWeb3State] = createStore(
  'web3',
  {
    providerType: undefined,
    isMetamaskInstalled: false,
    isSnapInstalled: false,
  } as Web3State,
  state => ({
    setProviderType: (providerType: SUPPORTED_PROVIDERS | undefined) => {
      state.providerType = providerType
    },
    checkSnapStatus: async () => {
      state.isMetamaskInstalled = await isMetamaskInstalled()
      state.isSnapInstalled = await isSnapInstalled(...config.SNAP_V_PARAMS)

      return {
        isMetamaskInstalled: state.isMetamaskInstalled,
        isSnapInstalled: state.isSnapInstalled,
      }
    },
  }),
)

export { useWeb3State, web3Store }
