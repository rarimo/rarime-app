import get from 'lodash/get'

const OTHER_BROWSER_METAMASK_LINK = 'https://metamask.io/download/'
const CHROME_METAMASK_ADDON_LINK =
  'https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
const FIREFOX_METAMASK_ADDON_LINK = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
const OPERA_METAMASK_ADDON_LINK = 'https://addons.opera.com/en/extensions/details/metamask-10/'

export function metamaskLink() {
  const browserExtensionsLinks = {
    chrome: CHROME_METAMASK_ADDON_LINK,
    opera: OPERA_METAMASK_ADDON_LINK,
    firefox: FIREFOX_METAMASK_ADDON_LINK,
  }

  // Get the user-agent string
  const userAgentString = navigator.userAgent

  let chromeAgent = userAgentString.indexOf('Chrome') > -1 ? 'chrome' : ''
  const firefoxAgent = userAgentString.indexOf('Firefox') > -1 ? 'firefox' : ''
  const operaAgent = userAgentString.indexOf('OP') > -1 ? 'opera' : ''

  // Discard Chrome since it also matches Opera
  if (chromeAgent && operaAgent) chromeAgent = ''

  const currentBrowser = chromeAgent || firefoxAgent || operaAgent || ''

  if (!currentBrowser) return OTHER_BROWSER_METAMASK_LINK

  return get(browserExtensionsLinks, currentBrowser, '')
}
