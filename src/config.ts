import packageJson from '../package.json'

export type Config = {
  APP_NAME: string
  APP_HOST_URL: string
  API_URL: string
  BUILD_VERSION: string
  APP_STORE_APP_LINK: string
  GOOGLE_PLAY_APP_LINK: string
  DEFERRED_DEEP_LINK: string
}

export const config: Config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  APP_HOST_URL: import.meta.env.VITE_APP_HOST_URL,
  API_URL: import.meta.env.VITE_API_URL,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_APP_BUILD_VERSION,
  APP_STORE_APP_LINK: 'https://apps.apple.com/app/rarime/id6503300598',
  GOOGLE_PLAY_APP_LINK: 'https://play.google.com/store/apps/details?id=com.rarilabs.rarime',
  DEFERRED_DEEP_LINK: 'https://rarime.onelink.me/Hwry/ref',
}
