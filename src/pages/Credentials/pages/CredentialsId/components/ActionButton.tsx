import { Stack, Typography, useTheme } from '@mui/material'
import { ComponentProps } from 'react'

import { Transitions } from '@/theme/constants'
import { UiButton, UiIcon } from '@/ui'

export default function ActionButton({
  children,
  iconProps,
  ...rest
}: ComponentProps<typeof UiButton> & {
  iconProps: ComponentProps<typeof UiIcon>
}) {
  const { palette, spacing } = useTheme()

  return (
    <UiButton {...rest} variant='text'>
      <Stack
        alignItems='center'
        spacing={2}
        sx={{
          '&:hover': {
            '& .action-button__icon-wrp': {
              bgcolor: palette.additional.pureBlack,
            },
            '& .action-button__icon': {
              color: palette.primary.main,
            },
          },
        }}
      >
        <Stack
          className='action-button__icon-wrp'
          width={spacing(10)}
          height={spacing(10)}
          justifyContent='center'
          alignItems='center'
          bgcolor={palette.background.paper}
          borderRadius={'50%'}
          sx={{
            transition: Transitions.Default,
          }}
        >
          <UiIcon
            className='action-button__icon'
            {...iconProps}
            size={5}
            sx={{
              transition: Transitions.Default,
            }}
          />
        </Stack>
        <Typography
          className='action-button__text'
          variant='buttonSmall'
          textAlign='center'
          width='min-content'
          sx={{
            transition: Transitions.Default,
          }}
        >
          {children}
        </Typography>
      </Stack>
    </UiButton>
  )
}
