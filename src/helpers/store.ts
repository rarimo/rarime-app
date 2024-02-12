import { proxy, subscribe, useSnapshot } from 'valtio'

type CreateStoreOpts = {
  isPersist: boolean
}

export const createStore = <S extends object, A>(
  storeName: string,
  initialState: S,
  actions: (state: S) => A,
  opts: CreateStoreOpts = {
    isPersist: true,
  },
): [Readonly<S> & A, () => S] => {
  const storageState = localStorage.getItem(storeName)

  let parsedStorageState: S = {} as S

  try {
    parsedStorageState = JSON.parse(storageState!)
  } catch (e) {
    /* empty */
  }

  const state = proxy<S>({
    ...initialState,
    ...parsedStorageState,
  })

  if (opts?.isPersist) {
    subscribe(state, () => {
      localStorage.setItem(storeName, JSON.stringify(state))
    })
  }

  return [Object.assign(state, actions(state)), () => useSnapshot(state) as S]
}
