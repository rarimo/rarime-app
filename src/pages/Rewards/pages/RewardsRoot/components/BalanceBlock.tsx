import { Button, Divider, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Icons, RoutePaths } from '@/enums'
import { useRewardsState } from '@/store/modules/rewards.module'
import { UiButton, UiIcon } from '@/ui'

import ClaimModal from './ClaimModal'

export default function BalanceBlock() {
  const { palette, spacing } = useTheme()
  const { balance } = useRewardsState()

  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)

  return (
    <Paper component={Stack} spacing={6}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={4}>
        <Stack spacing={2}>
          <Typography variant='body3' color={palette.text.secondary}>
            Reserved RMO
          </Typography>
          <Typography variant='h4'>{balance?.amount ?? '–'}</Typography>
        </Stack>

        <UiButton
          component={NavLink}
          to={RoutePaths.RewardsLeaderboard}
          color='warning'
          size='medium'
          sx={{ height: spacing(9), px: 3 }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <UiIcon name={Icons.Trophy} size={5} />
              <Typography variant='subtitle4'>{balance?.rank ?? ''}</Typography>
            </Stack>
            <Typography variant='buttonMedium'>Leaderboard</Typography>
            <UiIcon componentName='chevronRight' size={4} />
          </Stack>
        </UiButton>
      </Stack>
      <Divider />
      <Stack direction={'row'} spacing={4} justifyContent={'space-between'} alignItems={'center'}>
        <Button
          size='medium'
          disabled={!balance}
          startIcon={<UiIcon name={Icons.Swap} size={5} />}
          sx={{ width: spacing(68), height: spacing(10) }}
          onClick={() => setIsClaimModalOpen(true)}
        >
          Claim
        </Button>
        <Typography variant='caption2' color={palette.text.secondary}>
          {/* TODO: update claim end date */}
          Please claim before 14 Dec 2023, Or you lose this RMO
        </Typography>
      </Stack>

      <ClaimModal
        open={isClaimModalOpen}
        reservedBalance={balance?.amount ?? 0}
        walletBalance={0}
        onClose={() => setIsClaimModalOpen(false)}
        onClaim={() => setIsClaimModalOpen(false)}
      />
    </Paper>
  )
}
