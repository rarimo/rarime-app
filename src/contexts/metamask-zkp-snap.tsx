import {
  CheckCredentialExistenceRequestParams,
  type CreateProofRequestParams,
  enableSnap,
  isMetamaskInstalled as detectMetamaskInstalled,
  isSnapInstalled as detectSnapInstalled,
  type SaveCredentialsRequestParams,
  SaveCredentialsResponse,
  type SnapConnector,
  W3CCredential,
  type ZKPProofResponse,
} from '@rarimo/rarime-connector'
import { createContext, FC, HTMLAttributes, useCallback, useState } from 'react'

import { DUMMY_VCS } from '@/api/modules/orgs/mocks'

/**
 * The snap origin to use.
 * Will default to the local hosted snap if no value is provided in the environment.
 */

interface MetamaskZkpSnapContextValue {
  isMetamaskInstalled: boolean
  isSnapInstalled: boolean

  userDid: string
  userDidBigIntString: string

  isLocalSnap: (snapId: string) => boolean

  createIdentity: (connector?: SnapConnector) => Promise<{
    identityIdString: string
    identityIdBigIntString: string
  }>
  saveVerifiableCredentials: (
    params: SaveCredentialsRequestParams,
  ) => Promise<SaveCredentialsResponse[] | undefined>
  createProof: (params: CreateProofRequestParams) => Promise<ZKPProofResponse | undefined>
  checkMetamaskExists: () => Promise<boolean>
  checkSnapExists: () => Promise<boolean>
  checkSnapStatus: () => Promise<{
    isMetamaskInstalled: boolean
    isSnapInstalled: boolean
  }>
  checkCredentialExistence: (
    params: CheckCredentialExistenceRequestParams,
  ) => Promise<SaveCredentialsResponse[] | undefined>

  connectOrInstallSnap: () => Promise<SnapConnector>
  getCredentials: (connector?: SnapConnector) => Promise<W3CCredential[]>
}

const CONTEXT_NOT_INITIALIZED_ERROR = new ReferenceError('MetamaskZkpSnapContext not initialized')

export const MetamaskZkpSnapContext = createContext<MetamaskZkpSnapContextValue>({
  isMetamaskInstalled: false,
  isSnapInstalled: false,

  userDid: '',
  userDidBigIntString: '',

  isLocalSnap: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },

  createIdentity: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
  saveVerifiableCredentials: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
  createProof: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
  checkMetamaskExists: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
  checkSnapExists: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
  checkSnapStatus: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
  checkCredentialExistence: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },

  connectOrInstallSnap: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
  getCredentials: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
})

export const MetamaskZkpSnapContextProvider: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const [connector, setConnector] = useState<SnapConnector>()

  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)
  const [isSnapInstalled, setIsSnapInstalled] = useState(false)

  const [userDid, setUserDid] = useState('')
  const [userDidBigIntString, setUserDidBigIntString] = useState('')

  const isLocalSnap = useCallback((snapId: string) => snapId.startsWith('local:'), [])

  /**
   * create identity and return did if it doesn't exist
   * or return the existing one
   */
  const createIdentity = useCallback(
    async (_connector?: SnapConnector) => {
      const currentConnector = _connector || connector

      if (!currentConnector) throw new TypeError('Connector is not defined')

      const identity = await currentConnector.createIdentity()

      setUserDid(identity.identityIdString)
      setUserDidBigIntString(identity.identityIdBigIntString)

      return identity
    },
    [connector],
  )

  /**
   * Get the verifiable credentials from the snap.
   */
  const saveVerifiableCredentials = useCallback(
    async (params: SaveCredentialsRequestParams, _connector?: SnapConnector) => {
      const currentConnector = _connector || connector

      if (!currentConnector) throw new TypeError('Connector is not defined')

      return currentConnector.saveCredentials?.(params)
    },
    [connector],
  )

  const createProof = useCallback(
    async (params: CreateProofRequestParams, _connector?: SnapConnector) => {
      const currentConnector = _connector || connector

      if (!currentConnector) throw new TypeError('Connector is not defined')

      return currentConnector.createProof(params)
    },
    [connector],
  )

  const getCredentials = useCallback(
    async (_connector?: SnapConnector) => {
      const currentConnector = _connector || connector

      if (!currentConnector) throw new TypeError('Connector is not defined')

      // return currentConnector?.getCredentials?.()
      return DUMMY_VCS // TODO: remove
    },
    [connector],
  )

  const checkMetamaskExists = useCallback(async () => {
    const _isMetamaskInstalled = await detectMetamaskInstalled()

    setIsMetamaskInstalled(_isMetamaskInstalled)

    return _isMetamaskInstalled
  }, [])

  const checkSnapExists = useCallback(async () => {
    const _isSnapInstalled = await detectSnapInstalled()

    setIsSnapInstalled(_isSnapInstalled)

    return _isSnapInstalled
  }, [])

  const connectOrInstallSnap = useCallback(async () => {
    const snap = await enableSnap()
    const connector = await snap.getConnector()

    setConnector(connector)

    return connector
  }, [])

  const checkSnapStatus = useCallback(async () => {
    const _isMetamaskInstalled = await checkMetamaskExists()
    const _isSnapInstalled = await checkSnapExists()

    setIsMetamaskInstalled(_isMetamaskInstalled)
    setIsSnapInstalled(_isSnapInstalled)

    return {
      isMetamaskInstalled: _isMetamaskInstalled,
      isSnapInstalled: _isSnapInstalled,
    }
  }, [checkMetamaskExists, checkSnapExists])

  const checkCredentialExistence = useCallback(
    async (
      params: CheckCredentialExistenceRequestParams,
    ): Promise<SaveCredentialsResponse[] | undefined> => {
      return connector?.checkCredentialExistence?.(params)
    },
    [connector],
  )

  return (
    <MetamaskZkpSnapContext.Provider
      value={{
        isMetamaskInstalled,
        isSnapInstalled,

        userDid,
        userDidBigIntString,

        isLocalSnap,

        createIdentity,
        saveVerifiableCredentials,
        createProof,
        checkCredentialExistence,

        checkMetamaskExists,
        checkSnapExists,
        checkSnapStatus,

        getCredentials,
        connectOrInstallSnap,
      }}
    >
      {children}
    </MetamaskZkpSnapContext.Provider>
  )
}
