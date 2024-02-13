import { time } from '@distributedlab/tools'
import { Alert, Box, Grid, Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import isEmpty from 'lodash/isEmpty'
import { useMemo } from 'react'
import { generatePath, NavLink, useLocation } from 'react-router-dom'

import { getClaimIdFromVC } from '@/api/modules/zkp'
import { CredentialCard, NoDataViewer, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useLoading } from '@/hooks'
import { credentialsStore, useCredentialsState } from '@/store'
import { UiButton } from '@/ui'

export default function Dashboard() {
  const location = useLocation()

  const { spacing, palette } = useTheme()

  const { vcs, issuersDetails } = useCredentialsState()

  const { isLoading, isLoadingError, reload } = useLoading(
    undefined,
    () => credentialsStore.load(),
    {
      loadOnMount: !vcs.length,
      loadArgs: [vcs],
    },
  )

  const lastVCsDesc = useMemo(
    () =>
      [...vcs]
        .sort((a, b) => (time(a.issuanceDate).isAfter(time(b.issuanceDate)) ? -1 : 1))
        .slice(0, 4),
    [vcs],
  )

  return (
    <Stack spacing={4}>
      <PageTitles title={'Dashboard'} mb={4} />

      <Paper>
        <Stack spacing={6}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='subtitle3'>{'Latest Credentials'}</Typography>

            <Box
              component={NavLink}
              to={RoutePaths.Credentials}
              state={{ from: location.pathname }}
            >
              <Typography variant='buttonMedium' color={palette.text.secondary}>
                View All
              </Typography>
            </Box>
          </Stack>

          {isLoading ? (
            <Grid container spacing={4}>
              <Box component={Grid} item xs={6}>
                <Skeleton height={360} />
              </Box>
              <Box component={Grid} item xs={6}>
                <Skeleton height={360} />
              </Box>
            </Grid>
          ) : isLoadingError ? (
            <Alert severity='error'>{`There's an error occurred, please, reload page`}</Alert>
          ) : !lastVCsDesc.length || isEmpty(issuersDetails) ? (
            <NoDataViewer
              title={'No Credentials'}
              action={<UiButton onClick={reload}>Load Credentials</UiButton>}
            />
          ) : (
            <Stack
              direction='row'
              flexWrap='nowrap'
              overflow='auto'
              spacing={6}
              borderRadius={4}
              sx={{
                /* Hide scrollbar for: */
                msOverflowStyle: 'none' /* IE and Edge */,
                scrollbarWidth: 'none' /* Firefox */,

                /* Chrome, Safari and Opera */
                [`&::-webkit-scrollbar`]: {
                  display: 'none',
                },
              }}
            >
              {lastVCsDesc.map((vc, idx) => (
                <Box
                  flex='0 0 auto'
                  minWidth={spacing(80)}
                  component={NavLink}
                  key={idx}
                  to={generatePath(RoutePaths.CredentialsId, {
                    claimId: getClaimIdFromVC(vc),
                  })}
                  state={{
                    from: location.pathname,
                  }}
                >
                  <CredentialCard vc={vc} issuerDetails={issuersDetails[vc.issuer]} />
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </Paper>
    </Stack>
  )
}
