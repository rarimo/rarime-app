import type { CreateIdentityRequestParams } from '@rarimo/rarime-connector'

import { zkpSnap } from '@/api/clients'
import { createStore } from '@/helpers'

type IdentityState = {
  userDid: string
  userDidBigIntString: string
}

const [identityStore, useIdentityState] = createStore(
  'identity',
  {
    userDid: '',
    userDidBigIntString: '',
  } as IdentityState,
  state => ({
    createIdentity: async (params: CreateIdentityRequestParams) => {
      const { identityIdString, identityIdBigIntString } = await zkpSnap.createIdentity(params)

      state.userDid = identityIdString
      state.userDidBigIntString = identityIdBigIntString
    },
    getIdentity: async () => {
      const { identityIdString, identityIdBigIntString } = await zkpSnap.getIdentity()

      state.userDid = identityIdString
      state.userDidBigIntString = identityIdBigIntString
    },
  }),
  {
    isPersist: false,
  },
)

export { identityStore, useIdentityState }
