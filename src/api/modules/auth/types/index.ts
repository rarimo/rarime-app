export type AuthTokensGroup = {
  id: string
  type: 'token'
  accessToken: {
    token: string
    tokenType: 'access'
  }
  refreshToken: {
    token: string
    tokenType: 'access'
  }
}
