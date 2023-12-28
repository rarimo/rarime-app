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

  //Todo: add real check logic
  const _isJwtValid = () => true || false

  const _removeJwt = () => {
    authStore.setJwt('')
  }

  const authorize = useCallback(async () => {
    if (jwt) {
      if (_isJwtValid()) {
        return
      }
      _removeJwt()
    }
    // TODO: Replace with real auth check
    authStore.setJwt('mockJwt')
  }, [jwt])

  const login = useCallback(async () => {
    try {
      await init(PROVIDERS.Metamask)
      await connectOrInstallSnap()
      await authorize()
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [authorize, connectOrInstallSnap, init])

  return { isAuthenticated, jwt, setJwt: authStore.setJwt, login, authorization: authorize }
}
