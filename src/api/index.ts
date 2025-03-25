import { JsonApiClient } from '@distributedlab/jac'

import { config } from '@/config'

export const api = new JsonApiClient({
  baseUrl: config.API_URL,
  credentials: 'include',
})
