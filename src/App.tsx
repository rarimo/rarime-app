import { CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'

import { createTheme } from '@/theme'

import ToastsProvider from './providers/ToastsProvider'
import { AppRouter } from './services/router'

export default function App() {
  const theme = useMemo(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    return createTheme(systemTheme)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastsProvider>
        <AppRouter />
      </ToastsProvider>
    </ThemeProvider>
  )
}
