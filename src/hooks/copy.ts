import copy from 'copy-to-clipboard'
import { useState } from 'react'

import { sleep } from '@/helpers'

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
    throw new TypeError('Not copied')
  }

  return { copyToClipboard, isCopied }
}
