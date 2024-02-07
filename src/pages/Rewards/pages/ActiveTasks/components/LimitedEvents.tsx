import { Box, Stack, Typography, useTheme } from '@mui/material'

import { UiButton } from '@/ui'

export default function LimitedEvents() {
  const { palette, spacing } = useTheme()

  return (
    <Stack
      p={6}
      spacing={6}
      bgcolor={palette.background.light}
      border={1}
      borderColor={palette.additional.layerBorder}
      borderRadius={4}
    >
      <Typography variant='subtitle3'>🔥 Limited time events</Typography>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Stack direction={'row'} spacing={4}>
          <Box
            component='img'
            src={'/branding/og-image.jpg'}
            sx={{
              bgcolor: palette.action.active,
              borderRadius: 2,
              objectFit: 'cover',
              width: spacing(21),
              height: spacing(21),
            }}
          />
          <Stack spacing={2}>
            <Typography variant='subtitle4'>Initial setup of identity credentials</Typography>
            <Typography variant='body4' color={palette.text.secondary}>
              It is a long established fact that a reader will be distracted by the readable
            </Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={4}>
              <Typography
                variant='subtitle4'
                px={2}
                py={1}
                borderRadius={12}
                bgcolor={palette.warning.light}
              >
                🎁 +150
              </Typography>
              <Typography variant='caption2' color={palette.text.secondary}>
                Exp: 24 sep, 2024, 10:00am
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <UiButton color='secondary' size='medium' sx={{ width: spacing(19), height: spacing(8) }}>
          View
        </UiButton>
      </Stack>
    </Stack>
  )
}
