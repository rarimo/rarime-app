import { Button, type ButtonProps } from '@mui/material'

interface Props extends ButtonProps {}

export default function UiButton({ ...rest }: Props) {
  return <Button {...rest} />
}
