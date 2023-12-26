import { Stack, StackProps } from '@mui/material'
import { useCallback, useEffect } from 'react'

import { ErrorHandler } from '@/helpers'

// FIXME: implement real filters
interface Props extends StackProps {
  filters: { content: string }
}

// TODO: here will be a component with load and pagination logic
export default function List({ filters, ...rest }: Props) {
  const loadList = useCallback(async () => {
    try {
      /* TODO */
    } catch (error) {
      ErrorHandler.process(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  useEffect(() => {
    loadList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Stack {...rest}>{filters.content}</Stack>
}
