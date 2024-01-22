import type { ZKProof } from '@rarimo/rarime-connector'

import { api, OrgUserRoles } from '@/api'
import { AuthTokensGroup } from '@/api/modules/auth'
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
