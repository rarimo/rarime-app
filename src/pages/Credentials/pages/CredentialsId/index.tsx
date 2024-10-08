import { Box, Button, IconButton, Paper, Stack, useTheme } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { generatePath, NavLink, useParams } from 'react-router-dom'

import { zkpSnap } from '@/api/clients'
import { getClaimIdFromVC } from '@/api/modules/zkp'
import { BackLink, CredentialCard, NoDataView } from '@/common'
import { Icons, RoutePaths } from '@/enums'
import { ErrorHandler } from '@/helpers'
import ProofGenerationModal from '@/pages/Credentials/pages/CredentialsId/components/ProofGenerationModal'
import { useCredentialsState } from '@/store'
import { UiIcon } from '@/ui'

import { ActionButton } from './components'
import VcInfoModal from './components/VcInfoModal'

export default function CredentialsId() {
  const { spacing } = useTheme()
  const { claimId = '' } = useParams<{ claimId: string }>()
  const { vcs, issuersDetails } = useCredentialsState()

  const [isPending, setIsPending] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isProofGenModalOpen, setIsProofGenModalOpen] = useState(false)

  const vc = useMemo(() => {
    return vcs.find(vc => getClaimIdFromVC(vc) === claimId)
  }, [claimId, vcs])

  const vcIndex = useMemo(() => {
    if (!vc) return -1

    return vcs.indexOf(vc)
  }, [vc, vcs])

  const issuerDetails = useMemo(() => {
    if (!vc) return

    return issuersDetails?.[vc.issuer]
  }, [issuersDetails, vc])

  const requestRemoveVC = useCallback(async () => {
    if (!vc?.id) return

    setIsPending(true)

    try {
      await zkpSnap.removeCredentials({
        ids: [vc.id],
      })
    } catch (error) {
      ErrorHandler.process(error)
    }

    setIsPending(false)
  }, [vc])

  const isLastVC = useMemo(() => {
    return vcIndex === vcs.length - 1
  }, [vcIndex, vcs.length])

  const isFirstVC = useMemo(() => {
    return vcIndex === 0
  }, [vcIndex])

  const nextVCPath = useMemo(() => {
    const nextIdx = vcIndex + 1

    if (nextIdx >= vcs.length) return ''

    return generatePath(RoutePaths.CredentialsId, {
      claimId: getClaimIdFromVC(vcs[nextIdx]),
    })
  }, [vcIndex, vcs])

  const prevVCPath = useMemo(() => {
    const prevIdx = vcIndex - 1

    if (prevIdx < 0) return ''

    return generatePath(RoutePaths.CredentialsId, {
      claimId: getClaimIdFromVC(vcs[prevIdx]),
    })
  }, [vcIndex, vcs])

  return (
    <Stack spacing={6}>
      <BackLink to={RoutePaths.Credentials} />
      <Paper>
        {vc && issuerDetails ? (
          <Stack spacing={6}>
            <Stack spacing={6} direction='row' alignItems='center' alignSelf='center'>
              <IconButton
                component={NavLink}
                to={prevVCPath}
                color='secondary'
                sx={{ visibility: isFirstVC ? 'hidden' : 'visible', transitionProperty: 'color' }}
              >
                <UiIcon name={Icons.CaretLeft} size={5} />
              </IconButton>

              <Box width={spacing(100)}>
                <CredentialCard vc={vc} issuerDetails={issuerDetails} />
              </Box>

              <IconButton
                component={NavLink}
                to={nextVCPath}
                color='secondary'
                sx={{ visibility: isLastVC ? 'hidden' : 'visible', transitionProperty: 'color' }}
              >
                <UiIcon name={Icons.CaretRight} size={5} />
              </IconButton>
            </Stack>

            <Stack spacing={10} direction='row' justifyContent='center'>
              <ActionButton
                appearance='primary'
                icon={Icons.Plus}
                onClick={() => setIsProofGenModalOpen(true)}
              >
                Generate Proof
              </ActionButton>

              <ActionButton icon={Icons.Info} onClick={() => setIsInfoModalOpen(true)}>
                Get Info
              </ActionButton>

              <ActionButton
                appearance='danger'
                color='error'
                icon={Icons.TrashSimple}
                onClick={requestRemoveVC}
                disabled={isPending}
              >
                Remove Credential
              </ActionButton>

              <VcInfoModal
                open={isInfoModalOpen}
                vc={vc}
                onClose={() => setIsInfoModalOpen(false)}
              />

              <ProofGenerationModal
                vc={vc}
                open={isProofGenModalOpen}
                onClose={() => setIsProofGenModalOpen(false)}
              />
            </Stack>
          </Stack>
        ) : (
          <NoDataView
            title='Credential not found'
            action={
              <Button component={NavLink} to={RoutePaths.Credentials} size='medium'>
                View all credentials
              </Button>
            }
          />
        )}
      </Paper>
    </Stack>
  )
}
