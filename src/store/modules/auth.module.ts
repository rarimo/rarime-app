import { createStore } from '@/helpers'

interface AuthState {
  jwt: string
}

const [authStore, useAuthState] = createStore(
  'auth',
  {
    jwt: '',
  } as AuthState,
  state => ({
    setJwt: (jwt: string) => {
      state.jwt = jwt
    },
  }),
)

export { authStore, useAuthState }
