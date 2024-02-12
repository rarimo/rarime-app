import { zkpSnap } from '@/api/clients'
import { createStore } from '@/helpers'

type ZkpSnapState = {
  userDid: string
  userDidBigIntString: string
}

const [identityStore, useIdentityState] = createStore(
  'zkp-snap',
  {
    userDid: '',
    userDidBigIntString: '',
  } as ZkpSnapState,
  state => ({
    createIdentity: async () => {
      const { identityIdString, identityIdBigIntString } = await zkpSnap.createIdentity({})

      state.userDid = identityIdString
      state.userDidBigIntString = identityIdBigIntString
    },
  }),
)

export { identityStore, useIdentityState }
