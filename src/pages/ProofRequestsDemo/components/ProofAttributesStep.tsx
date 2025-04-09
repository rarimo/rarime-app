import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormControl, Stack } from '@mui/material'
import { ZkPassport } from '@rarimo/zk-passport'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { config } from '@/config'
import { ErrorHandler } from '@/services/error-handler'
import { UiSwitch, UiTextField } from '@/ui'

import StepView from './StepView'

const zkPassport = new ZkPassport(config.API_URL)

const formSchema = z.object({
  uniqueness: z.boolean(),
  minimumAge: z.union([z.number().int().positive(), z.nan()]).optional(),
  nationality: z.string().optional(),
  nationalityCheck: z.boolean(),
  eventId: z.string().nonempty(),
})

type FormValues = z.infer<typeof formSchema>

export default function ProofAttributesStep({
  userId,
  onSubmit,
}: {
  userId: string
  onSubmit: (verificationLink: string) => void
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

  const submit: SubmitHandler<FormValues> = useCallback(
    async formData => {
      setIsFormDisabled(true)

      try {
        const verificationLink = await zkPassport.requestVerificationLink(userId, {
          ageLowerBound: formData.minimumAge,
          uniqueness: formData.uniqueness,
          nationality: formData.nationality,
          eventId: formData.eventId,
          nationalityCheck: formData.nationalityCheck,
        })

        onSubmit(verificationLink)
      } catch (error) {
        ErrorHandler.process(error)
      }

      setIsFormDisabled(false)
    },
    [userId, onSubmit],
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
