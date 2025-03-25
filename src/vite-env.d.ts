/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string
  VITE_APP_BUILD_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
