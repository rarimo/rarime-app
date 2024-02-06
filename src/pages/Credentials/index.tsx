import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'
import { CredentialsContextProvider } from '@/pages/Credentials/contexts'

import { CredentialsItem, CredentialsList, CredentialsRequests } from './pages'

export default function Credentials() {
  return (
    <CredentialsContextProvider>
      {useNestedRoutes(RoutePaths.Credentials, [
        {
          index: true,
          element: <Navigate replace to={RoutePaths.CredentialsList} />,
        },
        {
          path: RoutePaths.CredentialsList,
          element: <CredentialsList />,
        },
        {
          path: RoutePaths.CredentialsRequests,
          element: <CredentialsRequests />,
        },
        {
          path: RoutePaths.CredentialsItem,
          element: <CredentialsItem />,
        },
        {
          path: '*',
          element: <Navigate replace to={RoutePaths.CredentialsList} />,
        },
      ])}
    </CredentialsContextProvider>
  )
}
