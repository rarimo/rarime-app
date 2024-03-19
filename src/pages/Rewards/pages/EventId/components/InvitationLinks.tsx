import { CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useMemo } from 'react'

import { PointsEvent } from '@/api/modules/points'
import { NoDataView } from '@/common'
import { rewardsStore, useRewardsState } from '@/store'

import ReferralLink from './ReferralLink'

interface Props {
  event: PointsEvent
}

const MAX_REFERRAL_CODES = 5

export default function InvitationLinks({ event }: Props) {
  const { balance } = useRewardsState()
  const { palette } = useTheme()

  const referralCodes = useMemo(() => {
    return balance?.referral_codes ?? []
  }, [balance])

  useEffect(() => {
    rewardsStore.loadBalance()
  }, [])

  return balance ? (
    referralCodes.length ? (
      <Stack spacing={5}>
        <Stack spacing={2}>
          <Typography variant='subtitle3'>
            Invited {MAX_REFERRAL_CODES - referralCodes.length}/{MAX_REFERRAL_CODES}
          </Typography>
          <Typography variant='body3' color={palette.text.secondary}>
            STUB: Invite friends and earn RMO
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {new Array(MAX_REFERRAL_CODES).fill(null).map((_, index) => (
            <ReferralLink
              key={index}
              index={index}
              reward={Math.floor(event.meta.static.reward / MAX_REFERRAL_CODES)}
              code={referralCodes[index]}
              isUsed={index >= referralCodes.length}
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
