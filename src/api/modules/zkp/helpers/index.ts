import { fetcher } from '@distributedlab/fetcher'
import { CreateProofRequestParams } from '@rarimo/rarime-connector/dist/types'
import omit from 'lodash/omit'

import { api, OrgUserRoles } from '@/api'
import { CredentialSubject, SaveCredentialsRequestParams, VCSchema } from '@/api/modules/zkp'

export const getClaimOffer = async (userDid: string, claimTypeUrn: string) => {
  const { data } = await api.get<SaveCredentialsRequestParams>(
    `/v1/credentials/${userDid}/${claimTypeUrn}`,
  )

  return data
}

// FIXME: move to proper place
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

export const loadAndParseCredentialSchema = async (
  schemaUrl: string,
  credentialSubject?: CredentialSubject,
): Promise<{
  key: string
  type: string
  value: string
}> => {
  const { data } = await fetcher.get<VCSchema>(schemaUrl)

  const [key, { type }] = Object.entries(
    omit(data?.properties.credentialSubject.properties, 'id'),
  )[0]

  return {
    key,
    type,
    value: credentialSubject?.[key] ?? '',
  }
}
