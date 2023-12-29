import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { Organization } from '@/api'
import { RoutePaths } from '@/enums'
import { ErrorHandler } from '@/helpers'
import { useStepper } from '@/hooks'
import { UiStepper } from '@/ui'

import { MetadataForm, VerifyForm } from './components'

export default function OrgsNew() {
  const [draftedOrg, setDraftedOrg] = useState<Organization>()

  const navigate = useNavigate()

  const handleOrgCreated = useCallback(async (org: Organization, cb: () => void) => {
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
        content: <MetadataForm onOrgCreated={org => handleOrgCreated(org, next)} />,
      },
      {
        label: 'Verify',
        content: draftedOrg ? (
          <VerifyForm
            org={draftedOrg}
            onSubmit={() =>
              navigate(
                generatePath(RoutePaths.OrgsId, {
                  id: draftedOrg.id,
                }),
              )
            }
          />
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
