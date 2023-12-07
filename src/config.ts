import FALLBACK_SUPPORTED_CHAINS from '@/assets/fallback-supported-chains.json'
import { Config, SupportedChainsDetails } from '@/types'

import packageJson from '../package.json'

const SUPPORTED_CHAINS_DETAILS: SupportedChainsDetails = {
  ...FALLBACK_SUPPORTED_CHAINS,
  ...JSON.parse(import.meta.env.VITE_SUPPORTED_CHAINS_DETAILS || '{}'),
}

export const config: Config = {
  MODE: import.meta.env.VITE_MODE,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_APP_BUILD_VERSION,
  SUPPORTED_CHAINS_DETAILS,
  DEFAULT_CHAIN: import.meta.env.VITE_DEFAULT_CHAIN,
  ROBOTORNOT_LINK: 'https://robotornot.mainnet-beta.rarimo.com/',
  CHROME_METAMASK_ADDON_LINK: 'https://chrome.google.com/webstore/detail/metamask/',
  FIREFOX_METAMASK_ADDON_LINK: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
  OPERA_METAMASK_ADDON_LINK: 'https://addons.opera.com/en/extensions/details/metamask-10/',
}
