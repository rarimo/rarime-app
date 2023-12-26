import { createStore } from '@/helpers'

interface AuthState {
  jwt: string | undefined
  isAuthenticated: boolean
}

const [authStore, useAuthState] = createStore(
  'auth',
  {
    jwt: undefined,
    isAuthenticated: false,
  } as AuthState,
  state => ({
    setJwt: (jwt: string) => {
      state.jwt = jwt
      state.isAuthenticated = Boolean(jwt)
    },
  }),
)

export { authStore, useAuthState }
