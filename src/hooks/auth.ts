import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo, useState } from 'react'

import { useMetamaskZkpSnapContext } from '@/hooks/metamask-zkp-snap'
import { useWeb3Context } from '@/hooks/web3'
import { authStore, useAuthState } from '@/store'

export const useAuth = () => {
  const { jwt: storeJwt } = useAuthState()
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
    return true
  }, [])

  const logOut = useCallback(async () => {
    await provider?.disconnect()
    _setJwt('')
    setIsJwtValid(false)
  }, [_setJwt, provider])

  const authorize = useCallback(
    async (jwt?: string) => {
      const currentJwt = jwt || storeJwt

      if (!currentJwt) await logOut()

      const isJwtValid = await checkJwtValid()

      if (isJwtValid) {
        setIsJwtValid(true)
        _setJwt(currentJwt)
        return
      }

      logOut()

      // TODO: Replace with real auth check
    },
    [_setJwt, checkJwtValid, storeJwt, logOut],
  )

  const login = useCallback(async () => {
    await init(PROVIDERS.Metamask)
    await connectOrInstallSnap()
    // TODO: generateProof and /login
    const jwt = 'mockJwt'

    await authorize(jwt)
  }, [authorize, connectOrInstallSnap, init])

  return {
    isAuthorized,
    storeJwt,
    login,
    authorize,
    logOut,
    checkJwtValid,
  }
}
