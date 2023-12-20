import { useCallback } from 'react'
import { proxy, subscribe, useSnapshot } from 'valtio'

import { SUPPORTED_PROVIDERS } from '@/types'

const storeName = 'web3'

export const web3Store = proxy<{
  providerType?: SUPPORTED_PROVIDERS
}>(
  JSON.parse(localStorage.getItem(storeName)!) || {
    providerType: undefined,
  },
)

subscribe(web3Store, () => {
  localStorage.setItem(storeName, JSON.stringify(web3Store))
})

export const useWeb3Store = () => {
  const web3StoreSnapshot = useSnapshot(web3Store)

  const setProviderType = useCallback((providerType: SUPPORTED_PROVIDERS | undefined) => {
    web3Store.providerType = providerType
  }, [])

  return {
    providerType: web3StoreSnapshot.providerType,
    setProviderType,
  }
}
