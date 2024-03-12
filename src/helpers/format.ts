import { BN, BnLike, time, TimeDate } from '@distributedlab/tools'

// DID
const DID_PART_LENGTH = 8
const DID_SHORT_PART_LENGTH = 12

export function formatDid(did: string, partLength = DID_PART_LENGTH) {
  return did.length > partLength * 2
    ? did.slice(0, partLength) + '...' + did.slice(-partLength)
    : did
}

export function formatDidShort(value: string) {
  return formatDid(value.split(':').pop() ?? value, DID_SHORT_PART_LENGTH)
}

// Date
export function formatDateMY(date: TimeDate) {
  return time(date).format('MM / YYYY')
}

export function formatDateDMY(date: TimeDate) {
  return time(date).format('DD MMM, YYYY')
}

export function formatDateTime(date: TimeDate) {
  return time(date).format('DD MMM, YYYY, h:mm A')
}

// Number
export function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value)
}

export function formatAmount(amount: BnLike, decimals: number) {
  if (!Number(amount)) return '0'

  if (isNaN(Number(amount))) throw new TypeError('Amount is not a number')

  return amountTrimZero(BN.fromBigInt(amount, decimals).toString())
}

export function amountTrimZero(amount: string) {
  return amount.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, '')
}
