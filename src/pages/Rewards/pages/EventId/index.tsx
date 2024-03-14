import { UnauthorizedError } from '@distributedlab/jac'
import { Button, CircularProgress, Paper, Stack } from '@mui/material'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { getEventById } from '@/api/modules/points'
import { BackLink, ErrorView, NoDataView } from '@/common'
import { Icons, RoutePaths } from '@/enums'
import { useCopyToClipboard, useLoading } from '@/hooks'
import { UiIcon } from '@/ui'

import EventView from './components/EventView'

export default function EventId() {
  const { id = '' } = useParams<{ id: string }>()
  const { copy, isCopied } = useCopyToClipboard()
  const navigate = useNavigate()

  const loadEvent = async () => {
    try {
      const { data } = await getEventById(id)
      return data
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(RoutePaths.Rewards)
        return null
      }

      throw error
    }
  }

  const { data: event, isLoading, isLoadingError, reload } = useLoading(null, loadEvent)

  return (
    <Stack spacing={6}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <BackLink to={RoutePaths.Rewards} />
        {event && (
          <Button
            variant='text'
            color='secondary'
            size='small'
            startIcon={<UiIcon name={Icons.Share} size={5} />}
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
            <CircularProgress color='secondary' />
          </Stack>
        ) : isLoadingError ? (
          <ErrorView
            title='Event cannot be loaded'
            action={
              <Button size='medium' onClick={reload}>
                Retry
              </Button>
            }
          />
        ) : event ? (
          <EventView event={event} />
        ) : (
          <NoDataView
            title='Event not found'
            action={
              <Button component={NavLink} to={RoutePaths.Rewards} size='medium'>
                View all events
              </Button>
            }
          />
        )}
      </Paper>
    </Stack>
  )
}
