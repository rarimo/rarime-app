import { time } from '@distributedlab/tools'
import { Divider, Stack, Typography, TypographyProps, useTheme } from '@mui/material'
import { ReactNode, useMemo } from 'react'

import { Proof } from '@/api/modules/link'

import ProofValidityBadge from './ProofValidityBadge'

interface Props {
  proof: Proof
  isValid: boolean
}

export default function ProofValidationResult({ proof, isValid }: Props) {
  const { palette, spacing } = useTheme()

  const valueTypographyProps: TypographyProps = useMemo(() => {
    return {
      variant: 'subtitle5',
      color: palette.text.secondary,
      sx: { overflow: 'hidden', textOverflow: 'ellipsis' },
    }
  }, [palette.text.secondary])

  const validationDetails = useMemo<{ text: string; value: ReactNode }[]>(() => {
    return [
      {
        text: 'Type:',
        value: <ProofValidityBadge valid={isValid} />,
      },
      {
        text: 'Issued:',
        value: (
          <Typography {...valueTypographyProps}>
            {time(proof.created_at).format('DD MMM, YYYY')}
          </Typography>
        ),
      },
      {
        text: 'Issuer:',
        value: <Typography {...valueTypographyProps}>{proof.creator}</Typography>,
      },
      {
        text: 'Proof ID:',
        value: <Typography {...valueTypographyProps}>{proof.id}</Typography>,
      },
    ]
  }, [proof, isValid, valueTypographyProps])

  return (
    <Stack
      px={4}
      py={2}
      bgcolor={palette.action.active}
      border={1}
      borderColor={palette.action.hover}
      borderTop={0}
      spacing={2}
      sx={{
        borderBottomLeftRadius: spacing(2),
        borderBottomRightRadius: spacing(2),
      }}
    >
      {validationDetails.map((detail, index) => (
        <Stack
          key={index}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={2}
        >
          <Typography variant={'body4'} color={palette.text.secondary}>
            {detail.text}
          </Typography>
          <Divider orientation={'horizontal'} sx={{ flex: 1, borderStyle: 'dashed' }} />
          {detail.value}
        </Stack>
      ))}
    </Stack>
  )
}
