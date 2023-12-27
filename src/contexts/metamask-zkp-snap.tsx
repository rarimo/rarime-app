import {
  type CreateProofRequestParams,
  enableSnap,
  isMetamaskInstalled as detectMetamaskInstalled,
  isSnapInstalled as detectSnapInstalled,
  type SaveCredentialsRequestParams,
  type SnapConnector,
  type W3CCredential,
  type ZKPProofResponse,
} from '@rarimo/rarime-connector'
import { createContext, FC, HTMLAttributes, useCallback, useState } from 'react'

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

  createIdentity: () => Promise<{
    identityIdString: string
    identityIdBigIntString: string
  }>
  getVerifiableCredentials: (
    params: SaveCredentialsRequestParams,
  ) => Promise<W3CCredential[] | undefined>
  createProof: (params: CreateProofRequestParams) => Promise<ZKPProofResponse | undefined>
  checkMetamaskExists: () => Promise<boolean>
  checkSnapExists: () => Promise<boolean>
  checkSnapStatus: () => Promise<{
    isMetamaskInstalled: boolean
    isSnapInstalled: boolean
  }>

  connectOrInstallSnap: () => Promise<void>
  getCredentials: () => Promise<W3CCredential[]>
}

const CONTEXT_NOT_INITIALIZED_ERROR = new ReferenceError('MetamaskZkpSnapContext not initialized')

export const MetamaskZkpSnapContext = createContext<MetamaskZkpSnapContextValue>({
  isMetamaskInstalled: false,
  isSnapInstalled: false,

  isLocalSnap: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
  createIdentity: () => {
    throw CONTEXT_NOT_INITIALIZED_ERROR
  },
  getVerifiableCredentials: () => {
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
  const createIdentity = useCallback(async () => {
    if (!connector) throw new TypeError('Connector is not defined')
    const identity = await connector.createIdentity()
    setUserDid(identity.identityIdString)
    setUserDidBigIntString(identity.identityIdBigIntString)
    return identity
  }, [connector])

  /**
   * Get the verifiable credentials from the snap.
   */
  const getVerifiableCredentials = useCallback(
    async (params: SaveCredentialsRequestParams) => {
      if (!connector) throw new TypeError('Connector is not defined')

      return connector.saveCredentials?.(params)
    },
    [connector],
  )

  const createProof = useCallback(
    async (params: CreateProofRequestParams) => {
      if (!connector) throw new TypeError('Connector is not defined')

      return connector.createProof(params)
    },
    [connector],
  )

  const getCredentials = useCallback(async () => {
    if (!connector) throw new TypeError('Connector is not defined')

    return await connector.getCredentials()
  }, [connector])

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

  return (
    <MetamaskZkpSnapContext.Provider
      value={{
        isMetamaskInstalled,
        isSnapInstalled,
        userDid,
        userDidBigIntString,

        isLocalSnap,

        createIdentity,
        getVerifiableCredentials,
        createProof,

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
