import { Navigate, useLocation } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import { EmailVerification, FulfillRequestForm } from './pages'

export default function AcceptInvite() {
  const location = useLocation()

  return useNestedRoutes(RoutePaths.AcceptInvite, [
    {
      index: true,
      element: (
        <Navigate replace to={`${RoutePaths.AcceptInviteEmailVerification}${location.search}`} />
      ),
    },
    {
      path: RoutePaths.AcceptInviteEmailVerification,
      element: <EmailVerification />,
    },
    {
      path: RoutePaths.AcceptInviteFulfillRequest,
      element: <FulfillRequestForm />,
    },
  ])
}
