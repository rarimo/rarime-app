import { Button, type ButtonProps } from '@mui/material'

interface Props extends ButtonProps {}

export default function UiButton({ ...rest }: Props) {
  return (
    <Button
      {...rest}
      sx={{
        ...rest.sx,
        minWidth: '48px',
        borderRadius: '1000px',
      }}
    />
  )
}
