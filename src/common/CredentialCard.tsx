import { alpha, Box, Divider, Stack, StackProps, Typography, useTheme } from '@mui/material'
import { W3CCredential } from '@rarimo/rarime-connector'
import startCase from 'lodash/startCase'

import { formatCredentialType, getCredentialViewProperty, IssuerDetails } from '@/api/modules/zkp'
import { formatDateMY } from '@/helpers'
import { UiIcon } from '@/ui'

function DotsDecoration({ ...rest }: StackProps) {
  const { palette } = useTheme()

  const rowsCount = 3
  const maxDots = 5
  const betweenDotsSpacing = 2

  return (
    <Stack {...rest} alignItems={'flex-end'} spacing={betweenDotsSpacing}>
      {Array.from({ length: rowsCount }, (v, i) => i).map(rowIdx => (
        <Stack key={rowIdx} direction='row' spacing={betweenDotsSpacing}>
          {Array.from({ length: maxDots - rowIdx }, (v, i) => i).map(boxIdx => (
            <Box
              key={boxIdx}
              width={8}
              height={8}
              borderRadius={'50%'}
              bgcolor={alpha(palette.common.white, 0.16)}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  )
}

type Props = StackProps & {
  vc: W3CCredential
  issuerDetails: IssuerDetails
}

export default function CredentialCard({ vc, issuerDetails, ...rest }: Props) {
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
        background: 'linear-gradient(#252C3B 100%, #0F1218 100%)',
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
        color={palette.common.white}
        bgcolor={alpha(palette.common.white, 0.1)}
        borderRadius={'50%'}
        p={2}
      >
        <UiIcon componentName='fingerprint' />
      </Box>

      <Stack spacing={2}>
        <Typography variant='h6' color={palette.common.white}>
          {formatCredentialType(vc.type)}
        </Typography>

        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '50%',
            color: alpha(palette.common.white, 0.6),
          }}
        >
          <Typography variant='body3'>{issuerDetails.name}</Typography>
        </Box>
      </Stack>

      <Divider
        sx={{
          backgroundColor: alpha(palette.common.white, 0.1),
        }}
      />
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='body4' color={alpha(palette.common.white, 0.6)}>
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

        <Typography variant='body4' color={alpha(palette.common.white, 0.6)}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography>{startCase(getCredentialViewProperty(vc))}</Typography>
          </Stack>
        </Typography>
      </Stack>
    </Stack>
  )
}
