import { Button, CircularProgress, Stack, useTheme } from '@mui/material'
import { PropsWithChildren, ReactNode } from 'react'

import { ErrorView, NoDataView } from '@/common'
import { Icons, LoadingStates } from '@/enums'
import { UiIcon } from '@/ui'

import IntersectionAnchor from './IntersectionAnchor'

interface Props<D> extends PropsWithChildren {
  items: D[]
  loadingState: LoadingStates
  errorTitle?: string
  noDataTitle?: string
  noDataAction?: ReactNode
  onRetry: () => void
  onLoadNext: () => void
}

export default function InfiniteList<D>({
  items,
  loadingState,
  errorTitle = 'Failed to load list',
  noDataTitle = 'No items yet',
  noDataAction,
  children,
  onRetry,
  onLoadNext,
}: Props<D>) {
  const { spacing } = useTheme()

  return items.length ? (
    <Stack position='relative' spacing={4}>
      {children}
      {loadingState === LoadingStates.NextLoading ? (
        <Stack alignItems='center'>
          <CircularProgress color='secondary' size={spacing(6)} />
        </Stack>
      ) : loadingState === LoadingStates.Error ? (
        <Stack alignItems='center'>
          <Button size='medium' onClick={onLoadNext}>
            Load more
          </Button>
        </Stack>
      ) : (
        <IntersectionAnchor bottom={spacing(50)} onIntersect={onLoadNext} />
      )}
    </Stack>
  ) : loadingState === LoadingStates.Loading ? (
    <Stack alignItems='center' p={20}>
      <CircularProgress color='secondary' />
    </Stack>
  ) : loadingState === LoadingStates.Error ? (
    <ErrorView
      title={errorTitle}
      action={
        <Button
          size='medium'
          startIcon={<UiIcon name={Icons.ArrowCounterClockwise} size={4} />}
          onClick={onRetry}
        >
          Retry
        </Button>
      }
    />
  ) : (
    <NoDataView title={noDataTitle} action={noDataAction} />
  )
}
