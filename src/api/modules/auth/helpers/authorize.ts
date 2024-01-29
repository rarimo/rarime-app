import type { ZKProof } from '@rarimo/rarime-connector'

import { api, OrgUserRoles } from '@/api'
import { AuthTokensGroup, FillRequestDetails, InvitationDetails } from '@/api/modules/auth'
import { ApiServicePaths } from '@/enums/api'

export const authorizeUser = async ({
  role,
  userDid,
  orgDid,
  groupId,
  zkProof,
}: {
  role: OrgUserRoles
  userDid: string
  orgDid: string
  groupId: string
  zkProof: ZKProof
}) => {
  const { data } = await api.post<AuthTokensGroup>(`${ApiServicePaths.Auth}/v1/authorize`, {
    body: {
      data: {
        id: userDid,
        type: 'authorize',
        attributes: {
          proof: {
            role: role,
            group: groupId,
            issuer: orgDid,
            proof: zkProof,
          },
        },
      },
    },
  })

  return data
}

export const refreshJwt = async () => {
  const { data } = await api.get<AuthTokensGroup>(`${ApiServicePaths.Auth}/v1/refresh`)

  return data
}

export const getInvitationDetails = (searchParams: URLSearchParams): InvitationDetails | null => {
  try {
    return JSON.parse(atob(searchParams.get('q') || '')) as InvitationDetails
  } catch (error) {
    return null
  }
}

export const buildFillRequestDetailsSearchParams = (
  orgId: string,
  groupId: string,
  reqId: string,
) => {
  const invitationRequestDetails = btoa(
    JSON.stringify({
      orgId,
      groupId,
      reqId,
    }),
  )

  const searchParams = new URLSearchParams()
  searchParams.set('q', invitationRequestDetails)

  return searchParams
}

export const parseFillRequestDetailsSearchParams = (
  searchParams: URLSearchParams,
): FillRequestDetails | null => {
  try {
    return JSON.parse(atob(searchParams.get('q') || '')) as FillRequestDetails
  } catch (error) {
    return null
  }
}
