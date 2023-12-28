import '@/styles/index.scss'
import '@/locales'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  AuthContextProvider,
  MetamaskZkpSnapContextProvider,
  Web3ProviderContextProvider,
} from '@/contexts'
import { AppRoutes } from '@/routes'

const root = createRoot(document.getElementById('root') as Element)

root.render(
  <StrictMode>
    <Web3ProviderContextProvider>
      <MetamaskZkpSnapContextProvider>
        <AuthContextProvider>
          <AppRoutes />
        </AuthContextProvider>
      </MetamaskZkpSnapContextProvider>
    </Web3ProviderContextProvider>
  </StrictMode>,
)
