import { config } from '@config'
import { JsonApiClient } from '@distributedlab/jac'

export const api = new JsonApiClient({
  baseUrl: config.API_URL,
})
