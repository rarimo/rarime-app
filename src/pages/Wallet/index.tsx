import { Button, Paper, Stack } from '@mui/material'

import { rarimeWallet } from '@/api/clients'

export default function Wallet() {
  return (
    <Stack>
      <Paper>
        <Button
          onClick={async () => {
            console.log(await rarimeWallet.getAccounts())
          }}
        >
          Get Accounts
        </Button>
      </Paper>
    </Stack>
  )
}
