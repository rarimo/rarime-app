import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Organization } from '@/api'
import { RoutePaths } from '@/enums'
import { ErrorHandler } from '@/helpers'
import { useStepper } from '@/hooks'
import { UiStepper } from '@/ui'

import { MetadataForm, VerifyForm } from './components'

export default function OrgNew() {
  const [draftedOrg, setDraftedOrg] = useState<Organization>()

  const navigate = useNavigate()

  const handleCreateOrg = useCallback(async (org: Organization, cb: () => void) => {
    try {
      setDraftedOrg(org)

      cb()
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [])

  const { steps, activeStep, activeComponent } = useStepper(
    ({ next }) => [
      {
        label: 'Details',
        content: (
          <MetadataForm
            formProps={{
              onSubmit: res => handleCreateOrg(res, next),
            }}
          />
        ),
      },
      {
        label: 'Verify',
        content: draftedOrg ? (
          <VerifyForm org={draftedOrg} onSubmit={() => navigate(RoutePaths.Orgs)} />
        ) : (
          <></>
        ),
      },
    ],
    draftedOrg ? 1 : 0,
  )

  return (
    <Stack flex={1}>
      <UiStepper steps={steps} activeStep={activeStep} />

      {activeComponent}
    </Stack>
  )
}
