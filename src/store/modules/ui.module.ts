import { PaletteMode } from '@mui/material'

import { createStore } from '@/helpers'

type UiStore = {
  viewportWidth: number
  paletteMode: PaletteMode
}

export const [uiStore, useUiState] = createStore(
  'ui',
  {
    viewportWidth: 0,
    paletteMode: 'light',
  } as UiStore,
  state => ({
    setViewportWidth: (width: number) => {
      state.viewportWidth = width
    },
    setPaletteMode: (mode: PaletteMode) => {
      state.paletteMode = mode
    },
    clearUiStorage: () => {
      state.paletteMode = 'light'
      state.viewportWidth = 0
    },
  }),
)
