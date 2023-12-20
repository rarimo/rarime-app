import { useCallback } from 'react'
import { proxy, subscribe, useSnapshot } from 'valtio'

import { ThemeMode } from '@/enums'

const storeName = 'ui'

export const uiStore = proxy<{
  viewportWidth: number
  themeMode?: ThemeMode
}>(
  JSON.parse(localStorage.getItem(storeName)!) || {
    viewportWidth: window.innerWidth,
    themeMode: ThemeMode.Light,
  },
)

subscribe(uiStore, () => {
  localStorage.setItem(storeName, JSON.stringify(uiStore))
})

export const useUiStore = () => {
  const uiStoreSnapshot = useSnapshot(uiStore)

  const setViewportWidth = useCallback((width: number) => {
    uiStore.viewportWidth = width
  }, [])

  const setThemeMode = useCallback((mode: ThemeMode) => {
    uiStore.themeMode = mode
  }, [])

  // FIXME
  const clearUiStorage = useCallback(() => {
    uiStore.themeMode = '' as ThemeMode
    uiStore.viewportWidth = 0
  }, [])

  return {
    viewportWidth: uiStoreSnapshot.viewportWidth,
    themeMode: uiStoreSnapshot.themeMode,

    setViewportWidth,
    setThemeMode,
    clearUiStorage,
  }
}
