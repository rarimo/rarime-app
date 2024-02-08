import { api } from '@/api/clients'
import { ApiServicePaths } from '@/enums/api'

import { type Balance, Withdrawal } from '../types'

// Balances
export const createPointsBalance = async (did: string) => {
  return api.post<Balance>(`${ApiServicePaths.Points}/v1/balances`, {
    body: {
      data: {
        id: did,
        type: 'create_balance',
      },
    },
  })
}

export const getLeaderboard = async () => {
  return api.get<Balance[]>(`${ApiServicePaths.Points}/v1/balances`)
}

export const getPointsBalance = async (did: string) => {
  return api.get<Balance>(`${ApiServicePaths.Points}/v1/balances/${did}`)
}

// Withdrawals
export const getWithdrawalHistory = async (did: string) => {
  return api.get<Withdrawal[]>(`${ApiServicePaths.Link}/v1/proofs?creator=${did}`)
}

export const withdrawPoints = async (did: string, amount: number, address: string) => {
  return api.post<Withdrawal>(`${ApiServicePaths.Points}/v1/balances/${did}/withdrawals`, {
    body: {
      data: {
        type: 'withdraw',
        attributes: {
          amount,
          address,
        },
      },
    },
  })
}
