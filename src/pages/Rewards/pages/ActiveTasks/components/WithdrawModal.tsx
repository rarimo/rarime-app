import { Button, Dialog, DialogProps, Divider, Stack, Typography, useTheme } from '@mui/material'
import { FormEvent } from 'react'

import { UiDrawerActions, UiDrawerContent, UiDrawerTitle, UiIcon, UiTextField } from '@/ui'

type Props = DialogProps & {
  reservedBalance: number
  walletBalance: number
  onWithdraw: () => void
}

export default function WithdrawModal({
  reservedBalance,
  walletBalance,
  onWithdraw,
  ...rest
}: Props) {
  const { palette, spacing } = useTheme()

  const balances = [
    { label: 'From', title: 'Reserved', value: reservedBalance },
    { label: 'To', title: 'Balance', value: walletBalance },
  ]

  return (
    <Dialog
      {...rest}
      PaperProps={{
        component: 'form',
        onSubmit: (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          onWithdraw()
        },
        sx: { width: spacing(110) },
      }}
    >
      <UiDrawerTitle onClose={rest.onClose}>Withdraw RMO</UiDrawerTitle>
      <UiDrawerContent>
        <Stack spacing={5}>
          <Stack
            direction={'row'}
            spacing={4}
            justifyContent={'space-between'}
            p={2}
            borderRadius={2}
            bgcolor={palette.warning.lighter}
            color={palette.warning.darker}
          >
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <UiIcon componentName='infoOutlined' size={5} />
              <Typography variant='body4'>You have to verify your identity</Typography>
            </Stack>
            <Button
              variant='text'
              size='small'
              endIcon={<UiIcon componentName='arrowForward' size={4} />}
            >
              Verify
            </Button>
          </Stack>

          <Stack spacing={4} p={4} bgcolor={palette.action.active} borderRadius={2}>
            {balances.map((balance, index) => (
              <Stack key={index} spacing={4}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Stack direction={'row'} spacing={4} alignItems={'center'}>
                    <Typography
                      variant='buttonMedium'
                      color={palette.text.secondary}
                      width={spacing(10)}
                    >
                      {balance.label}
                    </Typography>
                    <Divider orientation='vertical' flexItem />
                    <Typography variant='body3'>{balance.title}</Typography>
                  </Stack>
                  <Typography variant='subtitle5'>{balance.value} RMO</Typography>
                </Stack>
                {index !== balances.length - 1 && (
                  <Divider sx={{ width: spacing(63), mx: 'auto' }} />
                )}
              </Stack>
            ))}
          </Stack>
          <UiTextField
            label='Withdraw amount'
            placeholder='Enter amount'
            InputProps={{
              endAdornment: (
                <Stack direction={'row'} spacing={4} alignItems={'center'}>
                  <Divider orientation='vertical' flexItem />
                  <Button variant='text' size='medium' color='secondary'>
                    MAX
                  </Button>
                </Stack>
              ),
            }}
          />
        </Stack>
      </UiDrawerContent>
      <UiDrawerActions>
        <Stack spacing={2}>
          <Button type='submit' fullWidth>
            Send
          </Button>
          <Button
            color='secondary'
            fullWidth
            sx={{ bgcolor: 'transparent' }}
            onClick={e => rest.onClose?.(e, 'escapeKeyDown')}
          >
            Cancel
          </Button>
        </Stack>
      </UiDrawerActions>

      {/* {form.isFormDisabled && (
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          position={'absolute'}
          top={0}
          left={0}
          bottom={0}
          right={0}
          bgcolor={theme => theme.palette.background.light}
        >
          <CircularProgress color={'inherit'} />
        </Stack>
      )} */}
    </Dialog>
  )
}
