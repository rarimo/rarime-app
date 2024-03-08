import { JsonApiLinkFields, JsonApiResponse } from '@distributedlab/jac'
import { useCallback, useEffect, useState } from 'react'

import { LoadingStates } from '@/enums'
import { ErrorHandler } from '@/helpers'

export const useMultiPageLoading = <D, M>(
  loadFn: () => Promise<JsonApiResponse<D[], M>>,
  loadOnMount = true,
): {
  data: D[]
  meta?: M
  loadingState: LoadingStates
  load: () => Promise<void>
  reload: () => Promise<void>
  loadNext: () => Promise<void>
} => {
  const [response, setResponse] = useState<JsonApiResponse<D[], M>>()
  const [data, setData] = useState<D[]>([])
  const [meta, setMeta] = useState<M>()
  const [loadingState, setLoadingState] = useState<LoadingStates>(LoadingStates.Initial)
  const [hasNext, setHasNext] = useState(true)

  const load = useCallback(async () => {
    setLoadingState(LoadingStates.Loading)
    try {
      const res = await loadFn()
      setResponse(res)
      setData(res.data)
      setMeta(res.meta)
      setLoadingState(LoadingStates.Loaded)
    } catch (error) {
      setLoadingState(LoadingStates.Error)
      ErrorHandler.process(error)
    }
  }, [loadFn])

  const loadNext = useCallback(async () => {
    if (!response || !hasNext || loadingState === LoadingStates.NextLoading) return

    setLoadingState(LoadingStates.NextLoading)
    try {
      const res = await response?.fetchPage(JsonApiLinkFields.next)
      setResponse(res)
      setData(prev => prev.concat(res.data))
      setHasNext(res.data.length > 0)
      setLoadingState(LoadingStates.Loaded)
    } catch (error) {
      setLoadingState(LoadingStates.Error)
      ErrorHandler.process(error)
    }
  }, [response, hasNext, loadingState])

  const reset = useCallback(() => {
    setData([])
    setMeta(undefined)
    setLoadingState(LoadingStates.Initial)
    setHasNext(true)
  }, [])

  const reload = useCallback(async () => {
    reset()
    await load()
  }, [load, reset])

  useEffect(() => {
    if (loadOnMount) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    data,
    meta,
    loadingState,
    load,
    reload,
    loadNext,
  }
}
