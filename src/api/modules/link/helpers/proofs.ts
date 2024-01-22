import { api, type Proof, type ProofLink } from '@/api'
import { ApiServicePaths } from '@/enums/api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_PROOFS: Proof[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    type: 'proofs',
    creator: 'did:ethr:0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef',
    created_at: '2021-08-12T14:00:00Z',
    proof: '{"pub_signals":[...],"proof":{"pi_a":[...],"pi_b":[],"pi_c":[...]}}',
    proof_type: 'firstName',
    org_id: '550e8400-e29b-41d4-a716-446655440000',
    schema_url:
      'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    type: 'proofs',
    creator: 'did:ethr:0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef',
    created_at: '2021-08-12T14:00:00Z',
    proof: '{"pub_signals":[...],"proof":{"pi_a":[...],"pi_b":[],"pi_c":[...]}}',
    proof_type: 'lastName',
    org_id: '550e8400-e29b-41d4-a716-446655440000',
    schema_url:
      'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCCountryOfResidenceCredential-v4.json',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    type: 'proofs',
    creator: 'did:ethr:0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef',
    created_at: '2021-08-12T14:00:00Z',
    proof: '{"pub_signals":[...],"proof":{"pi_a":[...],"pi_b":[],"pi_c":[...]}}',
    proof_type: 'telegram',
    org_id: '550e8400-e29b-41d4-a716-446655440000',
    schema_url:
      'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json',
  },
]

export const createProof = async (proof: string) => {
  const { data } = await api.post<Proof>(`${ApiServicePaths.link}/v1/proofs`, {
    body: {
      data: {
        type: 'proofs',
        proof,
      },
    },
  })

  return data
}

export const getProofById = async (id: string) => {
  const { data } = await api.get<Proof>(`${ApiServicePaths.link}/v1/proofs/${id}`)

  return data
}

export const createLinkProofs = async (proofIds: string[]) => {
  const { data } = await api.post<ProofLink>(`${ApiServicePaths.link}/v1/proofs/link`, {
    body: {
      data: {
        proofs_ids: proofIds,
      },
    },
  })

  return data
}

export const getProofsByLinkId = async (linkId: string) => {
  const { data } = await api.get<Proof[]>(`${ApiServicePaths.link}/v1/proofs/link/${linkId}`)

  return data
}

export const getProofsByUserDid = async (userDid: string) => {
  const { data } = await api.get<Proof[]>(`${ApiServicePaths.link}/v1/proofs/user/${userDid}`)

  return data
}

export const getProofLinksByUserDid = async (userDid: string) => {
  const { data } = await api.get<ProofLink[]>(
    `${ApiServicePaths.link}/v1/proofs/user/${userDid}/link`,
  )

  return data
}
