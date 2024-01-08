import {
  api,
  OrgGroupCreatedRequest,
  OrgGroupCreateRequest,
  OrgGroupRequest,
  OrgGroupRequestPerCredentialMetadata,
  OrgGroupRequestQueryParams,
  OrgGroupRequestStatuses,
  OrgsStatuses,
  OrgUserRoles,
} from '@/api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_ORG_GROUP_REQUESTS: OrgGroupRequest[] = [
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    metadata: [
      {
        schema: 'https://schema.url',
        metadata: {
          startDate: '2021-08-12T12:00:00Z',
          endDate: '2021-08-12T13:00:00Z',
          title: 'title',
          subtitle: 'subtitle',
          orgId: 'orgId',
          appearance: {
            background: '',
          },
        },
        fields: {
          field1: 'value1',
        },
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
    metadata: [
      {
        schema: 'https://schema.url',
        metadata: {
          startDate: '2021-08-12T12:00:00Z',
          endDate: '2021-08-12T13:00:00Z',
          title: 'title',
          subtitle: 'subtitle',
          orgId: 'orgId',
          appearance: {
            background: '',
          },
        },
        fields: {
          field1: 'value1',
        },
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
    metadata: [
      {
        schema: 'https://schema.url',
        metadata: {
          startDate: '2021-08-12T12:00:00Z',
          endDate: '2021-08-12T13:00:00Z',
          title: 'title',
          subtitle: 'subtitle',
          orgId: 'orgId',
          appearance: {
            background: '',
          },
        },
        fields: {
          field1: 'value1',
        },
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
    metadata: [
      {
        schema: 'https://schema.url',
        metadata: {
          startDate: '2021-08-12T12:00:00Z',
          endDate: '2021-08-12T13:00:00Z',
          title: 'title',
          subtitle: 'subtitle',
          orgId: 'orgId',
          appearance: {
            background: '',
          },
        },
        fields: {
          field1: 'value1',
        },
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
    metadata: [
      {
        schema: 'https://schema.url',
        metadata: {
          startDate: '2021-08-12T12:00:00Z',
          endDate: '2021-08-12T13:00:00Z',
          title: 'title',
          subtitle: 'subtitle',
          orgId: 'orgId',
          appearance: {
            background: '',
          },
        },
        fields: {
          field1: 'value1',
        },
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
    metadata: [
      {
        schema: 'https://schema.url',
        metadata: {
          startDate: '2021-08-12T12:00:00Z',
          endDate: '2021-08-12T13:00:00Z',
          title: 'title',
          subtitle: 'subtitle',
          orgId: 'orgId',
          appearance: {
            background: '',
          },
        },
        fields: {
          field1: 'value1',
        },
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
    metadata: [
      {
        schema: 'https://schema.url',
        metadata: {
          startDate: '2021-08-12T12:00:00Z',
          endDate: '2021-08-12T13:00:00Z',
          title: 'title',
          subtitle: 'subtitle',
          orgId: 'orgId',
          appearance: {
            background: '',
          },
        },
        fields: {
          field1: 'value1',
        },
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
    metadata: [
      {
        schema: 'https://schema.url',
        metadata: {
          startDate: '2021-08-12T12:00:00Z',
          endDate: '2021-08-12T13:00:00Z',
          title: 'title',
          subtitle: 'subtitle',
          orgId: 'orgId',
          appearance: {
            background: '',
          },
        },
        fields: {
          field1: 'value1',
        },
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

  return DUMMY_ORG_GROUP_REQUESTS
}

export const loadOrgGroupRequestById = async (orgId: string, groupId: string, reqId: string) => {
  const { data } = await api.get<OrgGroupRequest>(
    `/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
  )

  return data
}

export const fillOrgGroupRequest = async ({
  orgId,
  groupId,
  reqId,
  credMetadata,
}: {
  orgId: string
  groupId: string
  reqId: string
  credMetadata: OrgGroupRequestPerCredentialMetadata[]
}) => {
  const { data } = await api.patch<OrgGroupRequest>(
    `/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
    {
      body: {
        data: {
          type: 'requests-fill',
          attributes: {
            metadata: credMetadata,
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
  credMetadata,
  role,
}: {
  orgId: string
  groupId: string
  reqId: string
  credMetadata: OrgGroupRequestPerCredentialMetadata[]
  role: OrgUserRoles
}) => {
  const { data } = await api.post<OrgGroupRequest>(
    `/v1/orgs/${orgId}/groups/${groupId}/requests/${reqId}`,
    {
      body: {
        data: {
          type: 'requests-verify',
          attributes: {
            approved: true,
            metadata: credMetadata,
            role: role,
          },
        },
      },
    },
  )

  return data
}
