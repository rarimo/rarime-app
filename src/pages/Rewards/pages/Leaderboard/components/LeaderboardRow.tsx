import { Box, BoxProps, Grid, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { Balance } from '@/api/modules/points'
import { UserAvatar } from '@/common'
import { useIdentityState } from '@/store'

// TODO: experimental, replace with formatter
function formatDid(value: string, maxLength = 16) {
  const startLength = Math.floor(maxLength / 2)
  const endLength = maxLength - startLength

  const did = value.replace('did:iden3:readonly:', '')
  return did.length > maxLength ? did.slice(0, startLength) + '...' + did.slice(-endLength) : did
}

interface Props {
  balance: Balance
  rank: number
}

export default function LeaderboardRow({ balance, rank }: Props) {
  const { palette, spacing } = useTheme()
  const { userDid } = useIdentityState()

  const leaderIcon = useMemo(() => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return ''
    }
  }, [rank])

  const isMyDid = useMemo(() => userDid === balance.id, [userDid, balance.id])

  const boxProps: BoxProps = isMyDid
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

  return (
    <Box py={4} {...boxProps}>
      <Grid container spacing={16} alignItems={'center'}>
        <Grid item xs={2}>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={
              rank <= 3 ? palette.primary.main : isMyDid ? palette.background.paper : undefined
            }
            color={rank <= 3 ? palette.common.black : palette.text.primary}
            width={spacing(8)}
            height={spacing(8)}
            borderRadius={250}
            border={1}
            borderColor={rank <= 3 ? palette.primary.main : palette.action.active}
          >
            <Typography variant={rank >= 100 ? 'subtitle5' : 'subtitle4'}>{rank}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction={'row'} alignItems={'center'} spacing={4}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <UserAvatar userDid={balance.id} size={5} />
              <Typography variant='subtitle4'>
                {`${formatDid(balance.id, 24)} ${leaderIcon}`}
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
            {new Intl.NumberFormat().format(balance.amount)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
