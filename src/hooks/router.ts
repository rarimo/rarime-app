import { generatePath, RouteObject, useRoutes } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { createDeepPath } from '@/helpers'

// HACK: reqact-router v6 doesn't support absolute paths in the nested routes
// Discussion: https://github.com/remix-run/react-router/discussions/9841
export const useNestedRoutes = (
  // FIXME: ideally here should be RoutePaths or 'generatePath' method which accepts RoutePaths only
  root: RoutePaths | ReturnType<typeof generatePath<RoutePaths>>,
  routes: RouteObject[],
) => {
  return useRoutes(
    routes.map(({ path, ...rest }) => ({
      path: path && createDeepPath(path.replace(root, '')),
      ...rest,
    })),
  )
}
