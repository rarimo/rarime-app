import { IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { config } from '@/config'
import { Icons } from '@/enums'
import { useCopyToClipboard } from '@/hooks'
import RewardChip from '@/pages/Rewards/components/RewardChip'
import { UiIcon } from '@/ui'

interface Props {
  index: number
  reward: number
  code?: string
  isUsed?: boolean
}

export default function ReferralLink({ code, index, reward, isUsed }: Props) {
  const { palette, spacing } = useTheme()
  const { copy, isCopied } = useCopyToClipboard()

  const invitationLinkUrl = useMemo(() => `${config.APP_HOST_URL}/r/${code}`, [code])
  const shortInvitationLink = useMemo(
    () => invitationLinkUrl.replace(/^https?:\/\//, ''),
    [invitationLinkUrl],
  )

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      spacing={4}
      bgcolor={isUsed ? 'transparent' : palette.action.active}
      px={4}
      py={3}
      border={1}
      borderColor={palette.action.active}
      borderRadius={2}
    >
      <Stack spacing={1}>
        <Typography
          variant='subtitle4'
          color={isUsed ? palette.text.secondary : palette.text.primary}
          sx={{ textDecoration: isUsed ? 'line-through' : 'none' }}
        >
          {'Link ' + (index + 1)}
        </Typography>
        <Typography variant='body4' color={isUsed ? palette.text.secondary : palette.success.dark}>
          {isUsed ? 'Already Used' : 'Active'}
        </Typography>
      </Stack>
      {isUsed ? (
        <RewardChip reward={reward} isFinished />
      ) : (
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={4}
          maxWidth={spacing(90)}
          width='100%'
          bgcolor={palette.background.paper}
          px={4}
          py={2.5}
          borderRadius={2}
        >
          <Typography variant='body3'>{shortInvitationLink}</Typography>
          <IconButton
            color={isCopied ? 'success' : 'secondary'}
            onClick={() => copy(invitationLinkUrl)}
          >
            <UiIcon name={isCopied ? Icons.Check : Icons.CopySimple} size={5} />
          </IconButton>
        </Stack>
      )}
    </Stack>
  )
}
