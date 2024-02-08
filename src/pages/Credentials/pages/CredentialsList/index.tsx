import { Box, Stack, StackProps } from '@mui/material'
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

  const { vcs } = useCredentialsContext()

  return (
    <Stack {...rest}>
      <PageTitles title={t('credentials-list.title')} mb={6} />

      <UiPaper>
        {vcs.length ? (
          <Stack spacing={4} direction='row' flexWrap={'wrap'}>
            {vcs.map((vc, idx) => (
              <Box
                component={NavLink}
                key={idx}
                maxWidth={360}
                width={'100%'}
                to={generatePath(RoutePaths.CredentialsItem, {
                  claimId: getClaimId(vc.id),
                })}
              >
                <CredentialCard vc={vc} />
              </Box>
            ))}
          </Stack>
        ) : (
          <NoDataViewer title={'No Credentials'} />
        )}
      </UiPaper>
    </Stack>
  )
}
