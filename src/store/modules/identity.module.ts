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
    createIdentity: async () => {
      const { identityIdString, identityIdBigIntString } = await zkpSnap.createIdentity({})

      state.userDid = identityIdString
      state.userDidBigIntString = identityIdBigIntString
    },
  }),
)

export { identityStore, useIdentityState }
