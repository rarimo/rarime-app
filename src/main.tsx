import '@/locales'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Web3ProviderContextProvider } from '@/contexts'

import App from './App'

const root = createRoot(document.getElementById('root') as Element)

root.render(
  <StrictMode>
    <Web3ProviderContextProvider>
      <App />
    </Web3ProviderContextProvider>
  </StrictMode>,
)
