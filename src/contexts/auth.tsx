import { PROVIDERS } from '@distributedlab/w3p'
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

import { useMetamaskZkpSnapContext, useWeb3Context } from '@/hooks'
import { authStore, useAuthState } from '@/store'

interface AuthContextValue {
  isAuthorized: boolean
  login: () => Promise<void>
  authorize: () => Promise<void>
  logOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthorized: false,
  login: () => Promise.resolve(),
  authorize: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
})

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { jwt: storeJwt } = useAuthState()
  const { init, provider } = useWeb3Context()
  const { isSnapInstalled, connectOrInstallSnap, checkSnapStatus } = useMetamaskZkpSnapContext()
  const [isJwtValid, setIsJwtValid] = useState(false)

  const isAuthorized = useMemo(
    () => (provider?.isConnected && isSnapInstalled && isJwtValid) || false,
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
    // FIXME: if use disconnect snap, and then click login - nothing will happen
    await connectOrInstallSnap()

    await checkSnapStatus()
    // TODO: generateProof and /login
    const jwt = 'mockJwt'

    await authorize(jwt)
  }, [authorize, checkSnapStatus, connectOrInstallSnap, init])

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        login,
        authorize,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
