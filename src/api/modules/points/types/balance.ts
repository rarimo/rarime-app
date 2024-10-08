export type Balance = {
  id: string
  type: 'balance'
  amount: number
  created_at: number
  updated_at: number
  is_disabled?: boolean
  is_verified?: boolean
  is_withdrawal_allowed?: boolean
  rank: number
  active_referral_codes?: string[]
  consumed_referral_codes?: string[]
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
