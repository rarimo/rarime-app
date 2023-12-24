import { Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { Icons } from '@/enums'
import { UiButton, UiDrawer, UiIcon } from '@/ui'

export default function UiKitOther() {
  const [isDrawerShown, setIsDrawerShown] = useState(false)

  return (
    <Stack
      gap={theme => theme.spacing(2)}
      justifyContent={`flex-start`}
      paddingBottom={theme => theme.spacing(10)}
    >
      <Typography variant={`h6`}>{`Icons`}</Typography>
      <Stack
        direction={'row'}
        flexWrap={`wrap`}
        gap={theme => theme.spacing(2)}
        justifyContent={`flex-start`}
      >
        <UiIcon name={Icons.Metamask} />
        {<UiIcon componentName='delete' />}
        {<UiIcon componentName='accountCircle' />}
      </Stack>

      <Typography variant={`h6`}>{`Icons`}</Typography>
      <Stack
        direction={'row'}
        flexWrap={`wrap`}
        gap={theme => theme.spacing(2)}
        justifyContent={`flex-start`}
      >
        <UiButton onClick={() => setIsDrawerShown(prev => !prev)}>{`Toggle Drawer`}</UiButton>
        <UiDrawer anchor='right' open={isDrawerShown} onClose={() => setIsDrawerShown(false)}>
          <Stack
            direction={'row'}
            flexWrap={`wrap`}
            gap={theme => theme.spacing(2)}
            justifyContent={`flex-start`}
          >
            <Typography variant={`h6`}>{`This is a drawer`}</Typography>
          </Stack>
        </UiDrawer>
      </Stack>
    </Stack>
  )
}
