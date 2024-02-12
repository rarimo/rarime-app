import { Typography } from '@mui/material'
import { ComponentProps, useCallback } from 'react'

import { zkpSnap } from '@/api/clients'
import { OrgGroupRequestWithClaims } from '@/api/modules/orgs'
import { getClaimOffer, getTargetProperty, loadAndParseCredentialSchema } from '@/api/modules/zkp'
import { ErrorHandler } from '@/helpers'
import { useLoading } from '@/hooks'
import { useIdentityState } from '@/store'
import { UiBasicModal, UiButton, UiIcon } from '@/ui'

type Props = ComponentProps<typeof UiBasicModal> & {
  orgGroupRequest: OrgGroupRequestWithClaims | undefined
}

export default function ClaimVCsModal({ orgGroupRequest, onClose, ...rest }: Props) {
  const { userDid } = useIdentityState()

  const {
    data: { claimOffers, vcFields },
  } = useLoading(
    {
      claimOffers: [],
      vcFields: [],
    },
    async () => {
      if (!orgGroupRequest) throw new TypeError('orgGroupRequest is not defined')

      const claimIds = orgGroupRequest.claims?.map(el => el.id)

      if (!claimIds?.length) throw new TypeError('claimIds is not defined')

      const [claimOffers, vcFields] = await Promise.all([
        Promise.all(claimIds.map(claimId => getClaimOffer(userDid, claimId))),
        Promise.all(
          orgGroupRequest.credential_requests.map(async req =>
            getTargetProperty(
              await loadAndParseCredentialSchema(req.credential_schema, req.credential_subject),
            ),
          ),
        ),
      ])

      return {
        claimOffers,
        vcFields,
      }
    },
    {
      loadOnMount: !!orgGroupRequest,
      loadArgs: [orgGroupRequest],
    },
  )

  const saveAllVerifiableCredentials = useCallback(() => {
    try {
      claimOffers.forEach(async claimOffer => {
        await zkpSnap.saveCredentials(claimOffer)
      })
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [claimOffers])

  return (
    <UiBasicModal
      {...rest}
      onClose={() => {
        /* empty */
      }}
    >
      {vcFields.map((field, idx) => (
        <Typography key={idx} variant={'body1'}>
          {/*TODO: add loader for each processing schema*/}
          {field.key}: <UiIcon componentName='check' />
        </Typography>
      ))}

      <UiButton onClick={saveAllVerifiableCredentials}>Claim</UiButton>
      <UiButton onClick={onClose}>Cancel</UiButton>
    </UiBasicModal>
  )
}
