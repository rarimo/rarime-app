import { BN } from '@distributedlab/tools'
import {
  Button,
  Dialog,
  DialogProps,
  FormControl,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useCallback, useMemo } from 'react'
import { Controller } from 'react-hook-form'

import { RARIMO_EXPLORER_URLS, rarimoClient } from '@/api/clients'
import { BusEvents } from '@/enums'
import { bus, ErrorHandler, formatAmount } from '@/helpers'
import { useForm } from '@/hooks'
import { useWalletState } from '@/store'
import { UiDialogActions, UiDialogContent, UiDialogTitle, UiInfoAlert, UiTextField } from '@/ui'

type Props = DialogProps & {
  onSend?: () => void
}

enum FieldNames {
  Address = 'address',
  Amount = 'amount',
}

export default function SendModal({ onSend, ...rest }: Props) {
  const { palette, spacing } = useTheme()

  const { balances } = useWalletState()

  const mainBalance = useMemo(() => balances?.[0], [balances])

  const maxAmountBN = useMemo(() => {
    return BN.fromBigInt(mainBalance.amount, mainBalance?.decimals)
  }, [mainBalance.amount, mainBalance?.decimals])

  const {
    formState,
    isFormDisabled,
    handleSubmit,
    disableForm,
    enableForm,
    getErrorMessage,
    control,
  } = useForm(
    {
      [FieldNames.Address]: '',
      [FieldNames.Amount]: '',
    },
    yup =>
      yup.object().shape({
        [FieldNames.Address]: yup.string().required(),
        [FieldNames.Amount]: yup
          .number()
          .max(
            Number(
              maxAmountBN.format({
                decimals: mainBalance?.decimals,
                groupSeparator: '',
                decimalSeparator: '.',
              }),
            ),
          )
          .required(),
      }),
  )

  const totalAmountAfterFeeBN = useMemo(() => {
    try {
      const amountBN = BN.fromRaw(formState[FieldNames.Amount], mainBalance?.decimals)

      const feeBN = BN.fromRaw(rarimoClient.config.gasPrice.amount, mainBalance?.decimals)

      return amountBN.sub(feeBN)
    } catch (error) {
      return undefined
    }
  }, [formState, mainBalance?.decimals])

  const send = useCallback(async () => {
    disableForm()

    try {
      const receipt = await rarimoClient.tx.send(
        rarimoClient.wallet.address,
        formState[FieldNames.Address],
        [
          {
            denom: mainBalance.denom,
            amount: BN.fromRaw(formState[FieldNames.Amount], rarimoClient.config.currency.decimals)
              .value,
          },
        ],
      )

      const explorerLink = `${RARIMO_EXPLORER_URLS[rarimoClient.wallet.chainId]}/transactions/${
        receipt.transactionHash
      }`

      bus.emit(BusEvents.success, {
        message: (
          <Stack spacing={1}>
            <Typography>Tokens sent. See tx on</Typography>
            <Typography
              component='a'
              color={palette.primary.main}
              fontWeight='bold'
              href={explorerLink}
              target='_blank'
              rel='noreferrer'
            >
              explorer
            </Typography>
          </Stack>
        ),
      })

      onSend?.()
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [disableForm, enableForm, formState, mainBalance.denom, onSend, palette.primary.main])

  return (
    <Dialog
      {...rest}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(send),
        sx: { width: spacing(115) },
      }}
    >
      <UiDialogTitle onClose={rest.onClose}>Send {mainBalance?.denom}</UiDialogTitle>

      <UiDialogContent>
        <Stack spacing={5}>
          <UiInfoAlert severity='warning' message='STUB: Informational message' />

          <Stack spacing={5}>
            <Stack spacing={5}>
              <Controller
                name={FieldNames.Address}
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <UiTextField
                      {...field}
                      label='Recipient Address'
                      placeholder='Starts with rarimo1...'
                      errorMessage={getErrorMessage(FieldNames.Address)}
                      disabled={isFormDisabled}
                    />
                  </FormControl>
                )}
              />

              <Stack spacing={2}>
                <Controller
                  name={FieldNames.Amount}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <UiTextField
                        {...field}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Stack
                                spacing={2}
                                direction='row'
                                alignItems='center'
                                borderLeft={`2px solid ${palette.action.active}`}
                                pl={4}
                              >
                                <Button
                                  variant='text'
                                  sx={{ color: palette.text.secondary }}
                                  onClick={() =>
                                    field.onChange(formatAmount(maxAmountBN, maxAmountBN.decimals))
                                  }
                                  disabled={isFormDisabled}
                                >
                                  MAX
                                </Button>
                              </Stack>
                            </InputAdornment>
                          ),
                        }}
                        label='Amount'
                        placeholder={`Enter amount in ${mainBalance?.denom}`}
                        errorMessage={getErrorMessage(FieldNames.Amount)}
                        disabled={isFormDisabled}
                      />
                    </FormControl>
                  )}
                />

                <Stack spacing={2} direction='row' justifyContent='space-between'>
                  <Typography variant='body4' color={palette.text.secondary}>
                    Available:
                  </Typography>
                  <Typography variant='body4'>
                    {formatAmount(maxAmountBN, maxAmountBN.decimals)} {mainBalance?.denom}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </UiDialogContent>

      <UiDialogActions>
        <Stack direction='row' spacing={4} justifyContent='space-between'>
          <Stack spacing={1}>
            <Typography variant='body4' color={palette.text.secondary}>
              Receive amount:
            </Typography>
            <Stack direction='row' alignItems='baseline' spacing={1}>
              <Typography variant='subtitle3'>
                {formatAmount(totalAmountAfterFeeBN ?? '0', totalAmountAfterFeeBN?.decimals)}{' '}
                {mainBalance?.denom}
              </Typography>
              <Typography variant='body4' color={palette.text.secondary}>
                Fee: 0.005 {mainBalance?.denom}
              </Typography>
            </Stack>
          </Stack>

          <Button sx={{ width: spacing(42), ml: 'auto' }} type='submit' disabled={isFormDisabled}>
            Send
          </Button>
        </Stack>
      </UiDialogActions>
    </Dialog>
  )
}
