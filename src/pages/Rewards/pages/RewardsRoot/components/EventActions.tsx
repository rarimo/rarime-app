import { Button, ButtonProps, useTheme } from '@mui/material'
import { useMemo, useRef } from 'react'
import { generatePath, NavLink } from 'react-router-dom'

import { claimEvent, Event, EventStatuses } from '@/api/modules/points'
import { BusEvents, RoutePaths } from '@/enums'
import { bus } from '@/helpers'
import { useLoading } from '@/hooks'
import { rewardsStore } from '@/store'

import { useConfetti } from '../hooks/useConfetti'

interface Props {
  event: Event
  onClaim: () => Promise<void>
}

export default function EventActions({ event, onClaim }: Props) {
  const { spacing } = useTheme()
  const { fireConfetti } = useConfetti()

  const claimRef = useRef<HTMLButtonElement>(null)
  const commonButtonProps: ButtonProps = useMemo(() => {
    return {
      size: 'medium',
      sx: {
        width: spacing(19),
        height: spacing(8),
      },
    }
  }, [spacing])

  const handleClaim = async () => {
    await claimEvent(event.id)
    await onClaim()
    rewardsStore.loadBalance()

    fireConfetti(claimRef.current!)
    bus.emit(BusEvents.success, {
      message: `${event.meta.static.reward} RMO claimed!`,
    })
  }

  const { isLoading, reload } = useLoading(undefined, () => handleClaim(), {
    loadOnMount: false,
  })

  return event.status === EventStatuses.Fulfilled ? (
    <Button ref={claimRef} disabled={isLoading} onClick={reload} {...commonButtonProps}>
      Claim
    </Button>
  ) : (
    <Button
      component={NavLink}
      to={generatePath(RoutePaths.RewardsEventId, { id: event.id })}
      color='secondary'
      {...commonButtonProps}
    >
      View
    </Button>
  )
}
