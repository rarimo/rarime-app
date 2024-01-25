export type Proof = {
  id: string
  type: 'proofs'
  creator: string
  created_at: string
  proof: string
  proof_type: string
  org_id: string
  schema_url: string
}

export type ProofLink = {
  id: string
  type: 'proofs'
  link: string
  created_at: string
}
