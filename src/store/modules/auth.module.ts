import { AuthTokens } from '@/api/modules/auth'
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
    addToken: (authTokens: AuthTokens, orgId: string, groupId: string) => {
      state.tokens = [
        ...state.tokens,
        {
          orgId,
          groupId,
          accessToken: authTokens.accessToken.token,
          refreshToken: authTokens.refreshToken.token,
        },
      ]
    },
  }),
)

export { authStore, useAuthState }
