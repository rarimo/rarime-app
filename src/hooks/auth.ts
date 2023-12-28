import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo } from 'react'

import { useMetamaskZkpSnapContext } from '@/hooks/metamask-zkp-snap'
import { useWeb3Context } from '@/hooks/web3'
import { authStore, useAuthState } from '@/store'

export const useAuth = () => {
  const { jwt } = useAuthState()
  const { init, provider } = useWeb3Context()
  const { isSnapInstalled, connectOrInstallSnap, checkSnapStatus } = useMetamaskZkpSnapContext()

  const isJwtValid = useMemo(() => {
    return !!jwt
  }, [jwt])

  const isAuthorized = useMemo(
    () => (provider?.isConnected && isSnapInstalled && isJwtValid) || false,
    [isJwtValid, isSnapInstalled, provider?.isConnected],
  )

  const _setJwt = useCallback((jwt: string) => {
    authStore.setJwt(jwt)
  }, [])

  const checkJwtValid = useCallback(() => {
    //Todo: add real logic
    return true
  }, [])

  const logOut = useCallback(async () => {
    await provider?.disconnect()
    _setJwt('')
  }, [_setJwt, provider])

  const authorize = useCallback(
    async (_jwt?: string) => {
      const currentJwt = _jwt || jwt

      if (!currentJwt) await logOut()

      const isJwtValid = checkJwtValid()

      if (isJwtValid) {
        _setJwt(currentJwt)
        return
      }

      logOut()

      // TODO: Replace with real auth check
    },
    [jwt, logOut, checkJwtValid, _setJwt],
  )

  const login = useCallback(async () => {
    await init(PROVIDERS.Metamask)
    // FIXME: if use disconnect snap, and then click login - nothing will happen
    await connectOrInstallSnap()

    await checkSnapStatus()
    // TODO: generateProof and /login
    const jwt = 'mockJwt'

    await authorize(jwt)
  }, [authorize, checkSnapStatus, connectOrInstallSnap, init])

  return {
    isAuthorized,
    login,
    authorize,
    logOut,
  }
}
