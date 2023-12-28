import { useContext } from 'react'

import { AuthContext } from '@/contexts'

export const useAuth = () => {
  const authContextValue = useContext(AuthContext)

  return {
    ...authContextValue,
  }
}
