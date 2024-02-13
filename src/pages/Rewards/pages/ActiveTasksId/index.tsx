import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import { parse } from 'marked'
import { useMemo } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { useEvent } from '@/api/modules/points'
import { RoutePaths } from '@/enums'
import { formatDateTime } from '@/helpers'
import { typography } from '@/theme/typography'
import { UiButton, UiIcon } from '@/ui'

export default function ActiveTasksId() {
  const { palette, spacing } = useTheme()

  const { id = '' } = useParams<{ id: string }>()
  const { event, isLoading, isLoadingError } = useEvent(id)

  const parsedDescription = useMemo(() => {
    return parse(event?.meta.static.description ?? '')
  }, [event?.meta.static.description])

  if (isLoading) return <></>
  if (isLoadingError) return <></>
  if (!event) return <></>

  return (
    <Stack spacing={6}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <UiButton
          component={NavLink}
          to={RoutePaths.Rewards}
          variant='text'
          color='secondary'
          size='small'
          startIcon={<UiIcon componentName={'chevronLeft'} size={5} />}
          sx={{ width: 'fit-content' }}
        >
          Active Tasks
        </UiButton>

        <UiButton
          variant='text'
          color='secondary'
          size='small'
          startIcon={<UiIcon componentName={'shareOutlined'} size={5} />}
          sx={{ width: 'fit-content' }}
        >
          Share
        </UiButton>
      </Stack>

      <Stack
        p={6}
        spacing={6}
        bgcolor={palette.background.light}
        border={1}
        borderColor={palette.additional.layerBorder}
        borderRadius={4}
      >
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Stack spacing={4}>
            <Typography variant='subtitle2'>{event.meta.static.title}</Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={4}>
              <Typography
                variant='subtitle4'
                px={2}
                py={1}
                borderRadius={12}
                bgcolor={palette.warning.light}
              >
                🎁 +{event.meta.static.reward}
              </Typography>
              {event.meta.static.expires_at && (
                <Typography variant='caption2' color={palette.text.secondary}>
                  Exp: {formatDateTime(event.meta.static.expires_at!)}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Box
            component='img'
            src={event.meta.static.image_url}
            sx={{
              bgcolor: palette.action.active,
              borderRadius: 2,
              objectFit: 'cover',
              width: spacing(21),
              height: spacing(21),
            }}
          />
        </Stack>
        <Divider />
        <Typography
          component={'div'}
          variant='body3'
          dangerouslySetInnerHTML={{ __html: parsedDescription }}
          sx={{
            '& p': {
              paddingTop: 0,
              paddingBottom: spacing(2),
            },
            '& ul': {
              paddingTop: 0,
              paddingLeft: spacing(4),
              paddingBottom: spacing(2),
            },
            '& li': typography.subtitle4,
          }}
        />
        {event.meta.static.action_url && (
          <UiButton
            component={'a'}
            href={event.meta.static.action_url}
            target='_blank'
            sx={{ width: spacing(40) }}
          >
            {"Let's Start"}
          </UiButton>
        )}
      </Stack>
    </Stack>
  )
}
