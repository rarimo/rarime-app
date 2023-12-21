import { createStore } from '@/helpers'
import { SUPPORTED_PROVIDERS } from '@/types'

interface Web3State {
  providerType?: SUPPORTED_PROVIDERS
  kek: string
}

const [web3Store, useWeb3State] = createStore(
  'web3',
  {
    providerType: undefined,
    kek: 'kek',
  } as Web3State,
  state => ({
    setProviderType: (providerType: SUPPORTED_PROVIDERS | undefined) => {
      state.providerType = providerType
    },
    setKek: (kek: string) => {
      state.kek = kek
    },
  }),
)

export { useWeb3State, web3Store }
