import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo } from 'react'
import { subscribe } from 'valtio'

import { useMetamaskZkpSnapContext } from '@/hooks/metamask-zkp-snap'
import { useWeb3Context } from '@/hooks/web3'
import { authStore, useAuthState, web3Store } from '@/store'

subscribe(web3Store, () => {
  if (web3Store.providerType) return

  authStore.setJwt('')
})

export const useAuth = () => {
  const { jwt } = useAuthState()
  const { init, provider } = useWeb3Context()
  const { isSnapInstalled, connectOrInstallSnap, checkSnapStatus, createIdentity } =
    useMetamaskZkpSnapContext()

  const isJwtValid = useMemo(() => {
    return !!jwt
  }, [jwt])

  const isAuthorized = useMemo(
    () => (provider?.isConnected && isSnapInstalled && isJwtValid) || false,
    [isJwtValid, isSnapInstalled, provider?.isConnected],
  )

  const checkJwtValid = useCallback(() => {
    // TODO: add jwt expiration check
    return true
  }, [])

  const logOut = useCallback(async () => {
    await provider?.disconnect()
    await checkSnapStatus()
    authStore.setJwt(jwt)
  }, [checkSnapStatus, jwt, provider])

  const authorize = useCallback(
    async (_jwt?: string) => {
      const currentJwt = _jwt || jwt

      if (!currentJwt) await logOut()

      // TODO: get did's from this method for jwt checking method
      await createIdentity()

      const isJwtValid = checkJwtValid()

      if (isJwtValid) {
        authStore.setJwt(currentJwt)
        return
      }

      logOut()
    },
    [jwt, logOut, createIdentity, checkJwtValid],
  )

  const login = useCallback(async () => {
    await init(PROVIDERS.Metamask)
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
