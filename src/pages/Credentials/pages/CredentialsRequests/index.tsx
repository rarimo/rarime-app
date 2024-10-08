import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  StackProps,
  Typography,
} from '@mui/material'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { OrgGroupRequestStatuses, OrgGroupRequestWithClaims } from '@/api/modules/orgs'
import { BackLink, PageTitles } from '@/common'
import { BusEvents, RoutePaths } from '@/enums'
import { bus } from '@/helpers'

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
        <BackLink to={RoutePaths.Credentials} />
        <PageTitles title={t('credentials-requests.title')} />
      </Stack>

      {orgGroupRequests.map((orgGroupRequest, idx) => {
        return (
          <Card key={idx}>
            <CardContent>{orgGroupRequest.id}</CardContent>

            <CardActions>
              {orgGroupRequest.status.value === OrgGroupRequestStatuses.Created ? (
                <Button
                  onClick={() => {
                    setIsFillFormDrawerShown(true)
                    setSelectedRequest(orgGroupRequest)
                  }}
                >
                  Fill form
                </Button>
              ) : orgGroupRequest.status.value === OrgGroupRequestStatuses.Submitted ? (
                <Button
                  onClick={() => {
                    setIsClaimModalShown(true)
                    setSelectedRequest(orgGroupRequest)
                  }}
                >
                  Claim VCs
                </Button>
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
