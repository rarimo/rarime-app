import { createStore } from '@/helpers'
import { SUPPORTED_PROVIDERS } from '@/types'

type Web3State = {
  providerType?: SUPPORTED_PROVIDERS
}

const [web3Store, useWeb3State] = createStore(
  'web3',
  {
    providerType: undefined,
  } as Web3State,
  state => ({
    setProviderType: (providerType: SUPPORTED_PROVIDERS | undefined) => {
      state.providerType = providerType
    },
  }),
)

export { useWeb3State, web3Store }
