import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'
import { CredentialsContextProvider } from '@/pages/Credentials/contexts'

import { CredentialsList, CredentialsRequests } from './pages'

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
          path: '*',
          element: <Navigate replace to={RoutePaths.CredentialsList} />,
        },
      ])}
    </CredentialsContextProvider>
  )
}
