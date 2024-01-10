export type Proof = {
  id: string
  type: 'proofs'
  creator: string
  created_at: string
  proof: string
  // TODO: change to proper API type
  proof_type: string
  organization_id: string
}

export type ProofLink = {
  id: string
  type: 'proofs'
  link: string
  created_at: string
}
