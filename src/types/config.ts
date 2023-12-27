import { SupportedChains, SupportedChainsDetails } from './chains'

export type BuildMode = 'production' | 'development'

export type Config = {
  MODE: BuildMode
  APP_NAME: string
  BUILD_VERSION: string
  SUPPORTED_CHAINS_DETAILS: SupportedChainsDetails
  DEFAULT_CHAIN: SupportedChains
  ROBOTORNOT_LINK: string
}
