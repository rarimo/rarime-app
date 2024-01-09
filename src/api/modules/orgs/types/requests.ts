import {
  Organization,
  OrgGroup,
  OrgGroupRequestFilters,
  OrgGroupRequestIncludes,
  OrgGroupRequestStatuses,
} from '@/api'

export type CredentialRequest = {
  credential_schema: string
  credential_subject: Record<string, string>
  type: string
  expiration: string
  mt_proof: boolean
  signature_proof: boolean
}

export type OrgGroupRequest = {
  id: string
  type: 'requests'
  org_id: string
  group_id: string
  user_did: string
  credential_requests: CredentialRequest[]
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
