import { W3CCredential } from '@rarimo/rarime-connector'

import { zkpSnap } from '@/api/clients'
import { getIssuerDetails, IssuerDetails } from '@/api/modules/zkp'
import { createStore } from '@/helpers'

type CredentialsState = {
  vcs: W3CCredential[]
  issuersDetails: Record<string, IssuerDetails>
}

const [credentialsStore, useCredentialsState] = createStore(
  'credentials',
  {
    vcs: [],
    issuersDetails: {},
  } as CredentialsState,
  state => ({
    load: async () => {
      const vcs = await zkpSnap.getCredentials()

      const issuerDids = new Set(vcs.map(vc => vc.issuer))

      const issuersDetails = (
        await Promise.all([...issuerDids].map(issuerDid => getIssuerDetails(issuerDid)))
      ).reduce((acc, issuerDetails) => {
        acc[issuerDetails.did] = issuerDetails

        return acc
      }, {} as Record<string, IssuerDetails>)

      state.vcs = vcs
      state.issuersDetails = issuersDetails

      return {
        vcs,
        issuersDetails,
      }
    },
  }),
)

export { credentialsStore, useCredentialsState }
