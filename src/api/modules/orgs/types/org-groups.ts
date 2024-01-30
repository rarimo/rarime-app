import { OrgGroupIncludes } from '@/api/modules/orgs'

export type OrgGroupMetadata = {
  name: string
  description: string
}

export type OrgGroupRequestMetadata = {
  title: string
  subtitle: string
  appearance: {
    background: string
  }
}

export type OrgGroupRule = {
  name: string
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
  metadata: OrgGroupMetadata
  rules: OrgGroupRule[]
}

export type OrgGroupQueryParams = {
  include?: OrgGroupIncludes
}
