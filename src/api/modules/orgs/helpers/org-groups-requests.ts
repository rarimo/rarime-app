import { W3CCredential } from '@rarimo/rarime-connector'

import { api } from '@/api/clients'
import {
  CredentialRequest,
  OrgGroupCreatedRequest,
  OrgGroupRequest,
  OrgGroupRequestFilters,
  OrgGroupRequestMetadata,
  OrgGroupRequestPublishing,
  OrgGroupRequestQueryParams,
  OrgGroupRequestWithClaims,
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

export const loadRequestsByUserDid = async (did: string): Promise<OrgGroupRequestWithClaims[]> => {
  const { data } = await api.get<OrgGroupRequestWithClaims[]>(
    `${ApiServicePaths.Orgs}/v1/users/${did}/requests`,
  )

  return data
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

export const groupVCsToOrgGroups = (
  orgGroupRequests: OrgGroupRequestWithClaims[],
  vcs: W3CCredential[],
): OrgGroupVCMap => {
  return orgGroupRequests.map(orgGroupRequest => {
    if (!orgGroupRequest.organization?.did) throw new TypeError('Organization DID is missing')

    const orgRequestClaimIDs = orgGroupRequest.claims.map(claim => claim.id)

    return {
      orgDID: orgGroupRequest.organization.did,
      groupID: orgGroupRequest.group_id,
      vcs: vcs.filter(vc => orgRequestClaimIDs.includes(getClaimIdFromVC(vc))),
    }
  })
}
