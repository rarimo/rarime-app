import { api, OrgGroup, OrgGroupCreate, OrgGroupRequestQueryParams } from '@/api'

export const loadOrgGroups = async (orgId: string, query?: OrgGroupRequestQueryParams) => {
  const { data } = await api.get<OrgGroup[]>(`/v1/orgs/${orgId}/groups`, {
    query,
  })

  return data
}

export const createOrgGroup = async (orgId: string, createOpts: OrgGroupCreate) => {
  const { data } = await api.post<OrgGroup>(`/v1/orgs/${orgId}/groups`, {
    body: {
      data: {
        ...createOpts,
      },
    },
  })

  return data
}

export const loadOrgGroupById = async (
  orgId: string,
  groupId: string,
  query?: OrgGroupRequestQueryParams,
) => {
  const { data } = await api.get<OrgGroup>(`/v1/orgs/${orgId}/groups/${groupId}`, {
    query,
  })

  return data
}
