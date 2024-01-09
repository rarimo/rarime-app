import { Stack, StackProps, Typography } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

import {
  loadOrgGroupRequests,
  OrgGroupRequest,
  OrgGroupRequestFiltersMap,
  OrgGroupRequestStatuses,
} from '@/api'
import { useLoading } from '@/hooks'
import { UiButton, UiDrawer, UiIcon } from '@/ui'

import ApproveRequestForm from './ApproveRequestForm'
import ListItem from './ListItem'

interface Props extends StackProps {
  filter: OrgGroupRequestFiltersMap
}

export default function List({ filter, ...rest }: Props) {
  const [isDrawerShown, setIsDrawerShown] = useState(false)
  const [selectedOrgGroupRequest, setSelectedOrgGroupRequest] = useState<OrgGroupRequest>()

  // TODO: add pagination
  const loadList = useCallback(async () => {
    return loadOrgGroupRequests({ filter })
  }, [filter])

  const {
    data: orgGroupRequests,
    isLoading,
    isLoadingError,
    isEmpty,
    reload,
  } = useLoading<OrgGroupRequest[]>([], loadList, {
    loadOnMount: true,
  })

  const handleRequestApproved = useCallback(async () => {
    setIsDrawerShown(false)

    await reload()
  }, [reload])

  const handleRequestRejected = useCallback(async () => {
    setIsDrawerShown(false)

    await reload()
  }, [reload])

  const DrawerContent = useMemo(() => {
    if (!selectedOrgGroupRequest) return <></>

    return {
      [OrgGroupRequestStatuses.Created]: <></>,
      [OrgGroupRequestStatuses.Accepted]: <></>,
      [OrgGroupRequestStatuses.Filled]: (
        <ApproveRequestForm
          orgGroupRequest={selectedOrgGroupRequest}
          onRequestApproved={handleRequestApproved}
          onRequestRejected={handleRequestRejected}
        />
      ),
      [OrgGroupRequestStatuses.Approved]: <></>,
      [OrgGroupRequestStatuses.Rejected]: <></>,
      [OrgGroupRequestStatuses.Submitted]: <></>,
    }[selectedOrgGroupRequest.status.value]
  }, [handleRequestApproved, selectedOrgGroupRequest])

  const handleRequestClick = useCallback((orgGroupRequest: OrgGroupRequest) => {
    setIsDrawerShown(true)
    setSelectedOrgGroupRequest(orgGroupRequest)
  }, [])

  return (
    <>
      <Stack {...rest} gap={4} direction='row' flexWrap='wrap'>
        {isLoading ? (
          <></>
        ) : isLoadingError ? (
          <></>
        ) : isEmpty ? (
          <></>
        ) : (
          <>
            {orgGroupRequests.map((el, idx) => (
              <ListItem orgGroupRequest={el} key={idx} onClick={() => handleRequestClick(el)} />
            ))}

            <UiDrawer open={isDrawerShown} onClose={() => setIsDrawerShown(false)} anchor='right'>
              <Stack>
                <Stack direction='row' alignItems='center' justifyContent='space-between' p={5}>
                  <Typography>Member Details</Typography>

                  <UiButton variant={`text`} onClick={() => setIsDrawerShown(false)}>
                    <UiIcon componentName='close' />
                  </UiButton>
                </Stack>
                {DrawerContent}
              </Stack>
            </UiDrawer>
          </>
        )}
      </Stack>
    </>
  )
}
