import {
  api,
  type Organization,
  type OrganizationCreate,
  type OrgsRequestQueryParams,
  type OrgUser,
  type OrgVerificationCode,
} from '@/api'

export const loadOrgs = async (query: OrgsRequestQueryParams) => {
  return api.get<Organization[]>('/v1/orgs', {
    query,
  })
}

export const loadOrgById = async (id: string, query: OrgsRequestQueryParams) => {
  return api.get<Organization>(`/v1/orgs/${id}`, {
    query,
  })
}

export const createOrg = async (body: OrganizationCreate) => {
  return api.post<Organization>('/v1/orgs', {
    body: {
      data: {
        id: body.id,
        type: 'organizations-create',
        attributes: {
          owner_did: body.ownerDid,
          domain: body.domain,
          metadata: body.metadata,
        },
      },
    },
  })
}

export const verifyOrg = async (id: string) => {
  return api.post<Organization>(`/v1/orgs/${id}`)
}

export const loadOrgUsers = async (id: string, query: OrgsRequestQueryParams) => {
  return api.get<OrgUser[]>(`/v1/orgs/${id}/users`, {
    query,
  })
}

export const getOrgVerificationCode = async (id: string) => {
  return api.get<OrgVerificationCode>(`/v1/orgs/${id}/verification-code`)
}
