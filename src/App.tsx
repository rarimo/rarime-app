import { CircularProgress, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { FC, HTMLAttributes, memo, useCallback, useEffect, useMemo, useState } from 'react'

import { ToastsManager } from '@/contexts'
import { ErrorHandler } from '@/helpers'
import { useAuth, useViewportSizes } from '@/hooks'
import { AppRoutes } from '@/routes'
import { credentialsStore, useUiState, web3Store } from '@/store'
import { createTheme } from '@/theme'

const App: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false)

  const { paletteMode } = useUiState()
  const { connectProviders } = useAuth()

  useViewportSizes()

  const init = useCallback(async () => {
    try {
      const { isMetamaskInstalled, isSnapInstalled } = await web3Store.checkSnapStatus()

      if (isMetamaskInstalled && isSnapInstalled) {
        await connectProviders()

        await credentialsStore.load()
      }
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }

    setIsAppInitialized(true)
  }, [connectProviders])

  const theme = useMemo(() => createTheme(paletteMode), [paletteMode])

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastsManager>
        <div className='App' key='app_main'>
          {isAppInitialized ? (
            <AppRoutes />
          ) : (
            <Stack alignItems='center' justifyContent='center' flex={1}>
              <CircularProgress color='secondary' />
            </Stack>
          )}
        </div>
      </ToastsManager>
    </ThemeProvider>
  )
}

export default memo(App)
