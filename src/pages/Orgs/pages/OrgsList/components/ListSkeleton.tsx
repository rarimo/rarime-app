import { Grid, Skeleton, Stack, useTheme } from '@mui/material'

interface Props {
  cardsCount: number
}

export default function ListSkeleton({ cardsCount }: Props) {
  const { spacing } = useTheme()
  return (
    <>
      <Grid container spacing={6}>
        {Array.from({ length: cardsCount }).map((_, idx) => (
          <Grid key={idx} item xs={6}>
            <Skeleton height={spacing(60)} />
          </Grid>
        ))}
      </Grid>
      <Stack alignItems='center' mt={6}>
        <Skeleton height={spacing(6)} width={spacing(80)} />
      </Stack>
    </>
  )
}
