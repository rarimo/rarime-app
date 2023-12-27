import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback } from 'react'

import { ErrorHandler } from '@/helpers'
import { useMetamaskZkpSnapContext } from '@/hooks/metamask-zkp-snap'
import { useWeb3Context } from '@/hooks/web3'
import { authStore, useAuthState } from '@/store'

export const useAuth = () => {
  const { isAuthenticated, jwt } = useAuthState()
  const { init } = useWeb3Context()
  const { connectOrInstallSnap } = useMetamaskZkpSnapContext()

  const login = useCallback(async () => {
    try {
      await init(PROVIDERS.Metamask)
      await connectOrInstallSnap()

      // TODO: Replace with real auth check
      authStore.setJwt('mockJwt')
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [connectOrInstallSnap, init])

  const authorization = useCallback(() => {
    //TODO: Add authorization logic
  }, [])

  return { isAuthenticated, jwt, setJwt: authStore.setJwt, login, authorization }
}
