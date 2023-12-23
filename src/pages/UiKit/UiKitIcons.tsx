import { Stack, Typography } from '@mui/material'

import { Icons } from '@/enums'
import { UiIcon } from '@/ui'

export default function UiKitIcons() {
  return (
    <Stack
      gap={theme => theme.spacing(2)}
      justifyContent={`flex-start`}
      paddingBottom={theme => theme.spacing(10)}
    >
      <Typography variant={`h6`}>{`Custom`}</Typography>
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
    </Stack>
  )
}
