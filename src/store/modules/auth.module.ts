import { AuthTokensGroup } from '@/api/modules/auth'
import { createStore } from '@/helpers'

type AuthState = {
  tokens: {
    orgId: string
    groupId: string
    accessToken: string
    refreshToken: string
  }[]
}

const [authStore, useAuthState] = createStore(
  'auth',
  {
    tokens: [],
  } as AuthState,
  state => ({
    addTokensGroup: (authTokensGroup: AuthTokensGroup, orgId: string, groupId: string) => {
      state.tokens = [
        ...state.tokens,
        {
          orgId,
          groupId,
          accessToken: authTokensGroup.accessToken.token,
          refreshToken: authTokensGroup.refreshToken.token,
        },
      ]
    },
  }),
)

export { authStore, useAuthState }
