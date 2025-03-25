import { JsonApiClient } from '@distributedlab/jac'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Divider,
  FormControl,
  Link,
  List,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { QRCode } from 'react-qrcode-logo'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { config } from '@/config'
import { ErrorHandler } from '@/services/error-handler'
import { UiSwitch, UiTextField } from '@/ui'

const apiClient = new JsonApiClient({
  baseUrl: config.API_URL,
})

enum DemoSteps {
  Intro,
  ProofAttributes,
  QrCode,
  VerificationStatus,
}

enum VerificationStatuses {
  NotVerified = 'not_verified',
  Verified = 'verified',
  FailedVerification = 'failed_verification',
  UniquenessCheckFailed = 'uniqueness_check_failed',
}

export default function ProofRequestsDemo() {
  const [verificationCheckEndpoint, setVerificationCheckEndpoint] = useState('')
  const [deepLink, setDeepLink] = useState('')
  const [step, setStep] = useState<DemoSteps>(DemoSteps.Intro)
  const [intervalId, setIntervalId] = useState<number>(-1)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatuses>(
    VerificationStatuses.NotVerified,
  )

  useEffect(() => {
    if (step === DemoSteps.QrCode) {
      const intervalId = window.setInterval(checkVerificationStatus, 10000)
      setIntervalId(intervalId)
    } else {
      window.clearInterval(intervalId)
      setIntervalId(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  async function checkVerificationStatus() {
    try {
      const { data } = await apiClient.get<{
        id: string
        type: string
        status: VerificationStatuses
      }>(verificationCheckEndpoint)

      if (data.status !== VerificationStatuses.NotVerified) {
        setVerificationStatus(data.status)
        setStep(DemoSteps.VerificationStatus)
      }
    } catch (error) {
      console.error(error)
    }
  }

  switch (step) {
    case DemoSteps.Intro:
      return <IntroStep onStart={() => setStep(DemoSteps.ProofAttributes)} />
    case DemoSteps.ProofAttributes:
      return (
        <ProofAttributesStep
          onSubmit={(verificationCheckEndpoint, deepLink) => {
            setVerificationCheckEndpoint(verificationCheckEndpoint)
            setDeepLink(deepLink)
            setStep(DemoSteps.QrCode)
          }}
        />
      )
    case DemoSteps.QrCode:
      return <QrCodeStep deepLink={deepLink} />
    case DemoSteps.VerificationStatus:
      return (
        <VerificationStatusStep
          status={verificationStatus}
          onRetry={() => {
            setVerificationStatus(VerificationStatuses.NotVerified)
            setVerificationCheckEndpoint('')
            setDeepLink('')
            setStep(DemoSteps.Intro)
          }}
        />
      )
  }
}

function StepView({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  const { palette } = useTheme()

  return (
    <Paper component={Stack} spacing={8} maxWidth={640} width='100%'>
      <Stack spacing={1}>
        <Typography variant='h6' color={palette.text.primary}>
          {title}
        </Typography>
        <Typography variant='body3' color={palette.text.secondary}>
          {subtitle}
        </Typography>
      </Stack>
      {children}
    </Paper>
  )
}

function IntroStep({ onStart }: { onStart: () => void }) {
  const { palette } = useTheme()

  return (
    <StepView title='RariMe Proof Requests' subtitle='Request Proof of Passport'>
      <Stack spacing={8}>
        <Stack spacing={1}>
          <Typography variant='body3' color={palette.text.primary}>
            The system contains the following components:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <Typography variant='body3' color={palette.text.primary} component='li'>
              <strong>3rd Party Mobile Apps and Backend:</strong> external system that integrates
              the Proof of Passport
            </Typography>
            <Typography variant='body3' color={palette.text.primary} component='li'>
              <strong>RariMe App:</strong> mobile app that generates the proofs
            </Typography>
            <Typography variant='body3' color={palette.text.primary} component='li'>
              <strong>Verificator-svc:</strong> a service that incapsulates ZK proof verification.
              Self-hosted by the 3rd party.
            </Typography>
          </List>
        </Stack>
        <Stack spacing={2}>
          <Button onClick={onStart}>Start Demo</Button>
          <Button
            color='secondary'
            component={Link}
            href='https://rarimo.notion.site/Requesting-ZK-Passport-proofs-dc43d1102e104d008e0d1c7db5326286?pvs=25'
            target='_blank'
          >
            Read documentation
          </Button>
        </Stack>
      </Stack>
    </StepView>
  )
}

const formSchema = z.object({
  uniqueness: z.boolean(),
  minimumAge: z.union([z.number().int().positive(), z.nan()]).optional(),
  nationality: z.string().optional(),
  nationalityCheck: z.boolean(),
  eventId: z.string().nonempty(),
})

type FormValues = z.infer<typeof formSchema>

function ProofAttributesStep({
  onSubmit,
}: {
  onSubmit: (verificationCheckEndpoint: string, deepLink: string) => void
}) {
  const [isFormDisabled, setIsFormDisabled] = useState(false)
  const { formState, register, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: {
      uniqueness: false,
      minimumAge: 18,
      nationality: 'UKR',
      nationalityCheck: false,
      eventId: '12345678900987654321',
    },
    resolver: zodResolver(formSchema),
  })

  const handleVerification = useCallback(
    async (attrs: {
      age_lower_bound?: number
      uniqueness?: boolean
      nationality?: string
      event_id?: string
      nationality_check?: boolean
    }) => {
      const { data } = await apiClient.post<{
        id: string
        type: string
        callback_url: string
        get_proof_params: string
      }>('/integrations/verificator-svc/private/verification-link', {
        body: {
          data: {
            id: uuid(),
            type: 'user',
            attributes: {
              age_lower_bound: attrs.age_lower_bound,
              uniqueness: attrs.uniqueness,
              nationality: attrs.nationality,
              event_id: attrs.event_id,
              ...(attrs.nationality_check && { nationality_check: true }),
            },
          },
        },
      })

      const newUrl = new URL('rarime://external')
      newUrl.searchParams.append('type', 'proof-request')
      newUrl.searchParams.append('proof_params_url', data.get_proof_params)

      onSubmit(`/integrations/verificator-svc/private/verification-status/${data.id}`, newUrl.href)
    },
    [onSubmit],
  )

  const submit: SubmitHandler<FormValues> = useCallback(
    async formData => {
      setIsFormDisabled(true)

      try {
        await handleVerification({
          age_lower_bound: formData.minimumAge ? formData.minimumAge : undefined,
          uniqueness: formData.uniqueness,
          nationality: formData.nationality ? formData.nationality : undefined,
          event_id: formData.eventId,
          nationality_check: formData.nationalityCheck,
        })
      } catch (error) {
        ErrorHandler.process(error)
      }

      setIsFormDisabled(false)
    },
    [handleVerification],
  )

  return (
    <StepView title='Step 1/3' subtitle='Create verification request for the proof'>
      <Stack component='form' spacing={4} onSubmit={handleSubmit(submit)}>
        <FormControl>
          <UiSwitch {...register('uniqueness')} label='Uniqueness' disabled={isFormDisabled} />
        </FormControl>
        <FormControl>
          <UiSwitch
            {...register('nationalityCheck')}
            label='Nationality Check'
            disabled={isFormDisabled}
          />
        </FormControl>

        <Stack direction='row' spacing={4}>
          <FormControl>
            <UiTextField
              {...register('minimumAge', { valueAsNumber: true })}
              type='number'
              label='Minimum Age'
              errorMessage={formState.errors.minimumAge?.message}
              disabled={isFormDisabled}
            />
          </FormControl>
          <FormControl>
            <UiTextField
              {...register('nationality')}
              label='Nationality'
              placeholder='3-letter ISO code'
              errorMessage={formState.errors.nationality?.message}
              disabled={isFormDisabled}
            />
          </FormControl>
        </Stack>
        <FormControl>
          <UiTextField
            {...register('eventId')}
            label='Event ID'
            placeholder=''
            errorMessage={formState.errors.eventId?.message}
            disabled={isFormDisabled}
          />
        </FormControl>

        <Button disabled={isFormDisabled} type='submit'>
          {isFormDisabled ? 'Requesting...' : 'Request Verification'}
        </Button>
      </Stack>
    </StepView>
  )
}

function QrCodeStep({ deepLink }: { deepLink: string }) {
  const { palette } = useTheme()

  return (
    <StepView title='Step 2/3' subtitle='Scan QR code with RariMe app and generate proof'>
      <Stack spacing={4} alignItems='center'>
        <QRCode size={240} value={deepLink} />
        <Stack direction='row' spacing={2} alignItems='center' width='100%'>
          <Divider sx={{ flex: 1 }} />
          <Typography variant='body3' color={palette.text.secondary}>
            OR
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Stack>
        <Button component={Link} color='primary' href={deepLink} fullWidth>
          Open in RariMe app
        </Button>
        <Typography variant='body4' color={palette.text.secondary}>
          Waiting for verification...
        </Typography>
      </Stack>
    </StepView>
  )
}

function VerificationStatusStep({
  status,
  onRetry,
}: {
  status: VerificationStatuses
  onRetry: () => void
}) {
  const { palette } = useTheme()

  const icon = useMemo(() => {
    switch (status) {
      case VerificationStatuses.Verified:
        return '✅'
      case VerificationStatuses.UniquenessCheckFailed:
      case VerificationStatuses.FailedVerification:
        return '❌'
      default:
        return '⏳'
    }
  }, [status])

  const title = useMemo(() => {
    switch (status) {
      case VerificationStatuses.Verified:
        return 'Verified'
      case VerificationStatuses.UniquenessCheckFailed:
        return 'Uniqueness Check Failed'
      case VerificationStatuses.FailedVerification:
        return 'Failed Verification'
      default:
        return 'Waiting For Verification...'
    }
  }, [status])

  const description = useMemo(() => {
    switch (status) {
      case VerificationStatuses.Verified:
        return 'The proof is successfully verified'
      case VerificationStatuses.UniquenessCheckFailed:
        return 'The proof is valid, but the identity is not unique'
      case VerificationStatuses.FailedVerification:
        return 'The proof is invalid, verification failed'
      default:
        return 'The proof is being verified'
    }
  }, [status])

  return (
    <StepView title='Step 3/3' subtitle='Check the verification status'>
      <Stack spacing={6}>
        <Stack spacing={1} alignItems='center' textAlign='center'>
          <Typography variant='h2'>{icon}</Typography>
          <Typography variant='h6' color={palette.text.primary} mt={3}>
            {title}
          </Typography>
          <Typography variant='body3' color={palette.text.secondary}>
            {description}
          </Typography>
        </Stack>
        <Button onClick={onRetry} fullWidth sx={{ mt: 2 }}>
          Restart Demo
        </Button>
      </Stack>
    </StepView>
  )
}
