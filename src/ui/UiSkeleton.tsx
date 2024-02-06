import { Skeleton, type SkeletonProps, useTheme } from '@mui/material'

interface Props extends SkeletonProps {}

export default function UiSkeleton({ ...rest }: Props) {
  const { palette } = useTheme()
  return <Skeleton {...rest} sx={{ bgcolor: palette.divider, ...rest.sx }} />
}
