import { SkeletonProps, useTheme } from '@mui/material'

import { UiSkeleton } from '@/ui'

interface Props extends SkeletonProps {}

export default function ListCardSkeleton({ ...rest }: Props) {
  const { spacing } = useTheme()
  return (
    <UiSkeleton
      {...rest}
      variant='rounded'
      sx={{ borderRadius: 3, ...rest.sx }}
      height={spacing(60)}
    />
  )
}
