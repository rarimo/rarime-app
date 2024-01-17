import { AuthTokens } from '@/api/modules/auth'
import { createStore } from '@/helpers'

interface AuthState {
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
    addToken: (tokens: AuthTokens, orgId: string, groupId: string) => {
      state.tokens = [
        ...state.tokens,
        {
          orgId,
          groupId,
          accessToken: tokens.accessToken.token,
          refreshToken: tokens.refreshToken.token,
        },
      ]
    },
  }),
)

export { authStore, useAuthState }
