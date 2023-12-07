import { useContext } from 'react'

import { MetamaskZkpSnapContext } from '@/contexts'

export const useMetamaskZkpSnapContext = () => {
  const metamaskZkpSnapContext = useContext(MetamaskZkpSnapContext)

  return {
    ...metamaskZkpSnapContext,
  }
}
