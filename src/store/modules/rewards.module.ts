import { JsonApiResponse, NotFoundError, UnauthorizedError } from '@distributedlab/jac'

import { authorizeUser } from '@/api/modules/auth'
import { Balance, createPointsBalance, getPointsBalance } from '@/api/modules/points'
import { createStore } from '@/helpers'

import { identityStore } from './identity.module'

type RewardsState = {
  balance: Balance | null
}

const [rewardsStore, useRewardsState] = createStore(
  'rewards',
  {
    balance: null,
  } as RewardsState,
  state => ({
    loadBalance: async () => {
      let response: JsonApiResponse<Balance> | null = null
      try {
        response = await getPointsBalance(identityStore.userDid)
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          await authorizeUser({ userDid: identityStore.userDid })
          response = await getPointsBalance(identityStore.userDid)
        } else if (error instanceof NotFoundError) {
          response = await createPointsBalance(identityStore.userDid)
        } else {
          throw error
        }
      }

      state.balance = response?.data ?? null
    },
  }),
  { isPersist: false },
)

export { rewardsStore, useRewardsState }
