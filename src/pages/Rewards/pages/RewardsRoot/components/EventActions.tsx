import { Button, useTheme } from '@mui/material'
import { useRef } from 'react'

import { claimEvent, EventStatuses, PointsEvent } from '@/api/modules/points'
import { BusEvents } from '@/enums'
import { bus } from '@/helpers'
import { useLoading } from '@/hooks'
import { rewardsStore } from '@/store'

import { useConfetti } from '../hooks/useConfetti'

interface Props {
  event: PointsEvent
  onClaim: () => Promise<void>
}

export default function EventActions({ event, onClaim }: Props) {
  const { spacing } = useTheme()
  const { fireConfetti } = useConfetti()

  const claimRef = useRef<HTMLButtonElement>(null)

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

  return (
    event.status === EventStatuses.Fulfilled && (
      <Button
        ref={claimRef}
        disabled={isLoading}
        onClick={reload}
        size='medium'
        sx={{
          width: spacing(19),
          height: spacing(8),
        }}
      >
        Claim
      </Button>
    )
  )
}
