import { useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { loadOrgGroupRequestById, OrgGroupRequest } from '@/api'
import { parseFillRequestDetailsSearchParams } from '@/api/modules/auth'
import {
  getTargetProperty,
  loadAndParseCredentialSchema,
  parsedCredentialSchemaProperty,
} from '@/api/modules/zkp'
import { BusEvents, RoutePaths } from '@/enums'
import { bus } from '@/helpers'
import { useLoading } from '@/hooks'

import { FillRequestForm } from './components'

export default function FillRequest() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const fillRequestDetails = useMemo(
    () => parseFillRequestDetailsSearchParams(searchParams),
    [searchParams],
  )

  const getRequestAndBuildFormFields = useCallback(async () => {
    if (!fillRequestDetails) throw new TypeError('request params is not defined')

    const orgGroupRequest = await loadOrgGroupRequestById(
      fillRequestDetails.orgId,
      fillRequestDetails.groupId,
      fillRequestDetails.reqId,
    )

    const vcFields = await Promise.all(
      orgGroupRequest.credential_requests.map(async req =>
        getTargetProperty(
          await loadAndParseCredentialSchema(req.credential_schema, req.credential_subject),
        ),
      ),
    )

    return {
      orgGroupRequest,
      vcFields,
    }
  }, [fillRequestDetails])

  const {
    data: { orgGroupRequest, vcFields },
    isLoading,
    isLoadingError,
  } = useLoading<{
    orgGroupRequest: OrgGroupRequest
    vcFields: parsedCredentialSchemaProperty[]
  }>(
    {
      orgGroupRequest: {} as OrgGroupRequest,
      vcFields: [],
    },
    getRequestAndBuildFormFields,
    {
      loadOnMount: !!fillRequestDetails,
      loadArgs: [fillRequestDetails],
    },
  )

  const handleRequestFilled = useCallback(() => {
    bus.emit(BusEvents.success, 'Request successfully sent')

    // TODO: change redirect to dashboard
    navigate(RoutePaths.Orgs)
  }, [navigate])

  if (isLoading) return <></>

  if (isLoadingError) return <></>

  return (
    <FillRequestForm
      onRequestFilled={handleRequestFilled}
      orgGroupRequest={orgGroupRequest}
      credentialFields={vcFields}
    />
  )
}
