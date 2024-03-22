import { CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useMemo } from 'react'

import { PointsEvent } from '@/api/modules/points'
import { NoDataView } from '@/common'
import { rewardsStore, useRewardsState } from '@/store'

import ReferralLink from './ReferralLink'

interface Props {
  event: PointsEvent
}

export default function InvitationLinks({ event }: Props) {
  const { balance } = useRewardsState()
  const { palette } = useTheme()

  const activeReferralCodes = useMemo(() => balance?.active_referral_codes ?? [], [balance])
  const consumedReferralCodes = useMemo(() => balance?.consumed_referral_codes ?? [], [balance])

  const referralCodes = useMemo<{ code: string; isConsumed: boolean }[]>(() => {
    return [
      ...activeReferralCodes.map(code => ({ code, isConsumed: false })),
      ...consumedReferralCodes.map(code => ({ code, isConsumed: true })),
    ]
  }, [activeReferralCodes, consumedReferralCodes])

  useEffect(() => {
    rewardsStore.loadBalance()
  }, [])

  return balance ? (
    referralCodes.length ? (
      <Stack spacing={5}>
        <Stack spacing={2}>
          <Typography variant='subtitle3'>
            Invited {consumedReferralCodes.length}/{referralCodes.length}
          </Typography>
          <Typography variant='body3' color={palette.text.secondary}>
            STUB: Invite friends and earn RMO
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {referralCodes.map(({ code, isConsumed }, index) => (
            <ReferralLink
              key={index}
              index={index}
              reward={Math.floor(event.meta.static.reward / referralCodes.length)}
              code={code}
              isUsed={isConsumed}
            />
          ))}
        </Stack>
      </Stack>
    ) : (
      <NoDataView title='No invitation links' />
    )
  ) : (
    <Stack alignItems='center' p={20}>
      <CircularProgress color='secondary' />
    </Stack>
  )
}
