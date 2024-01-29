import copy from 'copy-to-clipboard'
import { useState } from 'react'

import { BusEvents } from '@/enums'
import { bus, sleep } from '@/helpers'

export const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false)
  //Todo: migrate to navigator Api
  const copyToClipboard = async (value: string) => {
    if (copy(value)) {
      setIsCopied(true)
      await sleep(2000)
      setIsCopied(false)
      return
    }
    bus.emit(BusEvents.error, 'Not copied, please try again')
  }

  return { copyToClipboard, isCopied }
}
