import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import { CredentialsId, CredentialsList, CredentialsRequests } from './pages'

export default function Credentials() {
  return useNestedRoutes(RoutePaths.Credentials, [
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
      path: RoutePaths.CredentialsId,
      element: <CredentialsId />,
    },
    {
      path: '*',
      element: <Navigate replace to={RoutePaths.CredentialsList} />,
    },
  ])
}
