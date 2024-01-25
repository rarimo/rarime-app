import { useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import { EmailVerification, FillRequest } from './pages'

export default function AcceptInvitation() {
  const location = useLocation()

  const rootRedirectPath = useMemo(
    () => `${RoutePaths.AcceptInvitationEmailVerification}${location.search}`,
    [location.search],
  )

  return useNestedRoutes(RoutePaths.AcceptInvitation, [
    {
      index: true,
      element: <Navigate replace to={rootRedirectPath} />,
    },
    {
      path: RoutePaths.AcceptInvitationEmailVerification,
      element: <EmailVerification />,
    },
    {
      path: RoutePaths.AcceptInvitationFillRequest,
      element: <FillRequest />,
    },
    {
      path: '*',
      element: <Navigate replace to={rootRedirectPath} />,
    },
  ])
}
