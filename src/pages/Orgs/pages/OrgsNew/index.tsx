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
  const [draftOrg, setDraftOrg] = useState<Organization>()

  const navigate = useNavigate()

  const handleOrgCreated = useCallback(async (org: Organization, cb: () => void) => {
    try {
      setDraftOrg(org)

      cb()
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [])

  const { steps, activeStep, activeComponent } = useStepper(
    ({ nextStep }) => [
      {
        label: 'Details',
        content: <MetadataForm onOrgCreated={org => handleOrgCreated(org, nextStep)} />,
      },
      {
        label: 'Verify',
        content: draftOrg ? (
          <VerifyForm
            org={draftOrg}
            onSubmit={() =>
              navigate(
                generatePath(RoutePaths.OrgsId, {
                  id: draftOrg.id,
                }),
              )
            }
          />
        ) : (
          <></>
        ),
      },
    ],
    draftOrg ? 1 : 0,
  )

  return (
    <Stack flex={1}>
      <UiStepper steps={steps} activeStep={activeStep} />

      {activeComponent}
    </Stack>
  )
}
