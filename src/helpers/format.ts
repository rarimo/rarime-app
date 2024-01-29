const MAX_LENGTH_FORMATTED_DID = 12

export function formatDid(userDid: string) {
  return userDid.length > MAX_LENGTH_FORMATTED_DID
    ? userDid.slice(0, 8) + '...' + userDid.slice(-4)
    : userDid
}
