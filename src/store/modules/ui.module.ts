import { ThemeMode } from '@/enums'
import { createStore } from '@/helpers'

interface UiStore {
  viewportWidth: number
  themeMode?: ThemeMode
}

export const [uiStore, useUiState] = createStore(
  'ui',
  {
    viewportWidth: 0,
    themeMode: ThemeMode.Light,
  } as UiStore,
  state => ({
    setViewportWidth: (width: number) => {
      state.viewportWidth = width
    },
    setThemeMode: (mode: ThemeMode) => {
      state.themeMode = mode
    },
    clearUiStorage: () => {
      state.themeMode = '' as ThemeMode
      state.viewportWidth = 0
    },
  }),
)
