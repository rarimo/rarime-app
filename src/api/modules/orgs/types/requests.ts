import {
  Organization,
  OrgGroup,
  OrgGroupRequestFilters,
  OrgGroupRequestIncludes,
  OrgGroupRequestStatuses,
  OrgGroupRule,
} from '@/api'

export type OrgGroupRequestMetadata = {
  schema: string
  metadata: {
    metadata1: string
  }
  fields: {
    field1: string
  }
}[]

export type OrgGroupRequest = {
  id: string
  type: 'requests'
  org_id: string
  group_id: string
  user_did: string
  metadata: OrgGroupRequestMetadata
  status: {
    name: string
    value: OrgGroupRequestStatuses
  }
  created_at: string
  updated_at: string
  organization?: Organization
  group?: OrgGroup
}

export type OrgGroupCreateRequest = {
  orgId: string
  groupId: string
  email: string
  rules: OrgGroupRule[]
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
