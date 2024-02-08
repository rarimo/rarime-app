import { fetcher } from '@distributedlab/fetcher'
import { SaveCredentialsRequestParams, W3CCredential } from '@rarimo/rarime-connector'
import omit from 'lodash/omit'
import startCase from 'lodash/startCase'

import { api } from '@/api/clients'
import {
  CredentialSubject,
  IssuerDetails,
  JsonLdSchema,
  ParsedCredentialSchema,
  ParsedCredentialSchemaProperty,
  VCSchema,
} from '@/api/modules/zkp'

export const getClaimOffer = async (userDid: string, claimTypeUrn: string) => {
  const { data } = await api.get<SaveCredentialsRequestParams>(
    `/v1/credentials/${userDid}/${claimTypeUrn}`,
  )

  return data
}

/**
 * This method simply returns type of schema,
 * which is usually the element of {@link W3CCredential.type}
 *
 * and credentialSubject properties with their types and values (optional)
 * @param schemaUrl
 * @param credentialSubject
 */
export const loadAndParseCredentialSchema = async (
  schemaUrl: string,
  credentialSubject?: CredentialSubject,
): Promise<ParsedCredentialSchema> => {
  const { data: schema } = await fetcher.get<VCSchema>(schemaUrl)

  if (!schema?.$metadata.uris.jsonLdContext) throw new TypeError('Invalid schema')

  const { data: properties } = await fetcher.get<JsonLdSchema>(schema.$metadata.uris.jsonLdContext)

  const propertiesContext = properties?.['@context']?.[0]

  if (!propertiesContext) throw new TypeError('Invalid jsonld schema')

  const [type, vcCredSubject] = Object.entries(
    omit(propertiesContext, '@protected', '@version', 'id', 'type'),
  )[0]

  const vcCredSubjectProperties = Object.entries(
    omit(vcCredSubject?.['@context'], '@propagate', '@protected', 'polygon-vocab', 'xsd'),
  )

  const credSubjectProperties = vcCredSubjectProperties.map(([key, value]) => {
    return {
      key,
      type: value?.['@type'],
      value: credentialSubject?.[key] ?? '',
    }
  })

  return {
    type,
    credSubjectProperties,
  }
}

export const getTargetProperty = (
  parsedCredentialSchema: ParsedCredentialSchema,
): ParsedCredentialSchemaProperty => {
  return parsedCredentialSchema.credSubjectProperties.filter(el => el.key !== 'groupID')[0]
}

export const getClaimIdFromVC = (credential: W3CCredential) => {
  try {
    const claimIdUrl = new URL(credential.id)

    const pathNameParts = claimIdUrl.pathname.split('/')

    return pathNameParts[pathNameParts.length - 1]
  } catch (error) {
    return credential.id
  }
}

export const getIssuerDetails = async (issuerDid: string): Promise<IssuerDetails> => {
  // TODO: This is a temporary solution, we need to get issuer details from the backend
  return {
    did: issuerDid,
    name: 'Rarimo',
  }
}

export const getCredentialViewProperty = (vc: W3CCredential) => {
  // TODO: This is a temporary solution, we need to get VC view property
  return vc.credentialSubject.provider as string
}

export const formatCredentialType = (vcType: string[]) => {
  switch (vcType[1]) {
    case 'IdentityProviders': {
      return 'Proof of Human'
    }
    default:
      return startCase(vcType[1])
  }
}
