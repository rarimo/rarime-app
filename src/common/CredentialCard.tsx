import { alpha, Box, Divider, Stack, StackProps, Typography, useTheme } from '@mui/material'
import { W3CCredential } from '@rarimo/rarime-connector'

import { formatDateMY } from '@/helpers'
import { UiIcon } from '@/ui'

type Props = StackProps & {
  vc: W3CCredential
}

function DotsDecoration({ ...rest }: StackProps) {
  const { palette } = useTheme()

  const betweenDotsSpacing = 2

  return (
    <Stack {...rest} alignItems={'flex-end'} spacing={betweenDotsSpacing}>
      {Array.from({ length: 3 }).map((_, rowIdx) => (
        <Stack key={rowIdx} direction='row' spacing={betweenDotsSpacing}>
          {Array.from({ length: rowIdx + 3 })
            .map((_, boxIdx) => (
              <Box
                key={boxIdx}
                width={8}
                height={8}
                borderRadius={'50%'}
                bgcolor={alpha(palette.background.default, 0.16)}
              />
            ))
            .reverse()}
        </Stack>
      ))}
    </Stack>
  )
}

export default function CredentialCard({ vc, ...rest }: Props) {
  const { palette, spacing } = useTheme()

  return (
    <Stack
      {...rest}
      spacing={6}
      p={6}
      borderRadius={4}
      sx={{
        position: 'relative',
        width: '100%',
        // FIXME
        background: 'linear-gradient(#8459FD 100%, #6E3FF3 100%)',
      }}
    >
      <DotsDecoration
        sx={{
          position: 'absolute',
          top: spacing(6),
          right: spacing(6),
        }}
      />
      <Box
        width={40}
        height={40}
        color={palette.background.default}
        bgcolor={alpha(palette.background.default, 0.1)}
        borderRadius={'50%'}
        p={2}
      >
        <UiIcon componentName='fingerprint' />
      </Box>
      <Typography variant='h6' color={palette.background.default}>
        {vc.type[1]}
      </Typography>
      <Divider
        sx={{
          backgroundColor: alpha(palette.background.default, 0.1),
        }}
      />
      <Stack spacing={2}>
        <Typography variant='body4' color={alpha(palette.background.default, 0.6)}>
          <Stack direction='row' alignItems='center' spacing={2}>
            {vc.expirationDate ? (
              <>
                <UiIcon componentName='calendarTodayOutlinedIcon' size={4} />
                <Typography>{formatDateMY(vc.expirationDate)}</Typography>
              </>
            ) : (
              <UiIcon componentName='allInclusiveOutlinedIcon' size={4} />
            )}
          </Stack>
        </Typography>
      </Stack>
    </Stack>
  )
}
