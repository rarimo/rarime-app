import { createTheme } from '@mui/material'
import { useEffect, useMemo } from 'react'

import { ThemeMode } from '@/enums'
import { useAppDispatch } from '@/hooks'
import { setThemeMode } from '@/store'
import { componentsTheme, lightPalette, typographyTheme } from '@/theme'

const THEME_CLASSES = {
  [ThemeMode.Light]: 'Theme__light',
}

export const useThemeMode = () => {
  const dispatch = useAppDispatch()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: ThemeMode.Light,
          ...lightPalette,
        },
        typography: typographyTheme,
        components: componentsTheme,
        shape: {
          borderRadius: 8,
        },
      }),
    [],
  )

  useEffect(() => {
    document.body.classList.add(THEME_CLASSES[ThemeMode.Light])
    dispatch(setThemeMode(ThemeMode.Light))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { theme }
}
