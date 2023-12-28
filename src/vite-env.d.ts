/// <reference types="vite/client" />

import { BuildMode, SupportedChains } from '@/types'

interface ImportMetaEnv {
  VITE_MODE: BuildMode
  VITE_API_URL: string
  VITE_PORT: string
  VITE_APP_NAME: string
  VITE_APP_BUILD_VERSION: string
  VITE_DEFAULT_CHAIN: SupportedChains
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
