import copy from 'copy-to-clipboard'
import { useState } from 'react'

import { BusEvents } from '@/enums'
import { bus } from '@/helpers'

interface Props {
  userDid: string
}

export const useCopy = ({ userDid }: Props) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyToClipboard = () => {
    if (copy(userDid)) {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
      return
    }
    bus.emit(BusEvents.error, 'Not copied, please try again')
  }

  return { copyToClipboard, isCopied }
}
