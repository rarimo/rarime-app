import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/store'
import { SUPPORTED_PROVIDERS, Web3StorageState } from '@/types'

import { web3Storage } from './storages'

export const web3InitialState: Web3StorageState = {
  providerType: undefined,
}

export const web3Slice = createSlice({
  name: 'web3',

  initialState: web3InitialState,

  reducers: {
    setProviderType: (state, action: PayloadAction<SUPPORTED_PROVIDERS | undefined>) => {
      if (!action.payload) return
      state.providerType = action.payload
      web3Storage.save(state)
    },

    clearWeb3Storage: state => {
      state.providerType = undefined
      web3Storage.clear()
    },
  },
})

export const { setProviderType, clearWeb3Storage } = web3Slice.actions

export const providerType = (state: RootState) => state.web3.providerType

export default web3Slice.reducer
