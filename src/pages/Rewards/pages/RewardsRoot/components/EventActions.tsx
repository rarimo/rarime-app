import { Button, ButtonProps, useTheme } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import { Event, EventStatuses } from '@/api/modules/points'
import { BusEvents, RoutePaths } from '@/enums'
import { bus } from '@/helpers'

import { useConfetti } from '../hooks/useConfetti'

type Props = {
  event: Event
}

export default function EventActions({ event }: Props) {
  const { spacing } = useTheme()
  const { fireConfetti } = useConfetti()

  const sharedButtonProps: ButtonProps = {
    size: 'medium',
    sx: { width: spacing(19), height: spacing(8) },
  }

  return event.status === EventStatuses.Fulfilled ? (
    <Button
      {...sharedButtonProps}
      onClick={e => {
        fireConfetti(e.target as HTMLElement)
        bus.emit(BusEvents.success, {
          message: `${event.meta.static.reward} RMO claimed!`,
        })
      }}
    >
      Claim
    </Button>
  ) : (
    <Button
      component={NavLink}
      to={generatePath(RoutePaths.RewardsEventId, { id: event.id })}
      color='secondary'
      {...sharedButtonProps}
    >
      View
    </Button>
  )
}
