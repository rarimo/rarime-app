export function isIos() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

export function isMobile() {
  return isIos() || isAndroid() || /webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent)
}
