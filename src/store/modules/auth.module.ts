import { createStore } from '@/helpers'

interface AuthState {
  jwt: string | undefined
}

const [authStore, useAuthState] = createStore(
  'auth',
  {
    jwt: undefined,
    isAuthorized: false,
  } as AuthState,
  state => ({
    setJwt: (jwt: string) => {
      state.jwt = jwt
    },
  }),
)

export { authStore, useAuthState }
