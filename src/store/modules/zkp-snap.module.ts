import {
  CheckCredentialExistenceRequestParams,
  type CreateProofRequestParams,
  enableSnap,
  isMetamaskInstalled as detectMetamaskInstalled,
  isSnapInstalled as detectSnapInstalled,
  type SaveCredentialsRequestParams,
  SaveCredentialsResponse,
  SnapConnector,
} from '@rarimo/rarime-connector'

import { createStore } from '@/helpers'

// TODO: remove once the method is available
type RemoveCredentialsRequestParams = {
  ids: string[]
}

type ZkpSnapState = {
  connector: SnapConnector | undefined

  isMetamaskInstalled: boolean
  isSnapInstalled: boolean

  userDid: string
  userDidBigIntString: string
}

const [zkpSnapStore, useZkpSnapState] = createStore(
  'credentials',
  {
    connector: undefined,

    isMetamaskInstalled: false,
    isSnapInstalled: false,

    userDid: '',
    userDidBigIntString: '',
  } as ZkpSnapState,
  state => ({
    /**
     * create identity and return did if it doesn't exist
     * or return the existing one
     */
    createIdentity: async () => {
      if (!state.connector) throw new TypeError('Connector is not defined')

      const identity = await state.connector.createIdentity()

      state.userDid = identity.identityIdString
      state.userDidBigIntString = identity.identityIdBigIntString

      return identity
    },

    /**
     * Save verifiable credentials by ClaimOffer.
     */
    saveVerifiableCredentials: async (params: SaveCredentialsRequestParams) => {
      if (!state.connector) throw new TypeError('Connector is not defined')

      return state.connector.saveCredentials?.(params)
    },

    removeVerifiableCredentials: async (params: RemoveCredentialsRequestParams) => {
      if (!state.connector) throw new TypeError('Connector is not defined')

      // FIXME: use connector, once the method is available
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          request: { method: 'remove_credentials', params },
          snapId: 'local:http://localhost:8081',
        },
      })
    },

    createProof: async (params: CreateProofRequestParams) => {
      if (!state.connector) throw new TypeError('Connector is not defined')

      return state.connector.createProof(params)
    },

    getCredentials: async () => {
      if (!state.connector) throw new TypeError('Connector is not defined')

      return state.connector.getCredentials?.()
    },

    connectOrInstallSnap: async () => {
      const snap = await enableSnap()
      state.connector = await snap.getConnector()

      return state.connector
    },

    checkSnapStatus: async () => {
      state.isMetamaskInstalled = await detectMetamaskInstalled()
      state.isSnapInstalled = await detectSnapInstalled()

      return {
        isMetamaskInstalled: state.isMetamaskInstalled,
        isSnapInstalled: state.isSnapInstalled,
      }
    },

    checkCredentialExistence: async (
      params: CheckCredentialExistenceRequestParams,
    ): Promise<SaveCredentialsResponse[] | undefined> => {
      if (!state.connector) throw new TypeError('Connector is not defined')

      return state.connector.checkCredentialExistence?.(params)
    },
  }),
)

export { useZkpSnapState, zkpSnapStore }
