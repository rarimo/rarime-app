import FALLBACK_SUPPORTED_CHAINS from '@/assets/fallback-supported-chains.json'
import { SupportedChains, SupportedChainsDetails } from '@/types'

import packageJson from '../package.json'

const SUPPORTED_CHAINS_DETAILS: SupportedChainsDetails = {
  ...FALLBACK_SUPPORTED_CHAINS,
  ...JSON.parse(import.meta.env.VITE_SUPPORTED_CHAINS_DETAILS || '{}'),
}

export type Config = {
  APP_NAME: string
  API_URL: string
  BUILD_VERSION: string
  SUPPORTED_CHAINS_DETAILS: SupportedChainsDetails
  DEFAULT_CHAIN: SupportedChains
  ROBOTORNOT_LINK: string
}

const FALLBACK_DEFAULT_CHAIN = Object.entries(FALLBACK_SUPPORTED_CHAINS)[0][0]

export const config: Config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  API_URL: import.meta.env.VITE_API_URL,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_APP_BUILD_VERSION,
  SUPPORTED_CHAINS_DETAILS,
  DEFAULT_CHAIN: import.meta.env.VITE_DEFAULT_CHAIN || FALLBACK_DEFAULT_CHAIN,
  ROBOTORNOT_LINK: 'https://robotornot.mainnet-beta.rarimo.com/',
}
