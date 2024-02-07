import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import { ComponentProps, useCallback, useMemo } from 'react'
import { generatePath, NavLink, useParams } from 'react-router-dom'

import { CredentialCard } from '@/common'
import { RoutePaths } from '@/enums'
import { ErrorHandler, getClaimId } from '@/helpers'
import { useMetamaskZkpSnapContext } from '@/hooks'
import { useCredentialsContext } from '@/pages/Credentials/contexts'
import { Transitions } from '@/theme/constants'
import { UiButton, UiIcon, UiPaper } from '@/ui'
import UiPopup from '@/ui/UiPopup'

function ActionButton({
  children,
  iconProps,
  ...rest
}: ComponentProps<typeof UiButton> & {
  iconProps: ComponentProps<typeof UiIcon>
}) {
  const { palette, spacing } = useTheme()

  return (
    <UiButton {...rest} variant='text'>
      <Stack
        alignItems='center'
        spacing={2}
        sx={{
          '&:hover': {
            '& .action-button__icon-wrp': {
              bgcolor: palette.additional.pureBlack,
            },
            '& .action-button__icon': {
              color: palette.primary.main,
            },
            '& .action-button__text': {},
          },
        }}
      >
        <Stack
          className='action-button__icon-wrp'
          width={spacing(10)}
          height={spacing(10)}
          justifyContent='center'
          alignItems='center'
          bgcolor={palette.background.paper}
          borderRadius={'50%'}
          sx={{
            transition: Transitions.Default,
          }}
        >
          <UiIcon
            className='action-button__icon'
            {...iconProps}
            size={5}
            sx={{
              transition: Transitions.Default,
            }}
          />
        </Stack>
        <Typography
          className='action-button__text'
          variant='buttonSmall'
          textAlign='center'
          width='min-content'
          sx={{
            transition: Transitions.Default,
          }}
        >
          {children}
        </Typography>
      </Stack>
    </UiButton>
  )
}

export default function CredentialsItem() {
  const { palette } = useTheme()

  const { claimId = '' } = useParams<{ claimId: string }>()

  const { vcs } = useCredentialsContext()

  const { removeVerifiableCredentials } = useMetamaskZkpSnapContext()

  const vc = useMemo(() => {
    return vcs.find(vc => getClaimId(vc.id) === claimId)
  }, [claimId, vcs])

  const requestRemoveVC = useCallback(async () => {
    if (!vc?.id) return

    try {
      await removeVerifiableCredentials({
        ids: [vc.id],
      })
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [removeVerifiableCredentials, vc])

  const isLastVC = useMemo(() => {
    if (!vc) return false

    const idx = vcs.findIndex(v => getClaimId(v.id) === getClaimId(vc.id))

    return idx === vcs.length - 1
  }, [vc, vcs])

  const isFirstVC = useMemo(() => {
    if (!vc) return false

    const idx = vcs.findIndex(v => getClaimId(v.id) === getClaimId(vc.id))

    return idx === 0
  }, [vc, vcs])

  const nextVC = useMemo(() => {
    if (!vc) return ''

    const idx = vcs.findIndex(v => getClaimId(v.id) === getClaimId(vc.id))

    const nextIdx = idx + 1

    if (nextIdx >= vcs.length) return ''

    return generatePath(RoutePaths.CredentialsItem, {
      claimId: getClaimId(vcs[nextIdx].id),
    })
  }, [vc, vcs])

  const prevVC = useMemo(() => {
    if (!vc) return ''

    const idx = vcs.findIndex(v => getClaimId(v.id) === getClaimId(vc.id))

    const prevIdx = idx - 1

    if (prevIdx < 0) return ''

    return generatePath(RoutePaths.CredentialsItem, {
      claimId: getClaimId(vcs[prevIdx].id),
    })
  }, [vc, vcs])

  if (!vc) return <></>

  return (
    <Stack spacing={6}>
      <Box component={NavLink} to={RoutePaths.CredentialsList} mb={8}>
        <Stack spacing={2} direction='row' alignItems='center'>
          <UiIcon componentName='chevronLeft' sx={{ color: palette.text.secondary }} size={5} />
          <Typography variant='buttonSmall' color={palette.text.secondary}>
            Back
          </Typography>
        </Stack>
      </Box>

      <UiPaper>
        <Stack spacing={6}>
          <Stack spacing={6} direction='row' alignItems='center'>
            <Box component={NavLink} to={prevVC} visibility={isFirstVC ? 'hidden' : 'visible'}>
              <UiIcon componentName='chevronLeft' size={5} sx={{ color: palette.text.secondary }} />
            </Box>

            <CredentialCard vc={vc} />

            <Box component={NavLink} to={nextVC} visibility={isLastVC ? 'hidden' : 'visible'}>
              <UiIcon
                componentName='chevronRight'
                size={5}
                sx={{ color: palette.text.secondary }}
              />
            </Box>
          </Stack>

          <Stack spacing={10} direction='row' justifyContent='center'>
            <ActionButton
              iconProps={{
                componentName: 'add',
              }}
            >
              Generate proof
            </ActionButton>
            <ActionButton
              iconProps={{
                componentName: 'infoOutlined',
              }}
            >
              Get info
            </ActionButton>

            <UiPopup
              trigger={
                <ActionButton
                  iconProps={{
                    componentName: 'moreHoriz',
                  }}
                >
                  More actions
                </ActionButton>
              }
              menuItems={[
                <UiButton
                  key={0} // FIXME
                  variant='text'
                  startIcon={<UiIcon componentName='deleteOutlined' />}
                  color='error'
                  onClick={requestRemoveVC}
                >
                  Remove Credential
                </UiButton>,
              ]}
            />
          </Stack>

          <Divider />
        </Stack>
      </UiPaper>
    </Stack>
  )
}
