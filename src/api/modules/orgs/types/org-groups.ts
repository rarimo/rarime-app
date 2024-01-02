import { OrgGroupIncludes } from '@/api'

export type OrgGroupMetadata = {
  name: string
  description: string
  // TODO: other metadata e. g. styles
}

export type OrgGroupRule = {
  scheme: string
  required: boolean
}

export type GroupUser = {
  id: string
  type: 'group-users'
  group_id: string
  user_id: string
  role: {
    name: string
    value: number
  }
  created_at: string
  updated_at: string
}

export type OrgGroup = {
  id: string
  type: 'groups'
  org_id: string
  metadata: OrgGroupMetadata
  rules: OrgGroupRule[]
  created_at: string
  group_users?: GroupUser[]
}

export type OrgGroupCreate = {
  type: 'groups-create'
  attributes: {
    metadata: OrgGroupMetadata
    rules: OrgGroupRule[]
  }
}

export type OrgGroupQueryParams = {
  include?: OrgGroupIncludes
}
