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

// TODO: move to rarime-connector
export type VCSchema = {
  $schema: string
  type: string
  $metadata: {
    uris: {
      jsonLdContext: string
      jsonSchema: string
    }
  }
  required: Array<string>
  properties: {
    '@context': {
      type: Array<string>
    }
    id: {
      type: string
    }
    type: {
      type: Array<string>
      items: {
        type: string
      }
    }
    issuer: {
      type: Array<string>
      format: string
      required: Array<string>
      properties: {
        id: {
          type: string
          format: string
        }
      }
    }
    issuanceDate: {
      type: string
      format: string
    }
    expirationDate: {
      type: string
      format: string
    }
    credentialSchema: {
      type: string
      required: Array<string>
      properties: {
        id: {
          type: string
          format: string
        }
        type: {
          type: string
        }
      }
    }
    subjectPosition: {
      type: string
      enum: Array<string>
    }
    merklizationRootPosition: {
      type: string
      enum: Array<string>
    }
    revNonce: {
      type: string
    }
    version: {
      type: string
    }
    updatable: {
      type: string
    }
    credentialSubject: {
      type: string
      required: Array<string>
      properties: {
        id: {
          title: string
          type: string
          format: string
        }
      } & {
        [key: string]: {
          type: string
        }
      }
    }
  }
}
