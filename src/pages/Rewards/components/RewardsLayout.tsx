import { Button, Stack, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { UiIcon, UiNavTabs } from '@/ui'

export default function RewardsLayout({ children }: PropsWithChildren) {
  return (
    <Stack spacing={6}>
      <PageTitles title='Rewards' />
      <Stack direction={'row'} justifyContent={'space-between'}>
        <UiNavTabs
          width={'max-content'}
          tabs={[
            { label: 'Active Tasks', route: RoutePaths.RewardsActive },
            { label: 'History', route: RoutePaths.RewardsHistory },
          ]}
        />
        <Button
          component={'a'}
          // TODO: Link to RariMe docs
          href='https://rarime.com'
          target='_blank'
          rel='noreferrer noopener'
          variant='text'
          size='small'
          color={'secondary'}
        >
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <UiIcon componentName='openInNew' size={4} />
            <Typography variant={'buttonSmall'}>Learn More</Typography>
          </Stack>
        </Button>
      </Stack>

      {children}
    </Stack>
  )
}
