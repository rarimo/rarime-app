import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useLoading, useNestedRoutes } from '@/hooks'
import { credentialsStore } from '@/store'

import { CredentialsId, CredentialsList, CredentialsRequests } from './pages'

export default function Credentials() {
  const { isLoading } = useLoading(undefined, () => credentialsStore.load(), {
    loadOnMount: true,
  })

  // TODO: fix loading
  return useNestedRoutes(RoutePaths.Credentials, [
    {
      index: true,
      element: <Navigate replace to={RoutePaths.CredentialsList} />,
    },
    {
      path: RoutePaths.CredentialsList,
      element: isLoading ? <CredentialsList /> : <></>,
    },
    {
      path: RoutePaths.CredentialsRequests,
      element: isLoading ? <CredentialsRequests /> : <></>,
    },
    {
      path: RoutePaths.CredentialsId,
      element: isLoading ? <CredentialsId /> : <></>,
    },
    {
      path: '*',
      element: <Navigate replace to={RoutePaths.CredentialsList} />,
    },
  ])
}
