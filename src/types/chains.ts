import { Chain } from '@distributedlab/w3p'

import FALLBACK_SUPPORTED_CHAINS from '@/assets/fallback-supported-chains.json'

export type SupportedChains = keyof typeof FALLBACK_SUPPORTED_CHAINS
export type SupportedChainsDetails = { [key in SupportedChains]: Chain }
