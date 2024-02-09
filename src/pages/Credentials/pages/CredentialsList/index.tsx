import { Alert, Box, Grid, Paper, Skeleton, Stack, StackProps } from '@mui/material'
import isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'react-i18next'
import { generatePath, NavLink } from 'react-router-dom'

import { getClaimIdFromVC } from '@/api/modules/zkp'
import { CredentialCard, NoDataView, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useLoading } from '@/hooks'
import { credentialsStore, useCredentialsState } from '@/store'
import { UiButton } from '@/ui'

type Props = StackProps

export default function CredentialsList({ ...rest }: Props) {
  const { t } = useTranslation()

  const { vcs, issuersDetails } = useCredentialsState()

  const { isLoading, isLoadingError, reload } = useLoading(
    undefined,
    () => credentialsStore.load(),
    {
      loadOnMount: !vcs.length,
      loadArgs: [vcs],
    },
  )

  return (
    <Stack {...rest}>
      <PageTitles title={t('credentials-list.title')} mb={6} />

      <Paper>
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
        ) : !vcs.length || isEmpty(issuersDetails) ? (
          <NoDataView
            title='No Credentials'
            action={<UiButton onClick={reload}>Load Credentials</UiButton>}
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
