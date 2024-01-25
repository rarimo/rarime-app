export function toRem(value: number) {
  return `${value / 16}rem`
}

export function vh(value: number) {
  return `calc(var(--vh, 1vh) * ${value})`
}
