import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ThemeMode } from '@/enums'
import { UiStorageState } from '@/types'

import { RootState } from './index'
import { uiStorage } from './storages'

export const uiInitialState: UiStorageState = {
  viewportWidth: window.innerWidth,
  themeMode: ThemeMode.Light,
}

export const uiSlice = createSlice({
  name: 'ui',

  initialState: uiInitialState,

  reducers: {
    setViewportWidth: (state, action: PayloadAction<number>) => {
      state.viewportWidth = action.payload
    },

    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload
      uiStorage.save(state)
    },

    clearUiStorage: state => {
      state.themeMode = '' as ThemeMode
      uiStorage.clear()
    },
  },
})

export const { setViewportWidth, setThemeMode, clearUiStorage } = uiSlice.actions

export const viewportWidth = (state: RootState) => state.ui.viewportWidth
export const themeMode = (state: RootState) => state.ui.themeMode

export default uiSlice.reducer
