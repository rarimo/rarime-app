export const getClaimId = (credentialId: string) => {
  try {
    const claimIdUrl = new URL(credentialId)

    const pathNameParts = claimIdUrl.pathname.split('/')

    return pathNameParts[pathNameParts.length - 1]
  } catch (error) {
    return credentialId
  }
}
