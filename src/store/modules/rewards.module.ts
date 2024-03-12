import { NotFoundError, UnauthorizedError } from '@distributedlab/jac'

import { authorizeUser } from '@/api/modules/auth'
import { Balance, getPointsBalance } from '@/api/modules/points'
import { createStore } from '@/helpers'

import { identityStore } from './identity.module'

type RewardsState = {
  balance: Balance | null
  isAuthorized: boolean
}

const [rewardsStore, useRewardsState] = createStore(
  'rewards',
  {
    balance: null,
    isAuthorized: false,
  } as RewardsState,
  state => ({
    loadBalance: async () => {
      try {
        const { data } = await getPointsBalance(identityStore.userDid)
        state.balance = data
        state.isAuthorized = true
      } catch (error) {
        state.balance = null
        if (error instanceof UnauthorizedError) {
          state.isAuthorized = false
          return
        }

        if (error instanceof NotFoundError) {
          state.isAuthorized = true
          return
        }

        throw error
      }
    },
    authorize: async () => {
      await authorizeUser({ userDid: identityStore.userDid })
      state.isAuthorized = true
    },
  }),
  { isPersist: false },
)

export { rewardsStore, useRewardsState }
