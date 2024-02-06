import { Box, Stack, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'
import { UiButton, UiIcon, UiNavTabs } from '@/ui'

export default function Rewards() {
  const routes = useNestedRoutes(RoutePaths.Rewards, [
    {
      index: true,
      element: <Navigate replace to={RoutePaths.RewardsActive} />,
    },
    {
      path: RoutePaths.RewardsActive,
      element: <Box>active</Box>,
    },
    {
      path: RoutePaths.RewardsHistory,
      element: <Box>history</Box>,
    },
  ])

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
        <UiButton
          component={'a'}
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
        </UiButton>
      </Stack>

      {routes}
    </Stack>
  )
}
