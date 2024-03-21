import {
  Button,
  Dialog,
  DialogProps,
  Divider,
  FormControl,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useCallback, useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { withdrawPoints } from '@/api/modules/points'
import { OverlaySpinner } from '@/common'
import { BusEvents } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useIdentityState, useRewardsState, useWalletState, walletStore } from '@/store'
import { UiDialogActions, UiDialogContent, UiDialogTitle, UiTextField } from '@/ui'

import ClaimBalances from './ClaimBalances'
import ClaimWarning from './ClaimWarning'

interface Props extends DialogProps {
  onClaim: () => void
}

enum FieldNames {
  Amount = 'amount',
}

const DEFAULT_VALUES = {
  [FieldNames.Amount]: '',
}

export default function ClaimModal({ onClaim, ...rest }: Props) {
  const { palette, spacing } = useTheme()
  const { userDid } = useIdentityState()
  const { balance } = useRewardsState()
  const { address } = useWalletState()

  // TODO: Replace with real level check
  const isLevelReached = false

  const { handleSubmit, control, isFormDisabled, getErrorMessage, disableForm, enableForm } =
    useForm(DEFAULT_VALUES, yup =>
      yup.object().shape({
        [FieldNames.Amount]: yup
          .number()
          .required()
          .min(1)
          .max(balance?.amount ?? 0),
      }),
    )

  const submit = useCallback(
    async (formData: typeof DEFAULT_VALUES) => {
      disableForm()

      try {
        await withdrawPoints(userDid, Number(formData[FieldNames.Amount]), address)
        bus.emit(BusEvents.success, {
          message: `${formData[FieldNames.Amount]} RMO claimed`,
        })
        onClaim()
      } catch (error) {
        ErrorHandler.process(error)
      }

      enableForm()
    },
    [disableForm, enableForm, onClaim, userDid, address],
  )

  useEffect(() => {
    walletStore.connect()
  }, [])

  return (
    <Dialog
      {...rest}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(submit),
        sx: { width: spacing(110) },
      }}
    >
      <UiDialogTitle onClose={rest.onClose}>Claim RMO</UiDialogTitle>
      <UiDialogContent>
        <Stack spacing={5}>
          {!isLevelReached && <ClaimWarning onAction={e => rest.onClose?.(e, 'escapeKeyDown')} />}
          <ClaimBalances />
          <Controller
            name={FieldNames.Amount}
            control={control}
            render={({ field }) => (
              <FormControl>
                <UiTextField
                  {...field}
                  label='Claim amount'
                  placeholder='Enter amount'
                  errorMessage={getErrorMessage(FieldNames.Amount)}
                  disabled={isFormDisabled}
                  InputProps={{
                    endAdornment: (
                      <Stack direction='row' spacing={4} alignItems='center'>
                        <Divider orientation='vertical' flexItem />
                        <Button
                          variant='text'
                          size='medium'
                          color='secondary'
                          onClick={() => field.onChange(balance?.amount ?? 0)}
                        >
                          MAX
                        </Button>
                      </Stack>
                    ),
                  }}
                />
              </FormControl>
            )}
          />
        </Stack>
      </UiDialogContent>
      <UiDialogActions>
        <Stack spacing={2} alignItems='center' textAlign='center'>
          <Button type='submit' fullWidth disabled={!isLevelReached}>
            Claim
          </Button>
          <Typography variant='body4' maxWidth={spacing(80)} color={palette.text.secondary}>
            {'After claiming you will be'}{' '}
            <Typography variant='subtitle5'>downgraded in Leaderboard</Typography>
          </Typography>
        </Stack>
      </UiDialogActions>

      {isFormDisabled && <OverlaySpinner />}
    </Dialog>
  )
}
