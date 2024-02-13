import { useLoading } from '@/hooks'

import { getEventById } from '../helpers'

export const useEvent = (id: string) => {
  const loadEvent = async () => {
    const { data } = await getEventById(id)
    return data
  }

  const {
    data: event,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading(null, loadEvent, {
    loadOnMount: !!id,
    loadArgs: [id],
  })

  return {
    event,
    isLoading,
    isLoadingError,
    isEmpty,
  }
}
