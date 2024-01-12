import { fetcher } from '@distributedlab/fetcher'
import omit from 'lodash/omit'

import {
  api,
  CredentialRequest,
  CredentialSubject,
  OrgGroupCreatedRequest,
  OrgGroupCreateRequest,
  OrgGroupRequest,
  OrgGroupRequestFilters,
  OrgGroupRequestPublishing,
  OrgGroupRequestQueryParams,
  OrgGroupRequestStatuses,
  OrgGroupVCsMetadata,
  OrgsStatuses,
  OrgUserRoles,
  VCSchema,
} from '@/api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_ORG_GROUP_REQUESTS: OrgGroupRequest[] = [
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          birthday: '1704810332',
          metadata_id: 'uuid-1234-5678-9101',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'created',
      value: OrgGroupRequestStatuses.Created,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          birthday: '1704810332',
          metadata_id: 'uuid-1234-5678-9101',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'created',
      value: OrgGroupRequestStatuses.Created,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          birthday: '1704810332',
          metadata_id: 'uuid-1234-5678-9101',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'created',
      value: OrgGroupRequestStatuses.Created,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          birthday: '1704810332',
          metadata_id: 'uuid-1234-5678-9101',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'approved',
      value: OrgGroupRequestStatuses.Approved,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          birthday: '1704810332',
          metadata_id: 'uuid-1234-5678-9101',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'submitted',
      value: OrgGroupRequestStatuses.Submitted,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          birthday: '1704810332',
          metadata_id: 'uuid-1234-5678-9101',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'submitted',
      value: OrgGroupRequestStatuses.Submitted,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          birthday: '1704810332',
          metadata_id: 'uuid-1234-5678-9101',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'filled',
      value: OrgGroupRequestStatuses.Filled,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          birthday: '1704810332',
          metadata_id: 'uuid-1234-5678-9101',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'filled',
      value: OrgGroupRequestStatuses.Filled,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_CREATED_REQUEST: OrgGroupCreatedRequest = {
  id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
  type: 'invitations-email',
  org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
  group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
  email: 'yopta@gmail.com',
  req_id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
  created_at: '2021-08-12T14:00:00Z',
  request: DUMMY_ORG_GROUP_REQUESTS[0],
}

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

export const createInvitation = async ({ orgId, groupId, email, rules }: OrgGroupCreateRequest) => {
  const { data } = await api.post<OrgGroupCreatedRequest>(
    `/v1/orgs/${orgId}/groups/${groupId}/emails`,
    {
      body: {
        data: {
          type: 'invitations-email',
          attributes: {
            email: email,
            rules: rules,
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
  reqId,
  otp,
  userDid,
}: {
  orgId: string
  groupId: string
  reqId: string
  otp: string
  userDid: string
}) => {
  const { data } = await api.patch<OrgGroupCreatedRequest>(
    `/v1/orgs/${orgId}/groups/${groupId}/emails`,
    {
      body: {
        data: {
          id: reqId,
          type: 'invitations-accept-email',
          attributes: {
            otp: otp,
            user_did: userDid,
            // TODO: prefill metadata
          },
        },
      },
    },
  )

  return data
}

export const loadOrgGroupRequests = async (query?: OrgGroupRequestQueryParams) => {
  // const { data } = await api.get<OrgGroupRequest[]>(`/v1/orgs/requests`, {
  //   query: query,
  // })
  //
  // return data

  return fakeLoadRequestsAll(query)
}

export const loadOrgGroupRequestById = async (orgId: string, groupId: string, reqId: string) => {
  const { data } = await api.get<OrgGroupRequest>(
    `/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
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
    `/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
    {
      body: {
        data: {
          type: 'requests-fill',
          attributes: {
            metadata: credReq,
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
  metadata: OrgGroupVCsMetadata
}) => {
  const { data } = await api.post<OrgGroupRequest>(
    `/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
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
    `/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
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
    `/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}/publishing`,
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

export const loadOrgGroupReqMetadataById = async (
  metadataId: string,
): Promise<OrgGroupVCsMetadata> => {
  const { data } = await api.get<OrgGroupVCsMetadata>(`/v1/orgs/metadata/${metadataId}`)

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
