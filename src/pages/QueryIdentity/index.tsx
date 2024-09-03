import { JsonApiClient } from '@distributedlab/jac'
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack } from '@mui/material'
import { Buffer } from 'buffer'
import { useCallback, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { v4 as uuid } from 'uuid'

const API_URL = 'https://api.orgs.app.stage.rarime.com'

const apiClient = new JsonApiClient({
  baseUrl: API_URL,
})

export default function QueryIdentity() {
  const [qrCode, setQrCode] = useState('')
  const [id, setId] = useState('')
  const [deepLink, setDeepLink] = useState('')

  const genQrCode = useCallback(async () => {
    const { data } = await apiClient.post<{
      id: string
      type: string
      callback_url: string
      get_proof_params: string
    }>('/integrations/verificator-svc/private/verification-link', {
      body: {
        data: {
          id: `${uuid()}@gmail.com`,
          type: 'user',
          attributes: {
            // age_lower_bound: 18,
            uniqueness: true,
            // nationality: 'UKR',
          },
        },
      },
    })

    setId(data.id)

    const requestPayload = JSON.stringify({
      id: data.id,
      type: 'QueryProofGen',
      callbackUrl: data.callback_url,
      dataUrl: data.get_proof_params,
    })

    setQrCode(requestPayload)

    setDeepLink('https://app.stage.rarime.com' + Buffer.from(requestPayload).toString('base64'))
  }, [])

  const fetchResponse = useCallback(async () => {
    const { data } = await apiClient.get(`/integrations/verification-svc/private/proof/${id}`)

    // eslint-disable-next-line no-console
    console.log(data)
  }, [id])

  return (
    <Stack justifyContent='center' alignItems='center' gap={4} sx={{ borderRadius: 2 }}>
      <Stack gap={4}>
        <Button onClick={genQrCode}>Generate QR code</Button>
        <Button onClick={fetchResponse}>Fetch response</Button>

        {qrCode && (
          <Accordion>
            <AccordionSummary aria-controls='panel1-content' id='panel1-header'>
              QR-code flow
            </AccordionSummary>
            <AccordionDetails>
              <Stack p={15} width='100%' justifyContent='center' alignItems='center'>
                <QRCode size={400} value={qrCode} />
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}

        {deepLink && (
          <Accordion>
            <AccordionSummary aria-controls='panel1-content' id='panel1-header'>
              deep link flow
            </AccordionSummary>
            <AccordionDetails>
              <Stack p={15} width='100%' justifyContent='center' alignItems='center'>
                <QRCode size={400} value={deepLink} />
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}
      </Stack>
    </Stack>
  )
}
