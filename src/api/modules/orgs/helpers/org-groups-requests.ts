import { W3CCredential } from '@rarimo/rarime-connector'

import { api } from '@/api/clients'
import {
  CredentialRequest,
  GroupedCredentials,
  OrgClaimIDMap,
  OrgGroupCreatedRequest,
  OrgGroupRequest,
  OrgGroupRequestClaim,
  OrgGroupRequestFilters,
  OrgGroupRequestMetadata,
  OrgGroupRequestPublishing,
  OrgGroupRequestQueryParams,
  OrgGroupVCMap,
  OrgUserRoles,
} from '@/api/modules/orgs'
import { DUMMY_ORG_GROUP_REQUESTS } from '@/api/modules/orgs/mocks'
import {
  getClaimIdFromVC,
  getTargetProperty,
  loadAndParseCredentialSchema,
} from '@/api/modules/zkp'
import { ApiServicePaths } from '@/enums/api'

const fakeLoadRequestsAll = async (query?: OrgGroupRequestQueryParams) => {
  return DUMMY_ORG_GROUP_REQUESTS.filter(req => {
    if (
      query?.filter?.[OrgGroupRequestFilters.Status] &&
      query.filter?.[OrgGroupRequestFilters.UserDid]
    ) {
      return (
        query.filter[OrgGroupRequestFilters.Status].includes(req.status.value) &&
        req.user_did === query.filter[OrgGroupRequestFilters.UserDid]
      )
    }

    if (query?.filter?.[OrgGroupRequestFilters.Status]) {
      return query.filter[OrgGroupRequestFilters.Status].includes(req.status.value)
    }

    if (query?.filter?.[OrgGroupRequestFilters.UserDid]) {
      return req.user_did === query.filter[OrgGroupRequestFilters.UserDid]
    }

    return false
  })
}

export const createInvitation = async (params: {
  orgId: string
  groupId: string
  email: string
  credentialRequests: CredentialRequest[]
}) => {
  const { data } = await api.post<OrgGroupCreatedRequest>(
    `${ApiServicePaths.Orgs}/v1/orgs/${params.orgId}/groups/${params.groupId}/emails`,
    {
      body: {
        data: {
          type: 'invitations-create-email',
          attributes: {
            email: params.email,
            credential_requests: params.credentialRequests,
          },
        },
      },
    },
  )

  return data
}

export const acceptInvitation = async ({
  orgId,
  groupId,
  otp,
  userDid,
}: {
  orgId: string
  groupId: string
  otp: string
  userDid: string
}) => {
  const { data } = await api.patch<OrgGroupCreatedRequest>(
    `${ApiServicePaths.Orgs}/v1/orgs/${orgId}/groups/${groupId}/emails`,
    {
      body: {
        data: {
          type: 'invitations-accept-email',
          attributes: {
            otp: otp,
            user_did: userDid,
          },
        },
      },
    },
  )

  return data
}

export const loadOrgGroupRequests = async (query?: OrgGroupRequestQueryParams) => {
  // FIXME: return once backend is ready
  // const { data } =
  // await api.get<OrgGroupRequest[]>(`${ApiServicePaths.Orgs}/v1/orgs/requests`, {
  //   query: query,
  // })
  //
  // return data

  return fakeLoadRequestsAll(query)
}

export const loadOrgGroupRequestById = async (orgId: string, groupId: string, reqId: string) => {
  const { data } = await api.get<OrgGroupRequest>(
    `${ApiServicePaths.Orgs}/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
  )

  return data
}

// FIXME: not finished backend endpoint
export const fillOrgGroupRequest = async ({
  orgId,
  groupId,
  reqId,
  credReq,
}: {
  orgId: string
  groupId: string
  reqId: string
  credReq: CredentialRequest[]
}) => {
  const { data } = await api.patch<OrgGroupRequest>(
    `${ApiServicePaths.Orgs}/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
    {
      body: {
        data: {
          type: 'requests-fill',
          attributes: {
            credential_requests: credReq,
          },
        },
      },
    },
  )

  return data
}

export const verifyOrgGroupRequest = async ({
  orgId,
  groupId,
  reqId,
  activationDate,
  expirationDate,
  role,
  metadata,
}: {
  orgId: string
  groupId: string
  reqId: string
  activationDate?: string
  expirationDate?: string
  role: OrgUserRoles
  metadata: OrgGroupRequestMetadata
}) => {
  const { data } = await api.post<OrgGroupRequest>(
    `${ApiServicePaths.Orgs}/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
    {
      body: {
        data: {
          type: 'requests-verify',
          attributes: {
            ...(activationDate && { activation_date: activationDate }),
            ...(expirationDate && { expiration_date: expirationDate }),
            approved: true,
            role: role,
            metadata,
          },
        },
      },
    },
  )

  return data
}

export const rejectOrgGroupRequest = async ({
  orgId,
  groupId,
  reqId,
}: {
  orgId: string
  groupId: string
  reqId: string
}) => {
  const { data } = await api.post<OrgGroupRequest>(
    `${ApiServicePaths.Orgs}/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
    {
      body: {
        data: {
          type: 'requests-verify',
          attributes: {
            approved: true,
          },
        },
      },
    },
  )

  return data
}

export const getOrgGroupPublishingRequests = async ({
  orgId,
  groupId,
  reqId,
}: {
  orgId: string
  groupId: string
  reqId: string
}): Promise<OrgGroupRequestPublishing[]> => {
  const { data } = await api.get<OrgGroupRequestPublishing[]>(
    `${ApiServicePaths.Orgs}/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}/publishing`,
  )

  return data
}

export const loadOrgGroupReqMetadataById = async (
  metadataId: string,
): Promise<OrgGroupRequestMetadata> => {
  const { data } = await api.get<OrgGroupRequestMetadata>(
    `${ApiServicePaths.Orgs}/v1/orgs/metadata/${metadataId}`,
  )

  return data

  // TODO: remove once backend is ready
  // return {
  //   title: 'title',
  //   subtitle: 'subtitle',
  //   appearance: {
  //     background: '#ffffff',
  //   },
  // }
}

export const buildCredentialRequest = async (
  schemeUrl: string,
  propertyValue: string,
  groupID: string,
): Promise<CredentialRequest> => {
  const parsedScheme = await loadAndParseCredentialSchema(schemeUrl)
  const targetProperty = getTargetProperty(parsedScheme)

  return {
    credential_schema: schemeUrl,
    credential_subject: {
      id: '', // user DID
      type: parsedScheme.type,
      groupID,
      [targetProperty.key]: propertyValue,
    },
    type: parsedScheme.type,
    expiration: '',
    mt_proof: true,
    signature_proof: true,
  }
}

export const getOrgGroupRequestClaims = async ({
  orgId,
  groupId,
  reqId,
}: {
  orgId: string
  groupId: string
  reqId: string
}): Promise<OrgGroupRequestClaim[]> => {
  const { data } = await api.get<OrgGroupRequestClaim[]>(
    `${ApiServicePaths.Orgs}/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}/publishing`,
  )

  return data
}

export const getMetadataBatch = async (vcs: W3CCredential[]): Promise<GroupedCredentials> => {
  const orgsToClaimIdsMap = vcs.reduce((acc, vc) => {
    const issuerDID = vc.issuer

    if (!acc[issuerDID]) acc[issuerDID] = []

    acc[issuerDID].push(getClaimIdFromVC(vc))

    return acc
  }, {} as OrgClaimIDMap)

  const { data } = await api.get<GroupedCredentials>(`${ApiServicePaths.Orgs}/v1/orgs/metadata`, {
    query: {
      orgsToClaimIdsMap,
    },
  })

  return data

  // return DUMMY_ORG_GROUP_METADATAS // FIXME: remove
}

export const groupVCsToOrgGroups = (
  groupedVCs: GroupedCredentials,
  vcs: W3CCredential[],
): OrgGroupVCMap => {
  return groupedVCs.grouped_credentials.map(org => ({
    orgDID: org.org_did,
    groups: org.groups.map(group => ({
      groupID: group.group_id,
      requests: group.requests.map(req => ({
        reqID: req.req_id,
        vcs: vcs.filter(vc => req.claim_ids.includes(getClaimIdFromVC(vc))),
        metadata: req.metadata,
      })),
    })),
  }))
}
