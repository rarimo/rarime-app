import { CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import { useEffect } from 'react'

import { Event } from '@/api/modules/points'
import { NoDataView } from '@/common'
import { rewardsStore, useRewardsState } from '@/store'

import ReferralLink from './ReferralLink'

interface Props {
  event: Event
}

const MAX_REFERRAL_CODES = 5

export default function InvitationLinks({ event }: Props) {
  const { balance } = useRewardsState()
  const { palette } = useTheme()

  useEffect(() => {
    rewardsStore.loadBalance()
  }, [])

  return balance ? (
    balance.referral_codes ? (
      <Stack spacing={5}>
        <Stack spacing={2}>
          {/* TODO: Implement the actual invited count */}
          <Typography variant='subtitle3'>
            Invited {MAX_REFERRAL_CODES - balance.referral_codes.length}/{MAX_REFERRAL_CODES}
          </Typography>
          <Typography variant='body3' color={palette.text.secondary}>
            STUB: Invite friends and earn RMO
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {balance.referral_codes.map((code, index) => (
            <ReferralLink
              key={code}
              code={code}
              index={index}
              reward={event.meta.static.reward}
              // TODO: Implement the actual isUsed
              // isUsed={index % 2 === 1}
            />
          ))}
        </Stack>
      </Stack>
    ) : (
      <NoDataView title='No Referral Codes' />
    )
  ) : (
    <Stack alignItems='center' p={20}>
      <CircularProgress color='secondary' />
    </Stack>
  )
}
