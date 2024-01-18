import { fetcher } from '@distributedlab/fetcher'
import omit from 'lodash/omit'

import { api } from '@/api'
import { CredentialSubject, SaveCredentialsRequestParams, VCSchema } from '@/api/modules/zkp'

export const getClaimOffer = async (userDid: string, claimTypeUrn: string) => {
  const { data } = await api.get<SaveCredentialsRequestParams>(
    `/v1/credentials/${userDid}/${claimTypeUrn}`,
  )

  return data
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

export * from './builders'
