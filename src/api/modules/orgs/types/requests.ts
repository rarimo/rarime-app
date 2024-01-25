import { W3CCredential } from '@rarimo/rarime-connector'

import {
  Organization,
  OrgGroup,
  OrgGroupRequestFilters,
  OrgGroupRequestIncludes,
  OrgGroupRequestMetadata,
  OrgGroupRequestPublishingStatuses,
  OrgGroupRequestStatuses,
} from '@/api/modules/orgs'
import { CredentialSubject } from '@/api/modules/zkp'

export type CredentialRequest = {
  credential_schema: string
  credential_subject: CredentialSubject
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

export type OrgGroupCreatedRequest = {
  id: string
  type: 'invitations-email'
  req_id: string
  org_id: string
  group_id: string
  email: string
  created_at: string
  claim_id: string
  request?: OrgGroupRequest
}

export type OrgGroupRequestFiltersMap = {
  [OrgGroupRequestFilters.UserDid]?: string
  [OrgGroupRequestFilters.Status]?: OrgGroupRequestStatuses[]
}

export type OrgGroupRequestQueryParams = {
  filter?: OrgGroupRequestFiltersMap
  include?: OrgGroupRequestIncludes[]
}

export type OrgGroupRequestPublishing = {
  id: string
  type: 'claims'
  claim_id: string
  request_id: string
  created_at: string
  updated_at: string
  schema_url: string
  status: OrgGroupRequestPublishingStatuses
}

export type OrgGroupRequestClaim = {
  id: string
  type: 'claims'
  claim_id: string
  request_id: string
  schema_url: string
  status: string
  created_at: string
  updated_at: string
  organization?: Organization
}

export type OrgClaimIDMap = Record<string, string[]>

export type GroupedCredentials = {
  id: string
  type: 'grouped_credentials'

  grouped_credentials: {
    org_did: string
    groups: {
      group_id: string
      requests: {
        req_id: string
        claim_ids: string[]
        metadata: OrgGroupRequestMetadata
      }[]
    }[]
  }[]
}

export type OrgGroupVCMap = {
  orgDID: string
  groups: {
    groupID: string
    requests: {
      reqID: string
      vcs: W3CCredential[]
      metadata: OrgGroupRequestMetadata
    }[]
  }[]
}[]
