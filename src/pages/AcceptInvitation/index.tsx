import { Navigate, useLocation } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import { EmailVerification, FillRequestForm } from './pages'

export default function AcceptInvitation() {
  const location = useLocation()

  return useNestedRoutes(RoutePaths.AcceptInvitation, [
    {
      index: true,
      element: (
        <Navigate
          replace
          to={`${RoutePaths.AcceptInvitationEmailVerification}${location.search}`}
        />
      ),
    },
    {
      path: RoutePaths.AcceptInvitationEmailVerification,
      element: <EmailVerification />,
    },
    {
      path: RoutePaths.AcceptInvitationFillRequest,
      element: <FillRequestForm />,
    },
  ])
}
