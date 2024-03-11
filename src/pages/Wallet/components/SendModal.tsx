import {
  alpha,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { ErrorHandler, formatAmount } from '@/helpers'
import { useForm } from '@/hooks'
import { useWalletState } from '@/store'
import { UiIcon, UiModal, UiTextField } from '@/ui'

enum FieldNames {
  Address = 'address',
  Amount = 'amount',
}

export default function SendModal() {
  const { palette, spacing } = useTheme()

  const [isModalShown, setIsModalShown] = useState(false)

  const { balances } = useWalletState()

  const mainBalance = useMemo(() => balances?.[0], [balances])

  const { isFormDisabled, handleSubmit, disableForm, enableForm, getErrorMessage, control } =
    useForm(
      {
        [FieldNames.Address]: '',
        [FieldNames.Amount]: '',
      },
      yup =>
        yup.object().shape({
          [FieldNames.Address]: yup.string().required(),
          [FieldNames.Amount]: yup.string().required(),
        }),
    )

  const send = useCallback(async () => {
    disableForm()

    try {
      /* empty */
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [disableForm, enableForm])

  return (
    <>
      <Button
        color='secondary'
        startIcon={<UiIcon componentName='arrowUpward' />}
        onClick={() => setIsModalShown(true)}
      >
        Send
      </Button>
      <UiModal open={isModalShown} onClose={() => setIsModalShown(false)}>
        <Paper
          sx={theme => ({
            overflow: 'hidden',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            p: 0,
            width: spacing(115),
          })}
        >
          <Stack spacing={5}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' p={5} pb={0}>
              <Typography variant='h6'>Send {mainBalance?.denom}</Typography>

              <Button variant='text' onClick={() => setIsModalShown(false)}>
                <UiIcon componentName='close' sx={{ color: palette.text.secondary }} />
              </Button>
            </Stack>

            <Divider />

            <form onSubmit={handleSubmit(send)}>
              <Stack spacing={5} p={5} pt={0}>
                <Controller
                  name={FieldNames.Address}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <UiTextField
                        {...field}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <UiIcon
                                componentName='qrCode'
                                sx={{ color: palette.text.secondary }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        label={FieldNames.Address}
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
                                  borderLeft={`2px solid ${alpha(palette.text.secondary, 0.1)}`}
                                  pl={4}
                                >
                                  <Button variant='text'>MAX</Button>
                                </Stack>
                              </InputAdornment>
                            ),
                          }}
                          label={FieldNames.Amount}
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
                      {formatAmount(mainBalance?.amount, mainBalance?.decimals)}{' '}
                      {mainBalance?.denom}
                    </Typography>
                  </Stack>
                </Stack>

                <Divider />

                <Stack direction='row' spacing={4} justifyContent='space-between'>
                  <Stack spacing={1}>
                    <Typography variant='body4' color={palette.text.secondary}>
                      Receive amount:
                    </Typography>
                    <Stack direction='row' alignItems='baseline' spacing={1}>
                      <Typography variant='subtitle3'>0.0 {mainBalance?.denom}</Typography>
                      <Typography variant='body4' color={palette.text.secondary}>
                        Fee: 0.005 {mainBalance?.denom}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button sx={{ width: spacing(42) }}>Send</Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </UiModal>
    </>
  )
}
