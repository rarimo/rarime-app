import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo, useState } from 'react'

import { useMetamaskZkpSnapContext } from '@/hooks/metamask-zkp-snap'
import { useWeb3Context } from '@/hooks/web3'
import { authStore, useAuthState } from '@/store'

export const useAuth = () => {
  const { jwt } = useAuthState()
  const { init, provider } = useWeb3Context()
  const { connectOrInstallSnap, isSnapInstalled } = useMetamaskZkpSnapContext()
  const [isJwtValid, setIsJwtValid] = useState(false)

  const isAuthorized = useMemo(
    () => provider?.isConnected && isSnapInstalled && isJwtValid,
    [isJwtValid, isSnapInstalled, provider?.isConnected],
  )

  const _setJwt = useCallback((jwt: string) => {
    authStore.setJwt(jwt)
  }, [])

  const checkJwtValid = useCallback(async () => {
    //Todo: add real logic
    setIsJwtValid(true)
  }, [])

  const logOut = useCallback(async () => {
    await provider?.disconnect()
    _setJwt('')
  }, [_setJwt, provider])

  const authorize = useCallback(async () => {
    if (jwt) {
      await checkJwtValid()
      if (isJwtValid) {
        return
      }
      logOut()
    }
    // TODO: Replace with real auth check
    _setJwt('mockJwt')
  }, [_setJwt, checkJwtValid, isJwtValid, jwt, logOut])

  const login = useCallback(async () => {
    await init(PROVIDERS.Metamask)
    await connectOrInstallSnap()
    await authorize()
  }, [authorize, connectOrInstallSnap, init])

  return {
    isAuthorized,
    jwt,
    login,
    authorization: authorize,
    logOut,
    checkJwtValid,
  }
}
