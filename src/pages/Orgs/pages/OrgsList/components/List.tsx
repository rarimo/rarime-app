import { Grid, Stack, StackProps } from '@mui/material'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCallback } from 'react'
//FIXME
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loadOrgs, Organization, type OrgsRequestFiltersMap, OrgsStatuses } from '@/api'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLoading } from '@/hooks'
import { ListCard } from '@/pages/Orgs/pages/OrgsList/components/index'

interface Props extends StackProps {
  filter: OrgsRequestFiltersMap
}

//FIXME
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function List({ filter, ...rest }: Props) {
  // TODO: add pagination
  // const loadList = useCallback(async () => {
  //   return loadOrgs({ filter })
  // }, [filter])
  //
  // const {
  //   data: orgList,
  //   isLoading,
  //   isLoadingError,
  //   isEmpty,
  // } = useLoading<Organization[]>([], loadList, {
  //   loadOnMount: true,
  // })

  const isLoading = false
  const isLoadingError = false
  const isEmpty = false
  const orgList = [
    {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'https://organization-domain.com',
      metadata: {
        logoUrl: 'https://avatars.githubusercontent.com/u/113721198?s=200&v=4',
        name: 'Rarimo',
        description: 'Web3 multichain engine - for the next generation of interoperability',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Unverified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
      owner: {
        id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
        type: 'users',
        did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
        role: {
          name: 'undefined',
          value: 0,
        },
        org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
        created_at: '2021-08-12T12:00:00Z',
        updated_at: '2021-08-12T13:00:00Z',
      },
    },
    {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'https://organization-domain.com',
      metadata: {
        logoUrl: 'https://avatars.githubusercontent.com/u/113721198?s=200&v=4',
        name: 'Rarimo',
        description: 'Web3 multichain engine - for the next generation of interoperability',
      },
      status: {
        name: 'verified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
      owner: {
        id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
        type: 'users',
        did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
        role: {
          name: 'undefined',
          value: 0,
        },
        org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
        created_at: '2021-08-12T12:00:00Z',
        updated_at: '2021-08-12T13:00:00Z',
      },
    },
    {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'https://organization-domain.com',
      metadata: {
        logoUrl: 'https://avatars.githubusercontent.com/u/113721198?s=200&v=4',
        name: 'Rarimo',
        description: 'Web3 multichain engine - for the next generation of interoperability',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Unverified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
      owner: {
        id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
        type: 'users',
        did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
        role: {
          name: 'undefined',
          value: 0,
        },
        org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
        created_at: '2021-08-12T12:00:00Z',
        updated_at: '2021-08-12T13:00:00Z',
      },
    },
    {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'https://organization-domain.com',
      metadata: {
        logoUrl: 'https://avatars.githubusercontent.com/u/113721198?s=200&v=4',
        name: 'Rarimo',
        description: 'Web3 multichain engine - for the next generation of interoperability',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Unverified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
      owner: {
        id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
        type: 'users',
        did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
        role: {
          name: 'undefined',
          value: 0,
        },
        org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
        created_at: '2021-08-12T12:00:00Z',
        updated_at: '2021-08-12T13:00:00Z',
      },
    },
    {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'https://organization-domain.com',
      metadata: {
        logoUrl: '\thttps://avatars.githubusercontent.com/u/69836600?s=200&v=4',
        name: 'Rarimo',
        description: 'Web3 multichain engine - for the next generation of interoperability',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Unverified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
      owner: {
        id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
        type: 'users',
        did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
        role: {
          name: 'undefined',
          value: 0,
        },
        org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
        created_at: '2021-08-12T12:00:00Z',
        updated_at: '2021-08-12T13:00:00Z',
      },
    },
    {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'https://organization-domain.com',
      metadata: {
        logoUrl: '\thttps://avatars.githubusercontent.com/u/69836600?s=200&v=4',
        name: 'Rarimo',
        description: 'Web3 multichain engine - for the next generation of interoperability',
      },
      status: {
        name: 'verified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
      owner: {
        id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
        type: 'users',
        did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
        role: {
          name: 'undefined',
          value: 0,
        },
        org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
        created_at: '2021-08-12T12:00:00Z',
        updated_at: '2021-08-12T13:00:00Z',
      },
    },
  ]

  return (
    <Stack {...rest}>
      {isLoading ? (
        <></>
      ) : isLoadingError ? (
        <></>
      ) : isEmpty ? (
        <></>
      ) : (
        <Grid container spacing={6}>
          {orgList.map(org => (
            <Grid key={org.id} item xs={4}>
              <ListCard org={org} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  )
}
