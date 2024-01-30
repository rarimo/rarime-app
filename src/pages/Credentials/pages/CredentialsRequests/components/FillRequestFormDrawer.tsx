import { ComponentProps, useCallback, useMemo } from 'react'

import { OrgGroupRequest } from '@/api/modules/orgs'
import {
  getTargetProperty,
  loadAndParseCredentialSchema,
  ParsedCredentialSchemaProperty,
} from '@/api/modules/zkp'
import { FillRequestForm } from '@/common'
import { useLoading } from '@/hooks'
import { UiDrawer } from '@/ui'

type Props = ComponentProps<typeof UiDrawer> & {
  orgGroupRequest: OrgGroupRequest | undefined
  onRequestFilled?: () => void
}

export default function FillRequestFormDrawer({
  orgGroupRequest,
  onRequestFilled,
  ...rest
}: Props) {
  const getVcFields = useCallback(async () => {
    if (!orgGroupRequest) throw new TypeError('request params is not defined')

    return await Promise.all(
      orgGroupRequest.credential_requests.map(async req =>
        getTargetProperty(
          await loadAndParseCredentialSchema(req.credential_schema, req.credential_subject),
        ),
      ),
    )
  }, [orgGroupRequest])

  const {
    data: vcFields,
    isLoading,
    isLoadingError,
  } = useLoading<ParsedCredentialSchemaProperty[]>([], getVcFields, {
    loadOnMount: !!orgGroupRequest,
    loadArgs: [orgGroupRequest],
  })

  const drawerContent = useMemo(() => {
    if (isLoading) return <></>

    if (isLoadingError) return <></>

    if (!vcFields.length || !orgGroupRequest) return <></>

    return (
      <FillRequestForm
        onRequestFilled={onRequestFilled}
        orgGroupRequest={orgGroupRequest}
        credentialFields={vcFields}
      />
    )
  }, [isLoading, isLoadingError, onRequestFilled, orgGroupRequest, vcFields])

  return (
    <UiDrawer {...rest} anchor='right'>
      {drawerContent}
    </UiDrawer>
  )
}
