import { Box, Divider, Stack, Typography } from '@mui/material'

import { UiIcon } from '@/ui'

export default function OrgOverview() {
  return (
    <Stack alignItems={'center'}>
      <svg
        width='81'
        height='80'
        viewBox='0 0 81 80'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.5 40C0.5 17.9086 18.4086 0 40.5 0C62.5914 0 80.5 17.9086 80.5 40C80.5 62.0914 62.5914 80 40.5 80C18.4086 80 0.5 62.0914 0.5 40Z'
          fill='#1F2124'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.886 54.7209V36.3208C19.886 32.4177 20.797 29.5831 22.6188 27.8174C24.4407 26.0517 27.2079 25.1689 30.9203 25.1689H38.4527V30.1873H32.4671C30.0953 30.1873 28.4108 30.819 27.414 32.0828C26.4172 33.3467 25.9188 35.3353 25.9188 38.0489V54.7209H19.886ZM42.0928 54.7209C37.5554 54.7209 35.2865 51.6543 35.2865 45.5208C35.2865 42.6586 35.8536 40.4095 36.988 38.7739C38.1223 37.1383 39.8241 36.3208 42.0928 36.3208H54.4672V34.4248C54.4672 31.5997 53.1954 30.1873 50.6517 30.1873H42.6785V25.1689H52.8174C55.3267 25.1689 57.2344 25.9683 58.5406 27.5667C59.8468 29.1652 60.5 31.2651 60.5 33.8672V49.7026C60.5 53.0481 58.9531 54.7209 55.8595 54.7209H42.0928ZM44.4126 49.7026H52.9203C53.9516 49.7026 54.4672 49.145 54.4672 48.0298V41.3387H44.4126C42.4877 41.3387 41.5252 42.7329 41.5252 45.5208C41.5252 48.3088 42.4877 49.7026 44.4126 49.7026Z'
          fill='white'
        />
      </svg>

      <Stack direction={'row'} spacing={1} alignItems={'center'} mt={4}>
        <Typography variant={'h5'}>Rarimo</Typography>
        <UiIcon componentName={'work'} size={5} />
      </Stack>

      <Typography mt={2} variant={'body2'}>
        www.rarimo.com
      </Typography>

      <Stack
        mt={6}
        display={'grid'}
        gridTemplateColumns={'1fr 1px 1fr'}
        gap={6}
        textAlign={'center'}
      >
        <Box>
          <Typography variant={'h6'}>24</Typography>
          <Typography variant={'body2'}>Associated people</Typography>
        </Box>
        <Divider orientation={'vertical'} flexItem />
        <Box>
          <Typography variant={'h6'}>76</Typography>
          <Typography variant={'body2'}>Credentials</Typography>
        </Box>
      </Stack>
    </Stack>
  )
}
