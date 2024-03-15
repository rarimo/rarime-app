import {
  Button,
  Dialog,
  DialogProps,
  Divider,
  Typography,
  TypographyProps,
  useTheme,
} from '@mui/material'
import { Stack } from '@mui/system'
import { W3CCredential } from '@rarimo/rarime-connector'
import { useMemo } from 'react'

import { Icons } from '@/enums'
import { formatDateTime } from '@/helpers'
import { useCopyToClipboard } from '@/hooks'
import { UiDialogActions, UiDialogContent, UiDialogTitle, UiIcon } from '@/ui'

interface Props extends DialogProps {
  vc: W3CCredential
}

export default function VcInfoModal({ vc, ...rest }: Props) {
  const { isCopied, copy } = useCopyToClipboard()
  const { palette, spacing } = useTheme()

  const valueTypographyProps: TypographyProps = useMemo(() => {
    return {
      variant: 'subtitle5',
      sx: { whiteSpace: 'break-spaces', wordBreak: 'break-all' },
    }
  }, [])

  const vcDetails = useMemo(() => {
    return [
      {
        text: 'ID',
        value: <Typography {...valueTypographyProps}>{vc.id}</Typography>,
      },
      {
        text: 'Type',
        value: <Typography {...valueTypographyProps}>{vc.type.join(', ')}</Typography>,
      },
      {
        text: 'Schema',
        value: <Typography {...valueTypographyProps}>{vc.credentialSchema.id}</Typography>,
      },
      {
        text: 'Issuer',
        value: <Typography {...valueTypographyProps}>{vc.issuer}</Typography>,
      },
      {
        text: 'Issued',
        value: <Typography {...valueTypographyProps}>{formatDateTime(vc.issuanceDate)}</Typography>,
      },
      {
        text: 'Subject',
        value: (
          <Typography
            component='pre'
            variant='body4'
            bgcolor={palette.action.active}
            p={2}
            borderRadius={1}
            sx={{ overflowX: 'auto' }}
          >
            {JSON.stringify(vc.credentialSubject, null, 2)}
          </Typography>
        ),
      },
    ]
  }, [vc, palette, valueTypographyProps])

  return (
    <Dialog {...rest} PaperProps={{ sx: { maxWidth: spacing(160) } }}>
      <UiDialogTitle onClose={rest.onClose}>Credential Info</UiDialogTitle>
      <UiDialogContent>
        <Stack spacing={2}>
          {vcDetails.map(({ text, value }, index) => (
            <Stack key={index} spacing={2}>
              <Stack spacing={1}>
                <Typography variant='body4' color={palette.text.secondary}>
                  {text}
                </Typography>
                {value}
              </Stack>
              {index < vcDetails.length - 1 && <Divider />}
            </Stack>
          ))}
        </Stack>
      </UiDialogContent>
      <UiDialogActions>
        <Button
          fullWidth
          startIcon={<UiIcon name={isCopied ? Icons.Check : Icons.CopySimple} size={5} />}
          onClick={() => copy(JSON.stringify(vc, null, 2))}
        >
          {isCopied ? 'Copied' : 'Copy Raw Credential'}
        </Button>
      </UiDialogActions>
    </Dialog>
  )
}
