import debounce from 'lodash/debounce'
import { useEffect } from 'react'

import { setViewportWidth, viewportWidth as _viewportWidth } from '@/store'

import { useAppDispatch, useAppSelector } from './store'

export const useViewportSizes = () => {
  const dispatch = useAppDispatch()
  const viewportWidth = useAppSelector(_viewportWidth)

  const setViewportSizes = () => {
    assignVhCssVariable()
    dispatch(setViewportWidth(window.innerWidth))
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
