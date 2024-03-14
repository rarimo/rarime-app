import { BN, BnConfigLike, BnFormatConfig, BnLike, time, TimeDate } from '@distributedlab/tools'

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

// number
/**
 * Format human amount without trailing zeros
 * @param amount
 */
function removeTrailingZeros(amount: string) {
  const [integer, fraction] = amount.split('.')

  if (!fraction) return integer

  let result = integer

  for (let i = fraction.length - 1; i >= 0; i--) {
    if (fraction[i] !== '0') {
      result += `.${fraction.slice(0, i + 1)}`
      break
    }
  }

  return result
}

/**
 * Format human amount with prefix
 * @param value
 */
function convertNumberWithPrefix(value: string) {
  const M_PREFIX_AMOUNT = 1_000_000
  const B_PREFIX_AMOUNT = 1_000_000_000
  const T_PREFIX_AMOUNT = 1_000_000_000_000

  const getPrefix = (value: number): 'M' | 'B' | 'T' | '' => {
    if (value >= T_PREFIX_AMOUNT) return 'T'
    if (value >= B_PREFIX_AMOUNT) return 'B'
    if (value >= M_PREFIX_AMOUNT) return 'M'

    return ''
  }

  const prefix = getPrefix(+value)

  const divider = {
    M: M_PREFIX_AMOUNT,
    B: B_PREFIX_AMOUNT,
    T: T_PREFIX_AMOUNT,
    '': 1,
  }[prefix]

  const finalAmount = BN.fromRaw(Number(value) / divider, 3).format({
    decimals: 3,
    groupSeparator: '',
    decimalSeparator: '.',
  })

  return `${removeTrailingZeros(finalAmount)}${prefix}`
}

export function formatNumber(value: number, config?: BnFormatConfig) {
  return BN.fromRaw(value, 0).format(config)
}

export function formatAmount(
  amount: BnLike,
  decimalsOrConfig?: BnConfigLike,
  formatConfig?: BnFormatConfig,
) {
  return removeTrailingZeros(BN.fromBigInt(amount, decimalsOrConfig).format(formatConfig))
}

export function formatBalance(
  amount: BnLike,
  decimalsOrConfig?: BnConfigLike,
  formatConfig?: BnFormatConfig,
) {
  return convertNumberWithPrefix(formatAmount(amount, decimalsOrConfig, formatConfig))
}
