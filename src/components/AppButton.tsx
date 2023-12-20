import { Button, type ButtonProps } from '@mui/material'

interface Props extends ButtonProps {}

const AppButton = ({ ...rest }: Props) => {
  return <Button {...rest} />
}

export default AppButton
