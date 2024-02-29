import { NotFoundError } from '@distributedlab/jac'

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
    limitedTasks: [],
    activeTasks: [],
  } as RewardsState,
  state => ({
    loadBalance: async () => {
      try {
        const { data } = await getPointsBalance(identityStore.userDid)
        state.balance = data
      } catch (error) {
        if (error instanceof NotFoundError) {
          const { data } = await createPointsBalance(identityStore.userDid)
          return data
        }

        throw error
      }
    },
  }),
  { isPersist: false },
)

export { rewardsStore, useRewardsState }
