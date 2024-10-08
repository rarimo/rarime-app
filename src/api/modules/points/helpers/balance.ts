import { api } from '@/api/clients'
import { ApiServicePaths } from '@/enums'

import { type Balance, type Withdrawal } from '../types'

export const BALANCE_MOCK: Balance = {
  id: 'did:iden3:readonly:tTep1wgHSGULyrAgWD1SKDxtg1jAPGzZuXuHNPknH',
  type: 'balance',
  amount: 175,
  created_at: 1628793600,
  updated_at: 1628793600,
  rank: 291,
}

export const LEADERBOARD_MOCK: Balance[] = [
  {
    id: 'did:iden3:readonly:mhQHvqmvimneVHCL5EufeZvfzigRt',
    amount: 25345,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 1,
  },
  {
    id: 'did:iden3:readonly:mi1QKgywFcFD7d35QRaHwd6b6Cxy',
    amount: 25123,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 2,
  },
  {
    id: 'did:iden3:readonly:mmaJ5kAjbGLRVcfqwsMPi7kHK1f',
    amount: 23402,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 3,
  },
  {
    id: 'did:iden3:readonly:mhQHvqmvimneVHCL5EufeZvfzigRv',
    amount: 21502,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 4,
  },
  {
    id: 'did:iden3:readonly:mi1QKgywFcFD7d35QRaHwd6b6Cxb',
    amount: 20420,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 5,
  },
  {
    id: 'did:iden3:readonly:mmaJ5kAjbGLRVcfqwsMPi7kHK1a',
    amount: 19499,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 6,
  },
  {
    id: 'did:iden3:readonly:mi1QKgywFcFD7d35QRaHwd6b6Cxe',
    amount: 8992,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 7,
  },
  {
    id: 'did:iden3:readonly:ahQHvqmvimneVHCL5EufeZvfzigRt',
    amount: 8150,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 8,
  },
  {
    id: 'did:iden3:readonly:whQHvqmvimneVHCL5EufeZvfzigRt',
    amount: 4520,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 9,
  },
  {
    id: 'did:iden3:readonly:mhQHvqmvimneVHCL5EufeZvfzigRa',
    amount: 1402,
    type: 'balance',
    created_at: 1628793600,
    updated_at: 1628793600,
    rank: 10,
  },
]

// Balances
export const createPointsBalance = async (did: string, referredBy: string) => {
  return api.post<Balance>(`${ApiServicePaths.Points}/v1/public/balances`, {
    body: {
      data: {
        id: did,
        type: 'create_balance',
        attributes: {
          referred_by: referredBy,
        },
      },
    },
  })
}

export const activatePointsBalance = async (did: string, referredBy: string) => {
  return api.patch<Balance>(`${ApiServicePaths.Points}/v1/public/balances/${did}`, {
    body: {
      data: {
        id: did,
        type: 'update_balance',
        attributes: {
          referred_by: referredBy,
        },
      },
    },
  })
}

export const getLeaderboard = async () => {
  return api.get<Balance[]>(`${ApiServicePaths.Points}/v1/public/balances`)
}

export const getPointsBalance = async (did: string) => {
  return api.get<Balance>(`${ApiServicePaths.Points}/v1/public/balances/${did}`, {
    query: {
      rank: true,
      referral_codes: true,
    },
  })
}

// Withdrawals
export const getWithdrawalHistory = async (did: string) => {
  return api.get<Withdrawal[]>(`${ApiServicePaths.Points}/v1/public/balances/${did}/withdrawals`)
}

export const withdrawPoints = async (did: string, amount: number, address: string) => {
  return api.post<Withdrawal>(`${ApiServicePaths.Points}/v1/public/balances/${did}/withdrawals`, {
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
