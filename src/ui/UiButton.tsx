import { Button, type ButtonProps } from '@mui/material'
import { ElementType } from 'react'

type Props<T extends ElementType> = ButtonProps<T> & {
  component?: T
}

export default function UiButton<T extends ElementType = 'button'>(props: Props<T>) {
  return <Button {...props} />
}
