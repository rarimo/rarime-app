import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import { useMemo } from 'react'

import { createTheme } from '@/theme'

import ToastsProvider from './providers/ToastsProvider'
import { AppRouter } from './services/router'

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(() => {
    return createTheme(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastsProvider>
        <AppRouter />
      </ToastsProvider>
    </ThemeProvider>
  )
}
