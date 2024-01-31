import { Badge, Stack, StackProps } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useCredentialsContext } from '@/pages/Credentials/contexts'
import { UiIcon } from '@/ui'

type Props = StackProps

export default function CredentialsList({ ...rest }: Props) {
  const { t } = useTranslation()

  const { orgGroupRequests } = useCredentialsContext()

  return (
    <Stack {...rest}>
      <PageTitles title={t('credentials-list.title')} />
      <br />
      <NavLink to={RoutePaths.CredentialsRequests}>
        <Badge badgeContent={orgGroupRequests.length} color='secondary'>
          <UiIcon componentName={'notifications'} />
        </Badge>
      </NavLink>
    </Stack>
  )
}
