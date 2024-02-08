import { Box, Grid, Stack, StackProps } from '@mui/material'
import isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'react-i18next'
import { generatePath, NavLink } from 'react-router-dom'

import { CredentialCard, NoDataViewer, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { getClaimId } from '@/helpers'
import { useCredentialsContext } from '@/pages/Credentials/contexts'
import { UiPaper } from '@/ui'

type Props = StackProps

export default function CredentialsList({ ...rest }: Props) {
  const { t } = useTranslation()

  const { vcs, issuersDetails } = useCredentialsContext()

  return (
    <Stack {...rest}>
      <PageTitles title={t('credentials-list.title')} mb={6} />

      <UiPaper>
        {vcs.length && !isEmpty(issuersDetails) ? (
          <Grid container spacing={4}>
            {vcs.map((vc, idx) => (
              <Grid key={idx} item xs={6}>
                <Box
                  component={NavLink}
                  key={idx}
                  to={generatePath(RoutePaths.CredentialsItem, {
                    claimId: getClaimId(vc.id),
                  })}
                >
                  <CredentialCard vc={vc} issuerDetails={issuersDetails[vc.issuer]} />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoDataViewer title={'No Credentials'} />
        )}
      </UiPaper>
    </Stack>
  )
}
