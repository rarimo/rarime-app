import {
  api,
  type Proof,
  type ProofLink,
} from '@/api'

export const createProof = async (proof: string) => {
  const { data } = await api.post<Proof>('/v1/proofs', {
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
  const { data } = await api.get<Proof>(`/v1/proofs/${id}`)

  return data
}

export const createLinkProofs = async (proofIds: string[]) => {
  const { data } = await api.post<ProofLink>('/v1/proofs/link', {
    body: {
      data: {
        proofs_ids: proofIds,
      },
    },
  })

  return data
}

export const getProofsByLinkId = async (linkId: string) => {
  const { data } = await api.get<Proof[]>(`/v1/proofs/link/${linkId}`)

  return data
}

export const getProofsByUserDid = async (userDid: string) => {
  const { data } = await api.get<Proof[]>(`/v1/proofs/user/${userDid}`)

  return data
}

export const getProofLinksByUserDid = async (userDid: string) => {
  const { data } = await api.get<ProofLink[]>(`/v1/proofs/user/${userDid}/link`)

  return data
}
