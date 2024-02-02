import { useEffect, useMemo, useState } from 'react'

import { ErrorHandler } from '@/helpers'

export const useLoading = <T>(
  initialState: T,
  loadFn: () => Promise<T>,
  options?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadArgs?: any[] | null
    loadOnMount?: boolean
  },
): {
  data: T
  isLoading: boolean
  isLoadingError: boolean
  reload: () => Promise<void>
  update: () => Promise<void>
  reset: () => void
} => {
  const { loadArgs, loadOnMount: _loadOnMount } = options ?? {}
  const loadOnMount = useMemo(() => _loadOnMount ?? true, [_loadOnMount])
  const [isLoading, setIsLoading] = useState(loadOnMount)
  const [isLoadingError, setIsLoadingError] = useState(false)
  const [data, setData] = useState(initialState as T)

  const load = async () => {
    setIsLoading(true)
    setIsLoadingError(false)
    setData(initialState as T)
    try {
      setData(await loadFn())
    } catch (e) {
      setIsLoadingError(true)
      ErrorHandler.process(e)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (loadOnMount) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, loadArgs ?? [])

  const reload = async () => {
    await load()
  }
  const update = async () => {
    setIsLoadingError(false)
    try {
      setData(await loadFn())
    } catch (e) {
      setIsLoadingError(true)
      ErrorHandler.process(e)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setIsLoadingError(false)
    setData(initialState as T)
  }

  return { data, isLoading, isLoadingError, reload, update, reset }
}
