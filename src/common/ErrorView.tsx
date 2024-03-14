import { Stack, StackProps, Typography, useTheme } from '@mui/material'
import { ReactNode } from 'react'

import { Icons } from '@/enums'
import { UiIcon } from '@/ui'

interface Props extends StackProps {
  icon?: ReactNode
  title?: string
  description?: string
  action?: ReactNode
}

export default function ErrorView({
  icon = <UiIcon name={Icons.Warning} />,
  title = 'Error',
  description,
  action,
  ...rest
}: Props) {
  const { palette, spacing } = useTheme()

  return (
    <Stack
      spacing={4}
      alignItems='center'
      width='100%'
      justifyContent='center'
      p={8}
      border={1}
      borderColor={palette.error.light}
      borderRadius={2}
      sx={{ borderStyle: 'dashed', ...rest.sx }}
      {...rest}
    >
      <Stack
        alignItems='center'
        justifyContent='center'
        bgcolor={palette.error.lighter}
        color={palette.error.main}
        borderRadius={250}
        width={spacing(12)}
        height={spacing(12)}
      >
        {icon}
      </Stack>
      <Stack spacing={1} textAlign='center'>
        <Typography variant='body3'>{title}</Typography>
        {description && (
          <Typography variant='body3' color={palette.text.secondary}>
            {description}
          </Typography>
        )}
      </Stack>
      {action}
    </Stack>
  )
}
