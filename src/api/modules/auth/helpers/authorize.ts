import { api, OrgUserRoles } from '@/api'
import { AuthTokens } from '@/api/modules/auth'
import { ZKProof } from '@/api/modules/zkp'

export const authorizeUser = async ({
  userDid,
  orgDid,
  groupId,
  zkProof,
}: {
  userDid: string
  orgDid: string
  groupId: string
  zkProof: ZKProof
}) => {
  const { data } = await api.post<AuthTokens>('/v1/authorize', {
    body: {
      data: {
        id: userDid,
        type: 'authorize',
        attributes: {
          proof: {
            role: OrgUserRoles.Undefined, // FIXME: should be in background
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
  const { data } = await api.get<AuthTokens>('/v1/refresh')

  return data
}
