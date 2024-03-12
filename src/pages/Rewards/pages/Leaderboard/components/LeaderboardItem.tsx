import { Box, BoxProps, Grid, Stack, StackProps, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { Balance } from '@/api/modules/points'
import { UserAvatar } from '@/common'
import { formatDidShort, formatNumber } from '@/helpers'
import { useIdentityState } from '@/store'

interface Props {
  balance: Balance
  rank: number
}

export default function LeaderboardItem({ balance, rank }: Props) {
  const { palette, spacing } = useTheme()
  const { userDid } = useIdentityState()

  const leaderIcon = useMemo(() => {
    return ['', '🥇', '🥈', '🥉'][rank] ?? ''
  }, [rank])

  const isMyDid = useMemo(() => userDid === balance.id, [userDid, balance.id])

  const wrapperProps = useMemo<BoxProps>(() => {
    return isMyDid
      ? {
          bgcolor: palette.action.active,
          px: 6,
          mx: -6,
          borderRadius: 2,
          sx: {
            '& + .MuiBox-root': {
              borderTop: 0,
            },
          },
        }
      : {
          borderTop: 1,
          borderColor: palette.divider,
        }
  }, [isMyDid, palette])

  const rankProps = useMemo<StackProps>(() => {
    return rank > 3
      ? {
          bgcolor: isMyDid ? palette.background.paper : undefined,
          color: palette.text.primary,
          borderColor: palette.action.active,
        }
      : {
          bgcolor: palette.primary.main,
          color: palette.common.black,
          borderColor: palette.primary.main,
        }
  }, [isMyDid, palette, rank])

  return (
    <Box py={4} {...wrapperProps}>
      <Grid container spacing={16} alignItems={'center'}>
        <Grid item xs={2}>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            width={spacing(8)}
            height={spacing(8)}
            borderRadius={250}
            border={1}
            {...rankProps}
          >
            <Typography variant={rank >= 100 ? 'subtitle5' : 'subtitle4'}>{rank}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction={'row'} alignItems={'center'} spacing={4}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <UserAvatar userDid={balance.id} size={5} />
              <Typography variant='subtitle4'>
                {`${formatDidShort(balance.id)} ${leaderIcon}`}
              </Typography>
            </Stack>
            {isMyDid && (
              <Typography
                variant='overline3'
                px={1.5}
                py={0.5}
                borderRadius={25}
                color={palette.text.secondary}
                bgcolor={palette.action.hover}
              >
                You
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item xs={4} textAlign={'right'}>
          <Typography
            variant='subtitle4'
            px={4}
            py={1}
            bgcolor={palette.action.active}
            borderRadius={12}
          >
            {formatNumber(balance.amount)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
