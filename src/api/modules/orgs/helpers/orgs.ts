import { api } from '@/api/clients'
import {
  type Organization,
  type OrganizationCreate,
  type OrgMetadata,
  type OrgsRequestQueryParams,
  OrgsStatuses,
  type OrgUser,
  type OrgVerificationCode,
} from '@/api/modules/orgs'
import { ApiServicePaths } from '@/enums/api'

export const DUMMY_ORGS: Organization[] = [
  {
    id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    type: 'organizations',
    did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
    domain: 'www.rarimo.com',
    metadata: {
      logoUrl: 'https://rarimo.com/favicon/favicon-dark.png',
      name: 'Rarimo',
      description: 'Organization description',
      links: [
        {
          title: 'Facebook.com/rarimo',
          url: 'https://www.facebook.com/rarimo',
        },
        {
          title: '@Rarimo_Protocol',
          url: 'https://instagram.com/rarimo_protocol',
        },
        {
          title: '@Rarimo_Protocol',
          url: 'https://twitter.com/rarimo_protocol',
        },
        {
          title: 'Official website',
          url: 'https://rarimo.com',
        },
      ],
    },
    status: {
      name: 'verified',
      value: OrgsStatuses.Verified,
    },
    verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
    issued_claims_count: '0',
    members_count: '1',
    created_at: '2021-08-12T12:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    owner: {
      id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
      type: 'users',
      did: 'did:iden3:readonly:tTNsD7orsf2f5So34v3RMpektAZerLmHhaLZYddhZ',
      role: {
        name: 'undefined',
        value: 0,
      },
      org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    type: 'organizations',
    did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
    domain: 'https://organization-domain.com',
    metadata: {
      logoUrl: 'https://organization-domain.com/logo.png',
      name: 'Organization Name',
      description: 'Organization Description',
    },
    status: {
      name: 'verified',
      value: OrgsStatuses.Verified,
    },
    verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
    issued_claims_count: '0',
    members_count: '1',
    created_at: '2021-08-12T12:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    owner: {
      id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
      type: 'users',
      did: 'did:iden3:readonly:tTNsD7orsf2f5So34v3RMpektAZerLmHhaLZYddhZ',
      role: {
        name: 'undefined',
        value: 0,
      },
      org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
]

export const loadOrgs = async (query: OrgsRequestQueryParams) => {
  const { data } = await api.get<Organization[]>(`${ApiServicePaths.Orgs}/v1/orgs`, {
    query,
  })

  return data
}

export const loadOrgsCount = async () => {
  const { data } = await api.get<number>(`${ApiServicePaths.Orgs}/v1/orgs/count`)

  return data
}

export const loadOrgById = async (id: string, query: OrgsRequestQueryParams) => {
  const { data } = await api.get<Organization>(`${ApiServicePaths.Orgs}/v1/orgs/${id}`, {
    query,
  })

  return data
}

export const createOrg = async (body: OrganizationCreate) => {
  const { data } = await api.post<Organization>(`${ApiServicePaths.Orgs}/v1/orgs`, {
    body: {
      data: {
        type: 'organizations-create',
        attributes: {
          owner_did: body.ownerDid,
          domain: body.domain,
          metadata: body.metadata,
        },
      },
    },
  })

  return data
}

export const verifyOrg = async (id: string) => {
  const { data } = await api.post<Organization>(`${ApiServicePaths.Orgs}/v1/orgs/${id}`)

  return data
}

export const updateOrgMetadata = async (id: string, metadata: Partial<OrgMetadata>) => {
  const { data } = await api.patch<Partial<OrgMetadata>>(`${ApiServicePaths.Orgs}/v1/orgs/${id}`, {
    body: { data: metadata },
  })

  return data
}

export const loadOrgUsers = async (id: string, query: OrgsRequestQueryParams) => {
  const { data } = await api.get<OrgUser[]>(`${ApiServicePaths.Orgs}/v1/orgs/${id}/users`, {
    query,
  })

  return data
}

export const getOrgVerificationCode = async (id: string) => {
  const { data } = await api.get<OrgVerificationCode>(
    `${ApiServicePaths.Orgs}/v1/orgs/${id}/verification-code`,
  )

  return data
}
