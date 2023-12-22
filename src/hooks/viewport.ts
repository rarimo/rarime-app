import debounce from 'lodash/debounce'
import { useEffect } from 'react'

import { uiStore, useUiState } from '@/store'

export const useViewportSizes = () => {
  const { viewportWidth } = useUiState()

  const setViewportSizes = () => {
    assignVhCssVariable()
    uiStore.setViewportWidth(window.innerWidth)
  }

  const assignVhCssVariable = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  const setViewportSizesDebounced = debounce(setViewportSizes, 300)

  useEffect(
    () => {
      assignVhCssVariable()
      window.addEventListener('resize', setViewportSizesDebounced)

      return () => window.removeEventListener('resize', setViewportSizesDebounced)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return { viewportWidth }
}
