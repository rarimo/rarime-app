import { useEffect } from 'react'

import { ThemeMode } from '@/enums'
import { uiStore, useUiState } from '@/store'
import { theme } from '@/theme'

const THEME_CLASSES = {
  [ThemeMode.Light]: 'Theme__light',
  [ThemeMode.Dark]: 'Theme__dark',
}

export const useThemeMode = () => {
  const { themeMode } = useUiState()

  useEffect(() => {
    if (!themeMode) return

    document.body.classList.add(THEME_CLASSES[themeMode])
  }, [themeMode])

  return { theme, setTheme: uiStore.setThemeMode }
}
