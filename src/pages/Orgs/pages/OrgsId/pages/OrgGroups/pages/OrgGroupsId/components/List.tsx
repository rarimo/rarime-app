import { Stack, StackProps } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

import {
  loadOrgGroupRequests,
  OrgGroupRequest,
  OrgGroupRequestFiltersMap,
  OrgGroupRequestStatuses,
} from '@/api'
import { useLoading } from '@/hooks'
import { UiDrawer } from '@/ui'

import ApprovedCard from './ApprovedCard'
import ApproveRequestForm from './ApproveRequestForm'
import ListItem from './ListItem'
import PublishingCard from './PublishingCard'
import RequestDetails from './RequestDetails'

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

  const drawerContent = useMemo(() => {
    if (!selectedOrgGroupRequest) return <></>

    return {
      [OrgGroupRequestStatuses.Created]: (
        <RequestDetails orgGroupRequest={selectedOrgGroupRequest} />
      ),
      [OrgGroupRequestStatuses.Accepted]: undefined,
      [OrgGroupRequestStatuses.Filled]: (
        <RequestDetails orgGroupRequest={selectedOrgGroupRequest}>
          <ApproveRequestForm
            orgGroupRequest={selectedOrgGroupRequest}
            onRequestApproved={handleRequestApproved}
            onRequestRejected={handleRequestRejected}
          />
        </RequestDetails>
      ),
      [OrgGroupRequestStatuses.Approved]: (
        <RequestDetails orgGroupRequest={selectedOrgGroupRequest}>
          <PublishingCard orgGroupRequest={selectedOrgGroupRequest} />
        </RequestDetails>
      ),
      [OrgGroupRequestStatuses.Rejected]: undefined,
      [OrgGroupRequestStatuses.Submitted]: (
        <RequestDetails orgGroupRequest={selectedOrgGroupRequest}>
          <ApprovedCard orgGroupRequest={selectedOrgGroupRequest} />
        </RequestDetails>
      ),
    }[selectedOrgGroupRequest.status.value]
  }, [handleRequestApproved, handleRequestRejected, selectedOrgGroupRequest])

  const handleRequestClick = useCallback((orgGroupRequest: OrgGroupRequest) => {
    setIsDrawerShown(true)
    setSelectedOrgGroupRequest(orgGroupRequest)
  }, [])

  return (
    <>
      <Stack {...rest} spacing={4} direction='row' flexWrap='wrap'>
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

            {drawerContent && (
              <UiDrawer
                open={isDrawerShown}
                header={'Member Details'}
                onClose={() => setIsDrawerShown(false)}
              >
                {drawerContent}
              </UiDrawer>
            )}
          </>
        )}
      </Stack>
    </>
  )
}
