import { api, OrgGroup, OrgGroupCreate, OrgGroupQueryParams, OrgGroupRequestStatuses } from '@/api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_ORG_GROUP: OrgGroup[] = [
  {
    id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    type: 'groups',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    metadata: {
      name: 'Group Name',
      description: 'Group description',
    },
    rules: [
      {
        name: 'Rule name 1',
        scheme: 'https://ipfs.io/ipfs/QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V',
        required: true,
      },
      {
        name: 'Rule name 2',
        scheme: 'https://ipfs.io/ipfs/QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V',
        required: true,
      },
      {
        name: 'Rule name 3',
        scheme: 'https://ipfs.io/ipfs/QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V',
        required: true,
      },
      {
        name: 'Rule name 4',
        scheme: 'https://ipfs.io/ipfs/QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V',
        required: true,
      },
    ],
    created_at: '2021-08-12T14:00:00Z',
    group_users: [
      {
        id: 'f302eac7-8015-4a71-a64d-b719c1a35df9',
        type: 'group-users',
        group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
        user_id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
        role: {
          name: 'undefined',
          value: 0,
        },
        created_at: '2021-08-13T14:00:00Z',
        updated_at: '2021-08-15T13:00:00Z',
      },
    ],
  },
]

export const loadOrgGroups = async (orgId: string, query?: OrgGroupQueryParams) => {
  const { data } = await api.get<OrgGroup[]>(`/v1/orgs/${orgId}/groups`, {
    query,
  })

  return data
}

export const createOrgGroup = async (orgId: string, createOpts: OrgGroupCreate) => {
  const { data } = await api.post<OrgGroup>(`/v1/orgs/${orgId}/groups`, {
    body: {
      data: {
        type: 'groups-create',
        attributes: {
          metadata: createOpts.metadata,
          rules: createOpts.rules,
        },
      },
    },
  })

  return data
}

export const loadOrgGroupById = async (
  orgId: string,
  groupId: string,
  query?: OrgGroupQueryParams,
) => {
  const { data } = await api.get<OrgGroup>(`/v1/orgs/${orgId}/groups/${groupId}`, {
    query,
  })

  return data
}

export const loadOrgGroupRequestsCount = async (
  orgId: string,
  groupId: string,
): Promise<Record<OrgGroupRequestStatuses, number>> => {
  const { data } = await api.get<Record<OrgGroupRequestStatuses, number>>(
    `/v1/orgs/${orgId}/groups/${groupId}/requests/count`,
  )

  return data

  // return {
  //   [OrgGroupRequestStatuses.Accepted]: 2,
  //   [OrgGroupRequestStatuses.Approved]: 2,
  //   [OrgGroupRequestStatuses.Rejected]: 3,
  //   [OrgGroupRequestStatuses.Created]: 5,
  //   [OrgGroupRequestStatuses.Filled]: 2,
  //   [OrgGroupRequestStatuses.Submitted]: 5,
  // }
}
