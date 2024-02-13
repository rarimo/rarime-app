import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useBalance } from '@/api/modules/points'
import { Icons, RoutePaths } from '@/enums'
import { useIdentityState } from '@/store'
import { UiButton, UiIcon } from '@/ui'

import LevelProgress from './LevelProgress'
import WithdrawModal from './WithdrawModal'

export default function BalanceBlock() {
  const { palette, spacing } = useTheme()
  const { userDid } = useIdentityState()
  const { balance, isLoading, isLoadingError } = useBalance(userDid)

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  if (isLoading) return <></>
  if (isLoadingError) return <></>
  if (!balance) return <></>

  return (
    <Stack
      p={6}
      spacing={4}
      bgcolor={palette.background.light}
      border={1}
      borderColor={palette.additional.layerBorder}
      borderRadius={4}
    >
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={4}>
        <Stack spacing={2}>
          <Typography variant='body3' color={palette.text.secondary}>
            Reserved
          </Typography>
          <Typography variant='h4'>{balance.amount} RMO</Typography>
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
              <Typography variant='subtitle4'>{balance.rank}</Typography>
            </Stack>
            <Typography variant='buttonMedium'>Leaderboard</Typography>
            <UiIcon componentName='chevronRight' size={4} />
          </Stack>
        </UiButton>
      </Stack>
      <Divider />
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Button
          color='secondary'
          size='medium'
          startIcon={<UiIcon name={Icons.Swap} size={5} />}
          sx={{ width: spacing(60), height: spacing(10) }}
          onClick={() => setIsWithdrawModalOpen(true)}
        >
          Withdraw
        </Button>
        <LevelProgress balance={balance.amount} width={spacing(80)} />
      </Stack>

      <WithdrawModal
        open={isWithdrawModalOpen}
        reservedBalance={balance.amount}
        walletBalance={0}
        onClose={() => setIsWithdrawModalOpen(false)}
        onWithdraw={() => setIsWithdrawModalOpen(false)}
      />
    </Stack>
  )
}
