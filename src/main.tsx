import '@/styles/index.scss'
import '@/locales'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { MetamaskZkpSnapContextProvider, Web3ProviderContextProvider } from '@/contexts'
import { AppRoutes } from '@/routes'

const root = createRoot(document.getElementById('root') as Element)

root.render(
  <StrictMode>
    <Web3ProviderContextProvider>
      <MetamaskZkpSnapContextProvider>
        <AppRoutes />
      </MetamaskZkpSnapContextProvider>
    </Web3ProviderContextProvider>
  </StrictMode>,
)
