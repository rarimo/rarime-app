import { Stack, StackProps, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { generatePath, NavLink } from 'react-router-dom'

import { CredentialCard, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { getClaimId } from '@/helpers'
import { useCredentialsContext } from '@/pages/Credentials/contexts'

type Props = StackProps

export default function CredentialsList({ ...rest }: Props) {
  const { t } = useTranslation()
  const { palette } = useTheme()

  const { vcs } = useCredentialsContext()

  return (
    <Stack {...rest}>
      <PageTitles title={t('credentials-list.title')} />

      <Stack
        spacing={4}
        mt={6}
        bgcolor={palette.background.light}
        p={6}
        border={1}
        borderColor={palette.divider}
        borderRadius={4}
        direction='row'
        flexWrap={'wrap'}
        overflow='auto hidden'
      >
        {vcs.map((vc, idx) => (
          <NavLink
            key={idx}
            style={{
              maxWidth: 360,
              width: '100%',
            }}
            to={generatePath(RoutePaths.CredentialsItem, {
              claimId: getClaimId(vc.id),
            })}
          >
            <CredentialCard vc={vc} />
          </NavLink>
        ))}
      </Stack>
      {/*<NavLink to={RoutePaths.CredentialsRequests}>*/}
      {/*  <Badge badgeContent={orgGroupRequests.length} color='secondary'>*/}
      {/*    <UiIcon componentName={'notifications'} />*/}
      {/*  </Badge>*/}
      {/*</NavLink>*/}
    </Stack>
  )
}
