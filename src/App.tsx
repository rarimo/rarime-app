import { CircularProgress, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { FC, HTMLAttributes, memo, useCallback, useEffect, useState } from 'react'

import { ErrorHandler } from '@/helpers'
import {
  useAuth,
  useMetamaskZkpSnapContext,
  useThemeMode,
  useViewportSizes,
  useWeb3Context,
} from '@/hooks'

const App: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const [isAppInitialized, setIsAppInitialized] = useState(false)

  const { provider, isValidChain, init: initWeb3 } = useWeb3Context()
  const { theme } = useThemeMode()
  const { checkMetamaskExists, checkSnapExists, connectOrInstallSnap } = useMetamaskZkpSnapContext()
  const { authorize } = useAuth()

  useViewportSizes()

  const init = useCallback(async () => {
    if (provider?.address) return

    try {
      if (await checkMetamaskExists()) {
        /**
         * We don't pass providerType here,
         * because only want to check is user was connected before
         */
        await initWeb3()
        if (await checkSnapExists()) {
          await connectOrInstallSnap()
          await authorize()
        }
      }
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }

    setIsAppInitialized(true)
  }, [
    provider?.address,
    checkMetamaskExists,
    initWeb3,
    checkSnapExists,
    connectOrInstallSnap,
    authorize,
  ])

  useEffect(() => {
    let mountingInit = async () => {
      await init()
    }

    mountingInit()

    return () => {
      mountingInit = async () => {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App' key={provider?.isConnected ? Number(isValidChain) : 'app_main'}>
        {isAppInitialized ? (
          children
        ) : (
          <Stack alignItems='center' justifyContent='center' flex={1}>
            <CircularProgress />
          </Stack>
        )}
      </div>
    </ThemeProvider>
  )
}

export default memo(App)
