import FALLBACK_SUPPORTED_CHAINS from '@/assets/fallback-supported-chains.json'
import { SupportedChains, SupportedChainsDetails } from '@/types'

import packageJson from '../package.json'

const SUPPORTED_CHAINS_DETAILS: SupportedChainsDetails = {
  ...FALLBACK_SUPPORTED_CHAINS,
  ...JSON.parse(import.meta.env.VITE_SUPPORTED_CHAINS_DETAILS || '{}'),
}

export type Config = {
  APP_NAME: string
  APP_HOST_URL: string
  API_URL: string
  VERIFICATOR_API_URL: string
  BUILD_VERSION: string
  SUPPORTED_CHAINS_DETAILS: SupportedChainsDetails
  DEFAULT_CHAIN: SupportedChains
  ROBOTORNOT_LINK: string
  SUPPORT_LINK: string
  APP_STORE_APP_LINK: string
  GOOGLE_PLAY_APP_LINK: string
  DEFERRED_DEEP_LINK: string
}

const FALLBACK_DEFAULT_CHAIN = Object.entries(FALLBACK_SUPPORTED_CHAINS)[0][0]

export const config: Config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  APP_HOST_URL: import.meta.env.VITE_APP_HOST_URL,
  API_URL: import.meta.env.VITE_API_URL,
  VERIFICATOR_API_URL: import.meta.env.VITE_VERIFICATOR_API_URL,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_APP_BUILD_VERSION,
  SUPPORTED_CHAINS_DETAILS,
  DEFAULT_CHAIN: import.meta.env.VITE_DEFAULT_CHAIN || FALLBACK_DEFAULT_CHAIN,
  ROBOTORNOT_LINK: 'https://robotornot.mainnet-beta.rarimo.com/',
  SUPPORT_LINK: 'https://rarime.com',
  APP_STORE_APP_LINK: 'https://apps.apple.com/app/rarime/id6503300598',
  GOOGLE_PLAY_APP_LINK: 'https://play.google.com/store/apps/details?id=com.rarilabs.rarime',
  DEFERRED_DEEP_LINK: 'https://rarime.onelink.me/Hwry/ref',
}
