import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'

// TODO: use links from org
const links = [
  {
    title: 'Facebook.com/rarimo',
    url: 'https://www.facebook.com',
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/5968/5968764.png',
  },
  {
    title: '@Rarimo_Protocol',
    url: 'https://www.instagram.com',
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/1384/1384063.png',
  },
  {
    title: '@Rarimo_Protocol',
    url: 'https://www.twitter.com',
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/5968/5968958.png',
  },
  {
    title: 'Rarimo.com',
    url: 'https://rarimo.com',
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/154/154843.png',
  },
]

export default function LinksBlock() {
  const { palette, spacing } = useTheme()

  return (
    <Stack border={1} borderColor={palette.divider} borderRadius={2} p={6} spacing={5}>
      <Typography variant='subtitle4'>Links</Typography>
      <Divider />

      <Stack direction={'row'} gap={4} flexWrap={'wrap'}>
        {links.length ? (
          links.map(link => (
            <Stack
              key={link.title}
              component={'a'}
              href={link.url}
              target={'_blank'}
              rel={'noreferrer noopener'}
              direction={'row'}
              alignItems={'center'}
              spacing={2}
              sx={{
                p: 2,
                borderRadius: 2,
                // TODO: fix colors
                bgcolor: palette.grey[100],
                transition: 'background-color 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: palette.grey[200],
                },
              }}
            >
              <Box
                component={'img'}
                src={link.iconUrl}
                alt={link.title}
                width={spacing(6)}
                height={spacing(6)}
                // TODO: remove after adding icon
                p={1}
              />
              <Typography variant='body3' color={palette.text.primary}>
                {link.title}
              </Typography>
            </Stack>
          ))
        ) : (
          <Typography variant='body3' color={palette.text.secondary}>
            No links yet
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
