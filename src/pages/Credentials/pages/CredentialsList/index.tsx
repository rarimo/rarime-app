import { Box, Button, Grid, Paper, Skeleton, Stack, useTheme } from '@mui/material'
import isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'react-i18next'
import { generatePath, NavLink } from 'react-router-dom'

import { getClaimIdFromVC } from '@/api/modules/zkp'
import { CredentialCard, ErrorView, NoDataView, PageTitles } from '@/common'
import { Icons, RoutePaths } from '@/enums'
import { useLoading } from '@/hooks'
import { credentialsStore, useCredentialsState } from '@/store'
import { UiIcon } from '@/ui'

export default function CredentialsList() {
  const { t } = useTranslation()
  const { spacing } = useTheme()

  const { vcs, issuersDetails } = useCredentialsState()

  const { isLoading, isLoadingError, reload } = useLoading(
    undefined,
    () => credentialsStore.load(),
    {
      loadOnMount: !vcs.length,
    },
  )

  return (
    <Stack spacing={8}>
      <PageTitles title={t('credentials-list.title')} />

      <Paper>
        {isLoading ? (
          <Grid container spacing={4}>
            {[...Array(2)].map((_, idx) => (
              <Box key={idx} component={Grid} item xs={6}>
                <Skeleton height={spacing(49)} />
              </Box>
            ))}
          </Grid>
        ) : isLoadingError ? (
          <ErrorView
            title='Cannot load credentials'
            action={
              <Button
                size='medium'
                startIcon={<UiIcon name={Icons.ArrowCounterClockwise} size={4} />}
                onClick={reload}
              >
                Retry
              </Button>
            }
          />
        ) : !vcs.length || isEmpty(issuersDetails) ? (
          <NoDataView
            title='No Credentials'
            action={
              <Button size='medium' onClick={reload}>
                Load Credentials
              </Button>
            }
          />
        ) : (
          <Grid container spacing={4}>
            {vcs.map((vc, idx) => (
              <Grid key={idx} item xs={6}>
                <Box
                  component={NavLink}
                  key={idx}
                  to={generatePath(RoutePaths.CredentialsId, {
                    claimId: getClaimIdFromVC(vc),
                  })}
                >
                  <CredentialCard vc={vc} issuerDetails={issuersDetails[vc.issuer]} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Stack>
  )
}
