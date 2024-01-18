import { CreateProofRequestParams } from '@rarimo/rarime-connector/dist/types'

import { OrgUserRoles } from '@/api'
import { QueryOperators } from '@/api/modules/zkp'

export const buildAuthorizeRequest = ({
  providerAddress,
  isAdmin,
}: {
  providerAddress: string
  isAdmin: boolean
}): CreateProofRequestParams => {
  return {
    circuitId: 'credentialAtomicQueryMTPV2',
    accountAddress: providerAddress,
    issuerDid: 'config.issuerDid', // TODO: implement

    query: {
      allowedIssuers: ['*'],
      credentialSubject: {
        role: {
          // FIXME: how to other roles will work
          [QueryOperators.$eq]: isAdmin ? OrgUserRoles.Admin : OrgUserRoles.Undefined,
        },
      },
      type: ['VerifiableCredentials', 'Role'],
    },
  }
}
