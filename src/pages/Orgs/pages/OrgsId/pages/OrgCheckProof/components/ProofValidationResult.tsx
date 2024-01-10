import { Box, Stack, Typography, useTheme } from '@mui/material'
import { ReactNode } from 'react'

import { Proof } from '@/api'

import ProofValidityBadge from './ProofValidityBadge'

interface ProofDetail {
  text: string
  value: ReactNode
}

interface Props {
  proof: Proof
  isValid: boolean
}

export default function ProofResult({ proof, isValid }: Props) {
  const { palette } = useTheme()

  const proofDetails: ProofDetail[] = [
    {
      text: 'Type:',
      value: <ProofValidityBadge valid={isValid} />,
    },
    {
      text: 'Issued:',
      value: proof.created_at,
    },
    {
      text: 'Issuer:',
      value: proof.creator,
    },
    {
      text: 'Proof ID:',
      value: proof.id,
    },
  ]

  return (
    <Stack
      px={4}
      py={2}
      bgcolor={palette.background.default}
      border={1}
      borderColor={palette.divider}
      borderRadius={2}
      spacing={2}
    >
      {proofDetails.map((detail, index) => (
        <Stack
          key={index}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={2}
        >
          <Typography variant={'body2'} color={palette.text.secondary}>
            {detail.text}
          </Typography>
          <Box
            flex={1}
            height={1}
            borderBottom={1}
            borderColor={palette.divider}
            sx={{ borderStyle: 'dashed' }}
          />
          {typeof detail.value === 'string' ? (
            <Typography
              variant={'caption'}
              // TODO: fix colors
              color={palette.text.primary}
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {detail.value}
            </Typography>
          ) : (
            detail.value
          )}
        </Stack>
      ))}
    </Stack>
  )
}
