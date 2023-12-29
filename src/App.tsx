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

import { ToastsManager } from './contexts'
import { AppRoutes } from './routes'

const App: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false)

  const { provider, isValidChain } = useWeb3Context()
  const { theme } = useThemeMode()
  const { checkSnapStatus } = useMetamaskZkpSnapContext()
  const { authorize } = useAuth()

  useViewportSizes()

  const init = useCallback(async () => {
    if (provider?.address) return

    try {
      const { isMetamaskInstalled, isSnapInstalled } = await checkSnapStatus()

      if (isMetamaskInstalled && isSnapInstalled) {
        await authorize()
      }
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }

    setIsAppInitialized(true)
  }, [provider?.address, checkSnapStatus, authorize])

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastsManager>
        <div className='App' key={provider?.isConnected ? Number(isValidChain) : 'app_main'}>
          {isAppInitialized ? (
            <AppRoutes />
          ) : (
            <Stack alignItems='center' justifyContent='center' flex={1}>
              <CircularProgress />
            </Stack>
          )}
        </div>
      </ToastsManager>
    </ThemeProvider>
  )
}

export default memo(App)
