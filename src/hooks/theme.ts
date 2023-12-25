import { createTheme } from '@mui/material'
import { useEffect, useMemo } from 'react'

import { ThemeMode } from '@/enums'
import { uiStore, useUiState } from '@/store'
import { componentsTheme, lightPalette, typographyTheme } from '@/theme'

const THEME_CLASSES = {
  [ThemeMode.Light]: 'Theme__light',
  [ThemeMode.Dark]: 'Theme__dark',
}

export const useThemeMode = () => {
  const { themeMode } = useUiState()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: ThemeMode.Light,
          ...lightPalette,
        },
        typography: typographyTheme,
        components: componentsTheme,
        spacing: 4,
        shape: {
          borderRadius: 4,
        },
      }),
    [],
  )

  useEffect(() => {
    if (!themeMode) return

    document.body.classList.add(THEME_CLASSES[themeMode])
  }, [themeMode])

  return { theme, setTheme: uiStore.setThemeMode }
}
