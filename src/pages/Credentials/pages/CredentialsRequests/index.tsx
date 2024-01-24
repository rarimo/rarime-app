import { Stack, StackProps, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { UiIcon } from '@/ui'

type Props = StackProps

export default function CredentialsRequests({ ...rest }: Props) {
  const { t } = useTranslation()

  return (
    <Stack {...rest}>
      <NavLink to={RoutePaths.CredentialsList}>
        <Stack direction={'row'} alignItems={'center'} spacing={2} color={'secondary'}>
          <UiIcon componentName={'chevronLeft'} size={5} />
          <Typography variant={'buttonSmall'} color={'inherit'}>
            Back
          </Typography>
        </Stack>
      </NavLink>

      <PageTitles title={t('credentials-requests.title')} />
    </Stack>
  )
}
