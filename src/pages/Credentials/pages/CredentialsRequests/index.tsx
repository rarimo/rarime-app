import { Card, CardActions, CardContent, Stack, StackProps, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { OrgGroupRequestStatuses, OrgGroupRequestWithClaims } from '@/api/modules/orgs'
import { PageTitles } from '@/common'
import { BusEvents, RoutePaths } from '@/enums'
import { bus } from '@/helpers'
import { UiButton, UiIcon } from '@/ui'

import { ClaimVCsModal, FillRequestFormDrawer } from './components'

type Props = StackProps

export default function CredentialsRequests({ ...rest }: Props) {
  const { t } = useTranslation()

  // TODO: implement backend once ready
  const [orgGroupRequests] = useState<OrgGroupRequestWithClaims[]>([])

  const [isFillFormDrawerShown, setIsFillFormDrawerShown] = useState(false)
  const [isClaimModalShown, setIsClaimModalShown] = useState(false)

  const [selectedOrgGroupRequest, setSelectedRequest] = useState<OrgGroupRequestWithClaims>()

  const handleRequestFilled = useCallback(() => {
    bus.emit(BusEvents.success, {
      message: 'Request successfully sent',
    })

    setIsFillFormDrawerShown(false)
  }, [])

  return (
    <Stack {...rest}>
      <Stack direction='row' alignItems='center' spacing={4}>
        <NavLink to={RoutePaths.CredentialsList}>
          <Stack direction='row' alignItems='center' spacing={2} color='secondary'>
            <UiIcon componentName='chevronLeft' size={5} />
            <Typography variant='buttonSmall' color='inherit'>
              Back
            </Typography>
          </Stack>
        </NavLink>

        <PageTitles title={t('credentials-requests.title')} />
      </Stack>

      {orgGroupRequests.map((orgGroupRequest, idx) => {
        return (
          <Card key={idx}>
            <CardContent>{orgGroupRequest.id}</CardContent>

            <CardActions>
              {orgGroupRequest.status.value === OrgGroupRequestStatuses.Created ? (
                <UiButton
                  onClick={() => {
                    setIsFillFormDrawerShown(true)
                    setSelectedRequest(orgGroupRequest)
                  }}
                >
                  Fill form
                </UiButton>
              ) : orgGroupRequest.status.value === OrgGroupRequestStatuses.Submitted ? (
                <UiButton
                  onClick={() => {
                    setIsClaimModalShown(true)
                    setSelectedRequest(orgGroupRequest)
                  }}
                >
                  Claim VCs
                </UiButton>
              ) : orgGroupRequest.status.value === OrgGroupRequestStatuses.Filled ? (
                <Typography>Wait for approval</Typography>
              ) : (
                <></>
              )}
            </CardActions>
          </Card>
        )
      })}

      <FillRequestFormDrawer
        orgGroupRequest={selectedOrgGroupRequest}
        onRequestFilled={handleRequestFilled}
        open={isFillFormDrawerShown}
        onClose={() => setIsFillFormDrawerShown(false)}
      />

      <ClaimVCsModal
        orgGroupRequest={selectedOrgGroupRequest}
        open={isClaimModalShown}
        onClose={() => setIsClaimModalShown(false)}
      />
    </Stack>
  )
}
