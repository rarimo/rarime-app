import {
  Organization,
  OrgGroup,
  OrgGroupRequestFilters,
  OrgGroupRequestIncludes,
  OrgGroupRequestStatuses,
} from '@/api'

export type OrgGroupRequestPerCredentialMetadata = {
  schema: string
  fields: Record<string, string>
  metadata: {
    startDate?: string
    endDate?: string
    title?: string
    subtitle?: string
    orgId: string
    appearance: {
      background: string
    }
  }
}

export type OrgGroupRequest = {
  id: string
  type: 'requests'
  org_id: string
  group_id: string
  user_did: string
  metadata: OrgGroupRequestPerCredentialMetadata[]
  status: {
    name: string
    value: OrgGroupRequestStatuses
  }
  created_at: string
  updated_at: string
  organization?: Organization
  group?: OrgGroup
}

export type OrgGroupCreateRequestRule = {
  scheme: string
  value: string
}

export type OrgGroupCreateRequest = {
  orgId: string
  groupId: string
  email: string
  rules: OrgGroupCreateRequestRule[]
}

export type OrgGroupCreatedRequest = {
  id: string
  type: 'invitations-email'
  req_id: string
  org_id: string
  group_id: string
  email: string
  created_at: string
  request: OrgGroupRequest
}

export type OrgGroupRequestFiltersMap = {
  [OrgGroupRequestFilters.UserDid]: string
  [OrgGroupRequestFilters.Status]: OrgGroupRequestStatuses
}

export type OrgGroupRequestQueryParams = {
  filter?: OrgGroupRequestFiltersMap
  include?: OrgGroupRequestIncludes[]
}
