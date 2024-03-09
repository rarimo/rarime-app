import { Button, Paper, Stack, Typography, useTheme } from '@mui/material'

import { PageTitles } from '@/common'

import Chart from './Chart'

export default function Analytics() {
  const { palette } = useTheme()

  return (
    <Stack spacing={8}>
      <PageTitles title={'Wallet Analytics'} />
      <Paper component={Stack} spacing={6}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack spacing={2}>
            <Typography variant='body3' color={palette.text.secondary}>
              Total RMO
            </Typography>
            <Typography variant='h4'>120.591</Typography>
            <Typography variant='caption2' color={palette.text.secondary}>
              ≈ $4,506.40{' '}
              <Typography variant='caption2' color={palette.success.dark}>
                (+$345, Today)
              </Typography>
            </Typography>
          </Stack>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Button color='secondary' size='medium'>
              7D
            </Button>
            <Button
              color='secondary'
              size='medium'
              sx={{ bgcolor: 'transparent', color: palette.text.secondary }}
            >
              1M
            </Button>
            <Button
              color='secondary'
              size='medium'
              sx={{ bgcolor: 'transparent', color: palette.text.secondary }}
            >
              3M
            </Button>
            <Button
              color='secondary'
              size='medium'
              sx={{ bgcolor: 'transparent', color: palette.text.secondary }}
            >
              ALL
            </Button>
          </Stack>
        </Stack>
        <Chart />
      </Paper>
    </Stack>
  )
}
