import { JsonApiDefaultMeta } from '@distributedlab/jac'

import { Organization } from '@/api'

export type LoadListResponseType = {
  data: Organization[]
  meta: JsonApiDefaultMeta
}
