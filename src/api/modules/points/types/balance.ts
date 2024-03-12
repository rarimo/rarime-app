export type Balance = {
  id: string
  type: 'balance'
  amount: number
  created_at: number
  updated_at: number
  is_disabled?: boolean
  is_verified?: boolean
  rank: number
}

export type Withdrawal = {
  id: string
  type: 'withdrawal'
  amount: number
  address: string
  created_at: number
  balance: {
    id: string
    type: 'balance'
  }
}
