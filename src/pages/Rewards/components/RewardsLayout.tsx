import { Button, Stack, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useRewardsState } from '@/store/modules/rewards.module'
import { UiIcon } from '@/ui'

export default function RewardsLayout({ children }: PropsWithChildren) {
  const { balance } = useRewardsState()

  return (
    <Stack spacing={8}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <PageTitles title='Rewards' />
        {!!balance && (
          <Button
            component={NavLink}
            to={RoutePaths.RewardsHistory}
            variant='text'
            size='small'
            color={'secondary'}
          >
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <UiIcon componentName='history' size={4} />
              <Typography variant={'buttonSmall'}>Earn History</Typography>
            </Stack>
          </Button>
        )}
      </Stack>

      {children}
    </Stack>
  )
}
