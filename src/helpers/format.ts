import { time } from '@distributedlab/tools'

const FORMATTED_DID_MAX_LENGTH = 12

export function formatDid(did: string) {
  return did.length > FORMATTED_DID_MAX_LENGTH ? did.slice(0, 8) + '...' + did.slice(-4) : did
}

export function formatDateTime(date: string) {
  return time(date).format('DD MMM, YYYY, h:mm A')
}
