import { Button, type ButtonProps } from '@mui/material'
import { ElementType } from 'react'

export default function UiButton<T extends ElementType>(props: ButtonProps<T>) {
  return <Button {...props} />
}
