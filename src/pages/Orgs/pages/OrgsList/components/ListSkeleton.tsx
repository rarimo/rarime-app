import { Grid, Stack, useTheme } from '@mui/material'

import { UiSkeleton } from '@/ui'

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
            <UiSkeleton variant='rounded' sx={{ borderRadius: 3 }} height={spacing(60)} />
          </Grid>
        ))}
      </Grid>
      <Stack alignItems='center' mt={6}>
        <UiSkeleton variant='rounded' height={spacing(6)} width={spacing(80)} />
      </Stack>
    </>
  )
}
