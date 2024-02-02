import { IconButton, type IconButtonProps } from '@mui/material'

interface Props extends IconButtonProps {}

export default function UiIconButton({ ...rest }: Props) {
  return (
    <IconButton
      sx={{
        borderRadius: '1000px',
        ...rest.sx,
      }}
      {...rest}
    />
  )
}
