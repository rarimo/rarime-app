import { Box, Grid, Paper, Stack, StackProps } from '@mui/material'
import isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'react-i18next'
import { generatePath, NavLink } from 'react-router-dom'

import { getClaimIdFromVC } from '@/api/modules/zkp'
import { CredentialCard, NoDataViewer, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { credentialsStore, useCredentialsState } from '@/store'
import { UiButton } from '@/ui'

type Props = StackProps

export default function CredentialsList({ ...rest }: Props) {
  const { t } = useTranslation()

  const { vcs, issuersDetails } = useCredentialsState()

  return (
    <Stack {...rest}>
      <PageTitles title={t('credentials-list.title')} mb={6} />

      <Paper>
        {vcs.length && !isEmpty(issuersDetails) ? (
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
        ) : (
          <NoDataViewer
            title={'No Credentials'}
            action={<UiButton onClick={credentialsStore.load}>Load Credentials</UiButton>}
          />
        )}
      </Paper>
    </Stack>
  )
}
