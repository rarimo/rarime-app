import { Button, CircularProgress, Paper, Stack } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'

import { useEvent } from '@/api/modules/points'
import { NoDataViewer } from '@/common'
import BackLink from '@/common/BackLink'
import ErrorViewer from '@/common/ErrorViewer'
import { RoutePaths } from '@/enums'
import { useCopyToClipboard } from '@/hooks'
import { UiIcon } from '@/ui'

import EventView from './components/EventView'

export default function ActiveTasksId() {
  const { id = '' } = useParams<{ id: string }>()
  const { event, isLoading, isLoadingError } = useEvent(id)

  const { copy, isCopied } = useCopyToClipboard()

  return (
    <Stack spacing={6}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <BackLink to={RoutePaths.Rewards} />
        {event && (
          <Button
            variant='text'
            color='secondary'
            size='small'
            startIcon={<UiIcon componentName={'shareOutlined'} size={5} />}
            sx={{ width: 'fit-content' }}
            onClick={() => copy(window.location.href)}
          >
            {isCopied ? 'Link copied' : 'Share'}
          </Button>
        )}
      </Stack>

      <Paper>
        {isLoading ? (
          <Stack alignItems='center' p={20}>
            <CircularProgress color={'secondary'} />
          </Stack>
        ) : isLoadingError ? (
          <ErrorViewer
            title='Task cannot be loaded :('
            action={
              <Button component={NavLink} to={RoutePaths.RewardsActive} size='medium'>
                View all tasks
              </Button>
            }
          />
        ) : !event ? (
          <NoDataViewer
            title='Task not found'
            action={
              <Button component={NavLink} to={RoutePaths.RewardsActive} size='medium'>
                View all tasks
              </Button>
            }
          />
        ) : (
          <EventView event={event} />
        )}
      </Paper>
    </Stack>
  )
}
