import '@/styles/index.scss'
import '@/locales'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { AppRoutes } from '@/routes'
import { store } from '@/store'

const root = createRoot(document.getElementById('root') as Element)

root.render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>,
)
