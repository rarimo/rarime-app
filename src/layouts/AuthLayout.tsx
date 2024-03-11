import { Box, Button, Stack, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'

import { config } from '@/config'
import { vh } from '@/theme/helpers'

const PublicLayout = ({ children }: PropsWithChildren) => {
  const { palette } = useTheme()

  return (
    <Stack direction={'row'} height={vh(100)}>
      <Stack spacing={15} pl={14} pr={8} py={8} flex={1}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box component={'img'} src='/branding/logo-sign-in.svg' alt={config.APP_NAME} />
          <Button
            component={'a'}
            href={'https://rarime.com'}
            target={'_blank'}
            variant='text'
            color={'secondary'}
            size={'medium'}
          >
            Visit Landing page
          </Button>
        </Stack>

        <Stack p={20} mx='auto'>
          {children}
        </Stack>
      </Stack>

      <Stack
        justifyContent={'center'}
        alignItems={'end'}
        pl={8}
        bgcolor={palette.additional.pureBlack}
      >
        <Box
          component={'img'}
          src='/imgs/dashboard.png'
          alt={'Dashboard image'}
          height={vh(90)}
          sx={{ objectFit: 'contain' }}
        />
      </Stack>
    </Stack>
  )
}

export default PublicLayout
