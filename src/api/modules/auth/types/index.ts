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

export type InvitationDetails = {
  group_id: string
  invite_email_id: string
  org_id: string
  otp: string
}

export type FillRequestDetails = {
  orgId: string
  groupId: string
  reqId: string
}
