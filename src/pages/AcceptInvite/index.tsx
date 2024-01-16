import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import { EmailVerification, FulfillRequestForm } from './pages'

/**
 * if (!isAuthorized) navigate(login) ?from=invite
 *
 * then run acceptInvitation
 * subscribe to authRoleClaim
 * saveCredential
 * generate proof
 * get jwt from auth-svc
 * redirect to fulfilling form
 * @constructor
 */
export default function AcceptInvite() {
  console.log('here Accept')
  return useNestedRoutes(RoutePaths.AcceptInvite, [
    // {
    //   index: true,
    //   element: <Navigate replace to={RoutePaths.AcceptInviteEmailVerification} />,
    // },
    {
      index: true,
      // path: RoutePaths.AcceptInviteEmailVerification,
      element: <EmailVerification />,
    },
    {
      path: RoutePaths.AcceptInviteFulfillRequest,
      element: <FulfillRequestForm />,
      // loader: () => {
      // return !!jwt
      // },
    },
  ])
}
