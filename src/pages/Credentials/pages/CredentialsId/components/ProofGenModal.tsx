import { Button, Dialog, DialogProps, Divider, Typography, useTheme } from '@mui/material'
import { Stack } from '@mui/system'
import { CircuitId, W3CCredential, ZKProof } from '@rarimo/rarime-connector'
import { useCallback, useMemo, useState } from 'react'

import { zkpSnap } from '@/api/clients'
import { Icons } from '@/enums'
import { ErrorHandler } from '@/helpers'
import { useCopyToClipboard } from '@/hooks'
import { UiDialogActions, UiDialogContent, UiDialogTitle, UiIcon } from '@/ui'

interface Props extends DialogProps {
  vc: W3CCredential
}

export default function ProofGenModal({ vc, ...rest }: Props) {
  const { isCopied, copy } = useCopyToClipboard()

  const [isPending, setIsPending] = useState(false)
  const { palette, spacing } = useTheme()

  const [generatedProof, setGeneratedProof] = useState<ZKProof>()

  const createProofRequest = useMemo(() => {
    return {
      circuitId: CircuitId.AtomicQueryMTPV2OnChain,
      accountAddress: vc.credentialSubject.address as string,
      issuerDid: vc.issuer,

      // TODO: get proof query based on the VC
      query: {
        allowedIssuers: ['*'],
        credentialSubject: {
          isNatural: {
            $eq: 1,
          },
        },
        type: vc.type,
      },
    }
  }, [vc.credentialSubject.address, vc.issuer, vc.type])

  const generateProof = useCallback(async () => {
    setIsPending(true)

    try {
      const proof = await zkpSnap.createProof({
        // FIXME: some DOM elements or large functions is in _prototype,
        //  so metamask API can't serialize it
        ...JSON.parse(JSON.stringify(createProofRequest)),
      })

      setGeneratedProof(proof.zkpProof)
    } catch (error) {
      ErrorHandler.process(error)
    }

    setIsPending(false)
  }, [createProofRequest])

  const vcDetails = useMemo(() => {
    return [
      {
        text: 'Query',
        value: (
          <Typography
            component='pre'
            variant='body4'
            bgcolor={palette.action.active}
            p={2}
            borderRadius={1}
            sx={{ overflowX: 'auto' }}
          >
            {JSON.stringify(createProofRequest, null, 2)}
          </Typography>
        ),
      },
      ...(generatedProof
        ? [
            {
              text: 'Proof',
              value: (
                <Stack spacing={2}>
                  <Typography
                    component='pre'
                    variant='body4'
                    bgcolor={palette.action.active}
                    p={2}
                    borderRadius={1}
                    sx={{ overflowX: 'auto' }}
                  >
                    {JSON.stringify(generatedProof, null, 2)}
                  </Typography>

                  <Button
                    fullWidth
                    startIcon={<UiIcon name={isCopied ? Icons.Check : Icons.CopySimple} size={5} />}
                    onClick={() => copy(JSON.stringify(vc, null, 2))}
                  >
                    {isCopied ? 'Copied' : 'Copy Proof'}
                  </Button>
                </Stack>
              ),
            },
          ]
        : []),
    ]
  }, [palette.action.active, createProofRequest, generatedProof, isCopied, copy, vc])

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
          startIcon={
            <UiIcon name={isPending ? Icons.Lock : Icons.ArrowCounterClockwise} size={5} />
          }
          onClick={generateProof}
          disabled={isPending}
        >
          {isPending ? 'Generating...' : 'Generate Proof'}
        </Button>
      </UiDialogActions>
    </Dialog>
  )
}
