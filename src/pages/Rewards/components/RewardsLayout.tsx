import { Button, Stack, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { UiIcon } from '@/ui'

export default function RewardsLayout({ children }: PropsWithChildren) {
  return (
    <Stack spacing={8}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <PageTitles title='Rewards' />
        <Button
          component={NavLink}
          to={RoutePaths.RewardsHistory}
          variant='text'
          size='small'
          color={'secondary'}
        >
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <UiIcon componentName='openInNew' size={4} />
            <Typography variant={'buttonSmall'}>Earn History</Typography>
          </Stack>
        </Button>
      </Stack>

      {children}
    </Stack>
  )
}
