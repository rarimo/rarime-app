import { Divider, Stack, StackProps, Typography, useTheme } from '@mui/material'

type Props = StackProps & {
  reservedBalance: number
  walletBalance: number
}

export default function ClaimBalances({ reservedBalance, walletBalance, ...rest }: Props) {
  const { palette, spacing } = useTheme()

  const balances = [
    { label: 'From', title: 'Reserved', value: reservedBalance },
    { label: 'To', title: 'Balance', value: walletBalance },
  ]

  return (
    <Stack spacing={4} p={4} bgcolor={palette.action.active} borderRadius={2} {...rest}>
      {balances.map((balance, index) => (
        <Stack key={index} spacing={4}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={4} alignItems={'center'}>
              <Typography variant='buttonMedium' color={palette.text.secondary} width={spacing(10)}>
                {balance.label}
              </Typography>
              <Divider orientation='vertical' flexItem />
              <Typography variant='body3'>{balance.title}</Typography>
            </Stack>
            <Typography variant='subtitle5'>{balance.value} RMO</Typography>
          </Stack>
          {index !== balances.length - 1 && <Divider sx={{ width: spacing(63), mx: 'auto' }} />}
        </Stack>
      ))}
    </Stack>
  )
}
