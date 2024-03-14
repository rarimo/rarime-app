import { Button, Stack, StackProps, Typography, useTheme } from '@mui/material'
import { MouseEvent } from 'react'

import { Icons } from '@/enums'
import { UiIcon } from '@/ui'

interface Props extends StackProps {
  onAction?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function ClaimWarning({ onAction, ...rest }: Props) {
  const { palette } = useTheme()

  return (
    <Stack
      direction='row'
      spacing={4}
      justifyContent='space-between'
      p={2}
      borderRadius={2}
      bgcolor={palette.warning.lighter}
      color={palette.warning.darker}
      {...rest}
    >
      <Stack direction='row' spacing={2} alignItems='center'>
        <UiIcon name={Icons.Info} size={5} />
        <Typography variant='body4'>You have to reach Level 2 to claim</Typography>
      </Stack>
      <Button
        variant='text'
        size='small'
        endIcon={<UiIcon name={Icons.ArrowRight} size={4} />}
        onClick={onAction}
      >
        Earn
      </Button>
    </Stack>
  )
}
