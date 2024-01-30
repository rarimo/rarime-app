// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { W3CCredential } from '@rarimo/rarime-connector'

import {
  GroupedCredentials,
  OrgGroupCreatedRequest,
  OrgGroupRequest,
  OrgGroupRequestMetadata,
  OrgGroupRequestStatuses,
  OrgsStatuses,
} from '@/api/modules/orgs'

export const DUMMY_ORG_GROUP_REQUESTS: OrgGroupRequest[] = [
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:readonly:tKRuUKu3feUEktA38mxN2jdEkbgSAHjq8fVqAGmkw',
    credential_requests: [
      {
        credential_schema:
          'https://ipfs.rarimo.com/ipfs/QmcMsGMDZKqPByB6h4edZaWHj64q9tbvSdxdLVZX56mGUc',
        credential_subject: {
          id: '3a798290-caf1-496a-a7e5-4db32551b13d',
          type: 'EmployeePosition',
          position: '',
          groupID: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: true,
      },
    ],
    status: {
      name: 'created',
      value: OrgGroupRequestStatuses.Created,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:readonly:tKRuUKu3feUEktA38mxN2jdEkbgSAHjq8fVqAGmkw',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          id: '3a798290-caf1-496a-a7e5-4db32551b13d',
          type: 'KYCAgeCredential',
          KYCAgeCredential: '1704810332',
          groupID: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'created',
      value: OrgGroupRequestStatuses.Created,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:readonly:tKRuUKu3feUEktA38mxN2jdEkbgSAHjq8fVqAGmkw',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          id: '3a798290-caf1-496a-a7e5-4db32551b13d',
          type: 'KYCAgeCredential',
          KYCAgeCredential: '1704810332',
          groupID: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'created',
      value: OrgGroupRequestStatuses.Created,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:readonly:tKRuUKu3feUEktA38mxN2jdEkbgSAHjq8fVqAGmkw',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          id: '3a798290-caf1-496a-a7e5-4db32551b13d',
          type: 'KYCAgeCredential',
          KYCAgeCredential: '1704810332',
          groupID: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'approved',
      value: OrgGroupRequestStatuses.Approved,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:readonly:tKRuUKu3feUEktA38mxN2jdEkbgSAHjq8fVqAGmkw',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          id: '3a798290-caf1-496a-a7e5-4db32551b13d',
          type: 'KYCAgeCredential',
          KYCAgeCredential: '1704810332',
          groupID: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'submitted',
      value: OrgGroupRequestStatuses.Submitted,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:readonly:tKRuUKu3feUEktA38mxN2jdEkbgSAHjq8fVqAGmkw',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          id: '3a798290-caf1-496a-a7e5-4db32551b13d',
          type: 'KYCAgeCredential',
          KYCAgeCredential: '1704810332',
          groupID: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'submitted',
      value: OrgGroupRequestStatuses.Submitted,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:readonly:tKRuUKu3feUEktA38mxN2jdEkbgSAHjq8fVqAGmkw',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          id: '3a798290-caf1-496a-a7e5-4db32551b13d',
          type: 'KYCAgeCredential',
          KYCAgeCredential: '1704810332',
          groupID: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'filled',
      value: OrgGroupRequestStatuses.Filled,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
  {
    id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
    type: 'requests',
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
    user_did: 'did:iden3:readonly:tKRuUKu3feUEktA38mxN2jdEkbgSAHjq8fVqAGmkw',
    credential_requests: [
      {
        credential_schema:
          'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
        credential_subject: {
          id: '3a798290-caf1-496a-a7e5-4db32551b13d',
          type: 'KYCAgeCredential',
          KYCAgeCredential: '1704810332',
          groupID: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
        },
        type: '',
        expiration: '',
        mt_proof: true,
        signature_proof: false,
      },
    ],
    status: {
      name: 'filled',
      value: OrgGroupRequestStatuses.Filled,
    },
    created_at: '2021-08-12T14:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
    organization: {
      id: '3a798290-caf1-496a-a7e5-4db32551b13d',
      type: 'organizations',
      did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
      domain: 'organization-domain.com',
      metadata: {
        logoUrl: 'https://logo.url',
        name: 'Organization Name',
        description: 'Organization Description',
      },
      status: {
        name: 'unverified',
        value: OrgsStatuses.Verified,
      },
      verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
      issued_claims_count: '0',
      members_count: '1',
      created_at: '2021-08-12T12:00:00Z',
      updated_at: '2021-08-12T13:00:00Z',
    },
  },
]

export const DUMMY_CREATED_REQUEST: OrgGroupCreatedRequest = {
  id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
  type: 'invitations-email',
  org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
  group_id: '6c8c1a69-177e-4754-a4e1-d4a7dbf561e8',
  email: 'yopta@gmail.com',
  req_id: '9d6a5063-684e-4ab4-b49a-82cdceadf63f',
  created_at: '2021-08-12T14:00:00Z',
  request: DUMMY_ORG_GROUP_REQUESTS[0],
  claim_id: '',
}

type FakeOrgSystem = {
  did: string
  groups: {
    id: string
    requests: {
      id: string
      claim_ids: string[]
      metadata: OrgGroupRequestMetadata
    }[]
  }[]
}

const FAKE_ORG_DETAILS: FakeOrgSystem[] = [
  {
    did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
    groups: [
      {
        id: 'c3106e8a-0c26-4a83-9579-144cb3f190e0',
        requests: [
          {
            id: '80d43159-1c6c-4507-b89d-3a2652899484',
            claim_ids: [
              'a572e693-a32f-423f-9436-80062cd52210',
              '507dfc87-faff-477a-9371-cb76c9827e26',
            ],
            metadata: {
              title: 'Civic',
              subtitle: 'Civic',
              appearance: {
                background: '#000000',
              },
            },
          },
        ],
      },

      {
        id: 'dede6c65-f9e2-4971-8b5e-0de953432fb4',
        requests: [
          {
            id: '06858a9d-bee3-44e5-b348-4f4dd62eb225',
            claim_ids: [
              'c6389a9a-a74a-4d93-8411-b4526a4443bc',
              'e3324cac-382b-4171-ab27-5a8711f273b8',
            ],
            metadata: {
              title: 'Civic',
              subtitle: 'Civic',
              appearance: {
                background: '#000000',
              },
            },
          },
        ],
      },
    ],
  },

  {
    did: 'did:iden3:readonly:tLd8sbb1xTSvi2wtRF4TUVcfDUr8ppYMohLqjhGQT',
    groups: [
      {
        id: '88ea3292-079b-4c64-9afe-5ed09fac0d41',
        requests: [
          {
            id: '49607e53-af3e-40c6-ac56-ed400e382a29',
            claim_ids: [
              '842e41bd-8f77-4aca-b8a2-cf6a19d38de9',
              'ca65e641-835a-4f4d-8074-e4ef1fac0510',
            ],
            metadata: {
              title: 'Civic',
              subtitle: 'Civic',
              appearance: {
                background: '#000000',
              },
            },
          },
        ],
      },

      {
        id: 'e098d80a-6998-493b-97b7-9861dd62ad93',
        requests: [
          {
            id: 'cf5bc955-fb21-4dc3-b1ed-4524506cd85f',
            claim_ids: ['e4246361-49f3-4db9-961c-39f7cdc0701e'],
            metadata: {
              title: 'Civic',
              subtitle: 'Civic',
              appearance: {
                background: '#000000',
              },
            },
          },
        ],
      },
    ],
  },
]

const createFakeVCs = (org: FakeOrgSystem): W3CCredential[] => {
  return org.groups.reduce((groupsAcc, group) => {
    return [
      ...groupsAcc,
      ...group.requests.reduce((reqsAcc, req) => {
        return [
          ...reqsAcc,
          ...req.claim_ids.reduce(
            (claimsAcc, claimId) => [
              ...claimsAcc,
              {
                id: `https://issuer.polygon.robotornot.mainnet-beta.rarimo.com/v1/credentials/${claimId}`,
                '@context': [
                  'https://ipfs.rarimo.com/ipfs/QmYCGiCoDn9WVoSwUBA8XLhgjzbeYLWZPfoM3scdtkWpfF',
                  'https://schema.iden3.io/core/jsonld/iden3proofs.jsonld',
                  'https://ipfs.rarimo.com/ipfs/QmWP3bM4oBoD26zrjeGas9v3as6cgpG1hhCPZhySsPuNiH',
                ],
                type: ['VerifiableCredential', 'IdentityProviders'],
                issuanceDate: '2023-12-27T15:12:03.195946265Z',
                credentialSubject: {
                  address: '0xa58174F5632bD281C4639877Dd46AdA3F784d299',
                  id: 'did:iden3:readonly:tKRuUKu3feUEktA38mxN2jdEkbgSAHjq8fVqAGmkw',
                  isNatural: 1,
                  groupID: group.id,
                  provider: 'Civic',
                  providerMetadata:
                    '{"gitcoinPassportData":{"score":"","additionalData":""},"worldcoinData":{"score":"","additionalData":""},"civicGatekeeperNetworkId":4}',
                  type: 'IdentityProviders',
                },
                credentialStatus: {
                  id: 'https://issuer.polygon.robotornot.mainnet-beta.rarimo.com/v1/credentials/revocation/status/1129467401',
                  revocationNonce: 1129467401,
                  type: 'SparseMerkleTreeProof',
                },
                issuer: org.did,
                credentialSchema: {
                  id: 'https://ipfs.rarimo.com/ipfs/QmPC6cerSfgk9mYqQtEB8SE9UAsQRiPPNKjVJu2byWkNPW',
                  type: 'JsonSchema2023',
                },
                proof: [
                  {
                    type: 'BJJSignature2021',
                    issuerData: {
                      id: 'did:iden3:tLd8sbb1xTSvi2wtRF4TUVcfDUr8ppYMohLqjhGQT',
                      updateUrl:
                        'https://issuer.polygon.robotornot.mainnet-beta.rarimo.com/v1/claims/a780d2fd-22ec-435e-8f05-eae04205c2d9/mtp',
                      state: {
                        claimsTreeRoot:
                          '9747653320df0cd590ee5b84f87bbbe2c3b286b62ba9a1645cda0d6d59742024',
                        value: 'cd96cf691736b9bd8904bd7c8908a1fb634062297c94017175a9542de8fbac0a',
                      },
                      authCoreClaim:
                        'cca3371a6cb1b715004407e325bd993c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009b96a8f6eeb9cca85294c178d2ea6cc3d971e806b26f313cac4308eebbd00b0b8dc52c8622de9aee96eff59fde209fc688c76a638029a7cdb1b9010c249737090000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
                      mtp: {
                        existence: true,
                        siblings: [],
                      },
                      credentialStatus: {
                        id: 'https://api.polygon.rarimo.com/v1/did%3Aiden3%3AtLd8sbb1xTSvi2wtRF4TUVcfDUr8ppYMohLqjhGQT/claims/revocation/status/0',
                        revocationNonce: 0,
                        type: 'SparseMerkleTreeProof',
                      },
                    },
                    coreClaim:
                      '11d9dcf5ebe39bd8b48f0d9e2d8132142200000000000000000000000000000001001c6ea583cf8393cabe190396c1428391fde2246b880a481ac6150f350c00408bcde0f64fcf379010c9885a36c00f3124f6bbdc3f669e483929a90dff312d0000000000000000000000000000000000000000000000000000000000000000094e524300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
                    signature:
                      '24c67126d134e12de026295f0e92e22318bd9f0c454bab6eb2c629b8781c5a90533b253fa91e1c4b6f0c4bb409acb9b60aaf332d6c16e3d82c069f718e2c7e03',
                  },
                  {
                    id: `https://issuer.polygon.robotornot.mainnet-beta.rarimo.com/v1/claims/${claimId}/mtp`,
                    type: 'Iden3SparseMerkleTreeProof',
                    issuerData: {
                      id: 'did:iden3:readonly:tLd8sbb1xTSvi2wtRF4TUVcfDUr8ppYMohLqjhGQT',
                      updateUrl:
                        'https://issuer.polygon.robotornot.mainnet-beta.rarimo.com/v1/claims/a780d2fd-22ec-435e-8f05-eae04205c2d9/mtp',
                      state: {
                        txId: '0x4be69036944695559bffe8fafbb113d8d7b7497f616e220508f8db481ebeea90',
                        blockTimestamp: 1703689934,
                        blockNumber: 2706885,
                        rootOfRoots:
                          '00bc6e7d7a0fccfb06618ac1309d1c156da1b4ce76c3975b676171ab623a7923',
                        claimsTreeRoot:
                          '6f63784a2b3f91664dcb9ab8d66239bad0fc3f6679e78398a16d55abf36c4803',
                        revocationTreeRoot:
                          '0000000000000000000000000000000000000000000000000000000000000000',
                        value: '8676fb494b59f081f8dbc9ef1d0dab470553f393124f598af7cc24418bb51f13',
                      },
                    },
                    coreClaim:
                      '11d9dcf5ebe39bd8b48f0d9e2d8132142200000000000000000000000000000001001c6ea583cf8393cabe190396c1428391fde2246b880a481ac6150f350c00408bcde0f64fcf379010c9885a36c00f3124f6bbdc3f669e483929a90dff312d0000000000000000000000000000000000000000000000000000000000000000094e524300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
                    mtp: {
                      existence: true,
                      siblings: [
                        '17010377152295787254839147192723456178717024842623631635098729138057250157857',
                        '12924307196045514835805694216473888713984093662867270379704014977671451413733',
                        '13765287829368037334904404318011085970482157641299944550152516041284595059530',
                        '4053105853098359984576731540894779782443463526190358561995782139032844723698',
                        '15540039145788727156803576062336874679245346750303902320717021313597528296534',
                        '14898882455300258436710420051560762698440442210786728184710165011392858797788',
                        '8327390683815162909081363747977245175578535850347783814223021121903306972814',
                      ],
                    },
                  },
                ],
              },
            ],
            [] as W3CCredential[],
          ),
        ]
      }, [] as W3CCredential[]),
    ]
  }, [] as W3CCredential[])
}

export const DUMMY_VCS: W3CCredential[] = [
  ...FAKE_ORG_DETAILS.reduce((acc, org) => [...acc, ...createFakeVCs(org)], [] as W3CCredential[]),
]

export const DUMMY_ORG_GROUP_METADATAS: GroupedCredentials = {
  id: 'b0dc3814-e754-4596-a117-c4a07dfc65ef',
  type: 'grouped_credentials',
  grouped_credentials: FAKE_ORG_DETAILS.map(org => ({
    org_did: org.did,
    groups: org.groups.map(group => ({
      group_id: group.id,
      requests: group.requests.map(req => ({
        req_id: req.id,
        claim_ids: req.claim_ids,
        metadata: req.metadata,
      })),
    })),
  })),
}
