import { Box, Button, Stack, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'

import { config } from '@/config'
import { vh } from '@/theme/helpers'

const PublicLayout = ({ children }: PropsWithChildren) => {
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
            <Box component='img' src='/branding/logo-sign-in.svg' alt={config.APP_NAME} />
            <Button
              component='a'
              href='https://rarime.com'
              target='_blank'
              variant='text'
              color='secondary'
              size='medium'
            >
              Visit Landing page
            </Button>
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

      <Stack
        justifyContent='center'
        alignItems='end'
        pl={8}
        bgcolor={palette.additional.pureBlack}
        sx={{
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <Box
          component='img'
          src='/imgs/dashboard.png'
          alt='Dashboard image'
          height={vh(90)}
          sx={{ objectFit: 'contain' }}
        />
      </Stack>
    </Stack>
  )
}

export default PublicLayout
