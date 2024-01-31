import type {
  OrgsIncludes,
  OrgsRequestFilters,
  OrgsRequestPage,
  OrgsStatuses,
} from '@/api/modules/orgs'

export type OrgMetadataLink = {
  title: string
  url: string
}

export type OrgMetadata = {
  logoUrl: string
  name: string
  description: string
  links?: OrgMetadataLink[]
}

export type OrgUser = {
  id: string
  type: 'users'
  did: string
  role: {
    name: string
    value: number
  }
  org_id: string
  created_at: string
  updated_at: string
}

export type Organization = {
  id: string
  type: 'organizations'
  did: string
  owner?: OrgUser
  domain: string
  metadata: OrgMetadata
  status: {
    name: string
    value: OrgsStatuses
  }
  verification_code: string
  issued_claims_count: string
  members_count: string
  created_at: string
  updated_at: string
}

export type OrganizationCreate = {
  ownerDid: string
  domain: string
  metadata: OrgMetadata
}

export type OrgsRequestFiltersMap = {
  [OrgsRequestFilters.Owner]?: string
  [OrgsRequestFilters.UserDid]?: string
  [OrgsRequestFilters.Status]?: OrgsStatuses
  [OrgsRequestFilters.Metadata]?: string
}

export type OrgsRequestPageMap = {
  [OrgsRequestPage.Limit]: number
  [OrgsRequestPage.Number]: number
}

export type OrgsRequestQueryParams = {
  include?: OrgsIncludes
  filter?: OrgsRequestFiltersMap
  page?: OrgsRequestPageMap
  // TODO: sort, ...etc
}

export type OrgVerificationCode = {
  id: string
  type: string
  code: string
}

export type OrgListMeta = {
  count: number
}

export type OrgsListResponse = {
  data: Organization[]
  meta: OrgListMeta
}
