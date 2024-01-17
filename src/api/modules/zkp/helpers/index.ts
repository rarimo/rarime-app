import { CreateProofRequestParams } from '@rarimo/rarime-connector/dist/types'

import { api, OrgUserRoles } from '@/api'
import { SaveCredentialsRequestParams } from '@/api/modules/zkp'

export const getClaimOffer = async (userDid: string, claimTypeUrn: string) => {
  const { data } = await api.get<SaveCredentialsRequestParams>(
    `/v1/credentials/${userDid}/${claimTypeUrn}`,
  )

  return data
}

// FIXME
export const buildAuthorizeRequest = ({
  providerAddress,
  isAdmin,
}: {
  providerAddress: string
  isAdmin: boolean
}): CreateProofRequestParams => {
  return {
    circuitId: 'credentialAtomicQueryMTPV2',
    accountAddress: providerAddress,
    issuerDid: 'config.issuerDid', // TODO: implement

    query: {
      allowedIssuers: ['*'],
      credentialSubject: {
        role: {
          // FIXME: how to other roles will work
          $eq: isAdmin ? OrgUserRoles.Admin : OrgUserRoles.Undefined,
        },
      },
      type: ['VerifiableCredentials', 'Role'],
    },
  }
}
