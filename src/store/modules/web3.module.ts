import {
  createProvider,
  MetamaskProvider,
  Provider,
  ProviderDetector,
  ProviderProxyConstructor,
  PROVIDERS,
} from '@distributedlab/w3p'
import { isMetamaskInstalled } from '@rarimo/rarime-connector'
import { ref } from 'valtio'

import { zkpSnap } from '@/api/clients'
import { createStore } from '@/helpers'

type Web3Store = {
  isMetamaskInstalled: boolean
  isSnapInstalled: boolean
  provider: Provider | undefined
  isValidChain: boolean
}

const providerDetector = new ProviderDetector()

const PROVIDERS_PROXIES: { [key in PROVIDERS]?: ProviderProxyConstructor } = {
  [PROVIDERS.Metamask]: MetamaskProvider,
}

export const [web3Store, useWeb3State] = createStore(
  'web3',
  {
    isMetamaskInstalled: false,
    isSnapInstalled: false,
    provider: undefined,
    isValidChain: false,
  } as Web3Store,
  state => ({
    checkSnapStatus: async () => {
      state.isMetamaskInstalled = await isMetamaskInstalled()
      state.isSnapInstalled = await zkpSnap.isInstalled()

      return {
        isMetamaskInstalled: state.isMetamaskInstalled,
        isSnapInstalled: state.isSnapInstalled,
      }
    },
    connect: async (providerType: PROVIDERS) => {
      if (!(providerType in PROVIDERS_PROXIES)) throw new TypeError('Provider not supported')

      const providerProxy = PROVIDERS_PROXIES[providerType]

      if (!providerProxy) throw new TypeError('Provider not supported')

      state.provider?.clearHandlers?.()

      state.provider = ref(
        await createProvider(providerProxy, {
          providerDetector,
          listeners: {
            onChainChanged: () => {
              web3Store.connect(providerType)
            },
            onAccountChanged: () => {
              web3Store.connect(providerType)
            },
          },
        }),
      )

      await state.provider.connect()
    },
  }),
  {
    isPersist: false,
  },
)
