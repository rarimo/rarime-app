import { Box, Stack, Typography, useTheme } from '@mui/material'
import { ReactNode } from 'react'

import ProofValidityBadge from './ProofValidityBadge'

interface ProofDetail {
  text: string
  value: ReactNode
}

export default function ProofViewer() {
  const { palette } = useTheme()

  const proofDetails: ProofDetail[] = [
    {
      text: 'Type:',
      value: <ProofValidityBadge valid />,
    },
    {
      text: 'Issued:',
      value: '13 Dec, 2023',
    },
    {
      text: 'Issuer:',
      value: 'Rarimo',
    },
    {
      text: 'Proof ID:',
      value: 'Dawnfuwabufb3wb',
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
            <Typography variant={'caption'} color={palette.text.primary}>
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
