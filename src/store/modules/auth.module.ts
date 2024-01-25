import { AuthTokensGroup } from '@/api/modules/auth'
import { createStore } from '@/helpers'

type AuthState = {
  tokens: {
    orgId: string
    groupId: string
    accessToken: string
    refreshToken: string
  }[]
  isConnected: boolean
}

const [authStore, useAuthState] = createStore(
  'auth',
  {
    tokens: [],
    isConnected: false,
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
    setIsConnected: (value: boolean) => {
      state.isConnected = value
    },
  }),
)

export { authStore, useAuthState }
