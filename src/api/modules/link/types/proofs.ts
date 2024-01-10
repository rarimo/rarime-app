export type Proof = {
  id: string
  type: 'proofs'
  creator: string
  created_at: string
  proof: string
  // TODO: check how type should behave
  // type: string
}

export type ProofLink = {
  id: string
  type: 'proofs'
  link: string
  created_at: string
}
