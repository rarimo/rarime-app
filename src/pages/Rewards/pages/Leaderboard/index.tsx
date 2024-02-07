import { Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { NavLink } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { UiButton, UiIcon } from '@/ui'

export default function Leaderboard() {
  const { palette, spacing } = useTheme()

  const participants = [
    {
      id: 'mhQHvqmvimne...VHCL5EufeZvfzigRt',
      points: 25345,
    },
    {
      id: 'mi1QKgywFcFD...7d35QRaHwd6b6Cxy',
      points: 25123,
    },
    {
      id: 'mmaJ5kAjbGLR....VcfqwsMPi7kHK1f',
      points: 23402,
    },
    {
      id: 'mhQHvqmvimne...VHCL5EufeZvfzigRv',
      points: 21502,
    },
    {
      id: 'mi1QKgywFcFD...7d35QRaHwd6b6Cxb',
      points: 20420,
    },
    {
      id: 'mmaJ5kAjbGLR....VcfqwsMPi7kHK1a',
      points: 19499,
    },
    {
      id: 'mi1QKgywFcFD...7d35QRaHwd6b6Cxe',
      points: 8992,
    },
    {
      id: 'ahQHvqmvimne...VHCL5EufeZvfzigRt',
      points: 8150,
    },
    {
      id: 'whQHvqmvimne...VHCL5EufeZvfzigRt',
      points: 4520,
    },
    {
      id: 'mhQHvqmvimne...VHCL5EufeZvfzigRa',
      points: 1402,
    },
  ]

  const myParticipant = {
    position: 291,
    id: 'mhQHvqmvimne...VHCL5EufeZvfzigRt',
    points: 381,
  }

  const getLeaderIcon = (index: number) => {
    if (index === 0) {
      return '🥇'
    }
    if (index === 1) {
      return '🥈'
    }
    if (index === 2) {
      return '🥉'
    }
    return ''
  }

  return (
    <Stack spacing={6}>
      <UiButton
        component={NavLink}
        to={RoutePaths.Rewards}
        variant='text'
        color='secondary'
        size='small'
        startIcon={<UiIcon componentName={'chevronLeft'} size={5} />}
        sx={{ width: 'fit-content' }}
      >
        Go Back
      </UiButton>

      <Stack
        p={6}
        spacing={4}
        bgcolor={palette.background.light}
        border={1}
        borderColor={palette.additional.layerBorder}
        borderRadius={4}
      >
        <Typography variant='subtitle3'>Leaderboard</Typography>
        <Stack spacing={4}>
          <Grid container spacing={16}>
            <Grid item xs={2}>
              <Typography variant='overline3' color={palette.text.secondary}>
                Place
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='overline3' color={palette.text.secondary}>
                User DID
              </Typography>
            </Grid>
            <Grid item xs={4} justifySelf={'end'} textAlign={'right'}>
              <Typography variant='overline3' color={palette.text.secondary}>
                Earned points
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          {participants.map((participant, index) => (
            <Stack spacing={4} key={participant.id}>
              <Grid container spacing={16}>
                <Grid item xs={2}>
                  <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    bgcolor={index <= 2 ? palette.primary.main : undefined}
                    width={spacing(8)}
                    height={spacing(8)}
                    borderRadius={250}
                  >
                    <Typography variant='subtitle4'>{index + 1}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle4'>
                    {`${participant.id} ${getLeaderIcon(index)}`}
                  </Typography>
                </Grid>
                <Grid item xs={4} textAlign={'right'}>
                  <Typography
                    variant='subtitle4'
                    px={4}
                    py={1}
                    bgcolor={palette.action.active}
                    borderRadius={12}
                  >
                    {new Intl.NumberFormat().format(participant.points)}
                  </Typography>
                </Grid>
              </Grid>
              {index !== participants.length - 1 && <Divider />}
            </Stack>
          ))}

          <Box bgcolor={palette.action.active} px={6} py={4} mx={-6} borderRadius={2}>
            <Grid container spacing={16} alignItems={'center'}>
              <Grid item xs={2}>
                <Stack
                  justifyContent={'center'}
                  alignItems={'center'}
                  width={spacing(8)}
                  height={spacing(8)}
                  borderRadius={250}
                  bgcolor={palette.background.paper}
                >
                  <Typography variant='subtitle5'>{myParticipant.position}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction={'row'} alignItems={'center'} spacing={4}>
                  <Typography variant='subtitle4'>{myParticipant.id}</Typography>
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
                  {new Intl.NumberFormat().format(myParticipant.points)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}
