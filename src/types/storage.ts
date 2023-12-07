import { ThemeMode } from '@/enums'

import { SUPPORTED_PROVIDERS } from './web3'

export type UiStorageState = {
  viewportWidth: number
  themeMode?: ThemeMode
}

export type Web3StorageState = {
  providerType?: SUPPORTED_PROVIDERS
}
