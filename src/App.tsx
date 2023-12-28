import { CssBaseline, ThemeProvider } from '@mui/material'
import { FC, HTMLAttributes, memo } from 'react'

import { useThemeMode, useViewportSizes, useWeb3Context } from '@/hooks'

const App: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const { provider, isValidChain } = useWeb3Context()
  const { theme } = useThemeMode()

  useViewportSizes()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App' key={provider?.isConnected ? Number(isValidChain) : 'app_main'}>
        {children}
      </div>
    </ThemeProvider>
  )
}

export default memo(App)
