import { time } from '@distributedlab/tools'
import {
  Box,
  Button,
  Paper,
  Skeleton,
  Stack,
  StackProps,
  Typography,
  useTheme,
} from '@mui/material'
import isEmpty from 'lodash/isEmpty'
import { useMemo } from 'react'
import { generatePath, NavLink, useLocation } from 'react-router-dom'

import { getClaimIdFromVC } from '@/api/modules/zkp'
import { CreateCredentialMenu, CredentialCard, ErrorView, NoDataView } from '@/common'
import { Icons, RoutePaths } from '@/enums'
import { useLoading } from '@/hooks'
import { credentialsStore, useCredentialsState } from '@/store'
import { hiddenScrollbar } from '@/theme/constants'
import { UiIcon } from '@/ui'

const containerProps: StackProps = {
  direction: 'row',
  flexWrap: 'nowrap',
  overflow: 'auto',
  spacing: 6,
  borderRadius: 4,
  sx: hiddenScrollbar,
}

export default function LatestCredentials() {
  const location = useLocation()

  const { spacing } = useTheme()

  const { vcs, issuersDetails } = useCredentialsState()

  const { isLoading, isLoadingError, reload } = useLoading(
    undefined,
    () => credentialsStore.load(),
    {
      loadOnMount: !vcs.length,
    },
  )

  const lastVCsDesc = useMemo(
    () =>
      [...vcs]
        .sort((a, b) => (time(a.issuanceDate).isAfter(time(b.issuanceDate)) ? -1 : 1))
        .slice(0, 4),
    [vcs],
  )

  return (
    <Paper component={Stack} spacing={6}>
      {vcs.length > 0 && (
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='subtitle3'>Latest Credentials</Typography>

          <Button
            variant='text'
            size='medium'
            color='secondary'
            component={NavLink}
            to={RoutePaths.Credentials}
            state={{ from: location.pathname }}
          >
            View All
          </Button>
        </Stack>
      )}

      {isLoading ? (
        <Stack {...containerProps}>
          {Array.from({ length: 4 }, (_, i) => i).map(el => (
            <Skeleton
              key={el}
              component={Box}
              flex='0 0 auto'
              minWidth={spacing(80)}
              width={spacing(80)}
              height={spacing(45)}
              sx={{ transform: 'none' }}
            />
          ))}
        </Stack>
      ) : isLoadingError ? (
        <ErrorView
          title='Cannot load credentials'
          action={
            <Button
              size='medium'
              startIcon={<UiIcon name={Icons.ArrowCounterClockwise} size={4} />}
              onClick={reload}
            >
              Retry
            </Button>
          }
        />
      ) : !lastVCsDesc.length || isEmpty(issuersDetails) ? (
        <NoDataView title='No Credentials' action={<CreateCredentialMenu />} />
      ) : (
        <Stack {...containerProps}>
          {lastVCsDesc.map((vc, idx) => (
            <Box
              flex='0 0 auto'
              minWidth={spacing(80)}
              component={NavLink}
              key={idx}
              to={generatePath(RoutePaths.CredentialsId, {
                claimId: getClaimIdFromVC(vc),
              })}
              state={{
                from: location.pathname,
              }}
            >
              <CredentialCard vc={vc} issuerDetails={issuersDetails[vc.issuer]} />
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  )
}
