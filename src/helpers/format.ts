import { BN, BnLike, time } from '@distributedlab/tools'

const FORMATTED_DID_MAX_LENGTH = 12

export function formatDid(did: string) {
  return did.length > FORMATTED_DID_MAX_LENGTH ? did.slice(0, 8) + '...' + did.slice(-4) : did
}

export function formatDateMY(date: string) {
  return time(date).format('MM / YYYY')
}

export function formatAmount(amount: BnLike, decimals: number) {
  if (!Number(amount)) return '0'

  if (isNaN(Number(amount))) throw new TypeError('Amount is not a number')

  return amountTrimZero(BN.fromBigInt(amount, decimals).toString())
}

export function amountTrimZero(amount: string) {
  return amount.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, '')
}
