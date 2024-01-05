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
  const { userDid, isSnapInstalled, connectOrInstallSnap, checkSnapStatus, createIdentity } =
    useMetamaskZkpSnapContext()

  const isJwtValid = useMemo(() => {
    return !!jwt
  }, [jwt])

  const isAuthorized = useMemo(
    () => (provider?.isConnected && isSnapInstalled && isJwtValid) || false,
    [isJwtValid, isSnapInstalled, provider?.isConnected],
  )

  const checkJwtValid = useCallback(
    (did?: string) => {
      const currentDid = did || userDid

      // TODO: add jwt expiration and did check
      return !!currentDid
    },
    [userDid],
  )

  const logout = useCallback(async () => {
    await provider?.disconnect()
    await checkSnapStatus()
    authStore.setJwt(jwt)
  }, [checkSnapStatus, jwt, provider])

  const connectProviders = useCallback(async () => {
    await init(PROVIDERS.Metamask)
    const connector = await connectOrInstallSnap()

    await checkSnapStatus()

    return createIdentity(connector)
  }, [checkSnapStatus, connectOrInstallSnap, createIdentity, init])

  const authorize = useCallback(
    async (_jwt?: string) => {
      const currentJwt = _jwt || jwt

      if (!currentJwt) await logout()

      const { identityIdString } = await connectProviders()

      const isJwtValid = checkJwtValid(identityIdString)

      if (!isJwtValid) {
        logout()
      }
    },
    [jwt, logout, connectProviders, checkJwtValid],
  )

  const login = useCallback(async () => {
    const { identityIdString } = await connectProviders()

    // TODO: generateProof and /login
    const jwt = identityIdString

    authStore.setJwt(jwt)
  }, [connectProviders])

  return {
    isAuthorized,
    login,
    authorize,
    logout,
  }
}
