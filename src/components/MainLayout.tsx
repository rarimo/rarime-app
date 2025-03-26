import { Box, Link, Stack, Typography, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'

import { vh } from '@/theme/helpers'

export default function MainLayout({ children }: PropsWithChildren) {
  const { palette, spacing } = useTheme()

  return (
    <Stack direction='row' height={vh(100)}>
      <Stack
        py={8}
        flex={1}
        sx={{
          pl: { xs: 4, md: 14 },
          pr: { xs: 4, md: 8 },
        }}
      >
        <Box flex={1} position='relative'>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <Box component='img' src='/branding/logo-sign-in.svg' alt='RariMe App' />
            <Typography variant='body3' color={palette.text.secondary}>
              Powered by{' '}
              <Link component='a' href='https://rarimo.com' target='_blank' typography='subtitle4'>
                Rarimo
              </Link>
            </Typography>
          </Stack>

          <Stack
            position='absolute'
            top='50%'
            left='50%'
            width='100%'
            maxWidth={spacing(100)}
            sx={{ transform: 'translate(-50%, -50%)' }}
          >
            {children}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}
