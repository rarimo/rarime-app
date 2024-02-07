import { CircularProgress, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { FC, HTMLAttributes, memo, useCallback, useEffect, useMemo, useState } from 'react'

import { ErrorHandler } from '@/helpers'
import { useMetamaskZkpSnapContext, useViewportSizes, useWeb3Context } from '@/hooks'

import { ToastsManager } from './contexts'
import { AppRoutes } from './routes'
import { useUiState } from './store'
import { createTheme } from './theme'

const App: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false)

  const { provider, isValidChain } = useWeb3Context()
  const { checkSnapStatus, connectOrInstallSnap } = useMetamaskZkpSnapContext()
  const { paletteMode } = useUiState()
  useViewportSizes()

  const init = useCallback(async () => {
    try {
      const { isMetamaskInstalled, isSnapInstalled } = await checkSnapStatus()

      if (isMetamaskInstalled && isSnapInstalled) {
        await connectOrInstallSnap()
      }
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }

    setIsAppInitialized(true)
  }, [checkSnapStatus, connectOrInstallSnap])

  const theme = useMemo(() => createTheme(paletteMode), [paletteMode])

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
              <CircularProgress color={'secondary'} />
            </Stack>
          )}
        </div>
      </ToastsManager>
    </ThemeProvider>
  )
}

export default memo(App)
