import { Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { UiIcon } from '@/ui'

export default function About() {
  const { palette } = useTheme()
  const questionBlocks = [
    {
      question: 'How can I get this code?',
      answer:
        'You must be invited by someone or receive a code that we post on our social channels',
    },
    {
      question: 'Question title 2',
      answer:
        'You must be invited by someone or receive a code that we post on our social channels',
    },
    {
      question: 'Question title 3',
      answer:
        'You must be invited by someone or receive a code that we post on our social channels',
    },
  ]

  return (
    <Stack spacing={6}>
      <Button
        component={NavLink}
        to={RoutePaths.Rewards}
        variant='text'
        color='secondary'
        size='small'
        startIcon={<UiIcon componentName={'chevronLeft'} size={5} />}
        sx={{ width: 'fit-content' }}
      >
        Go back
      </Button>

      <Paper component={Stack} spacing={6} sx={{ py: 8 }}>
        <Typography variant='subtitle4' component='h1'>
          About Reward Program
        </Typography>
        <Stack spacing={8}>
          <Typography variant='body3' whiteSpace='pre-line'>
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            {'\n\n'}
            Content here, content here, making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as their default model
            text, and a search for lorem ipsum will uncover many web sites still in their infancy.
            Various versions have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like).
          </Typography>
          {questionBlocks.map(({ question, answer }, index) => (
            <Stack key={index} spacing={3}>
              <Typography variant='overline2' color={palette.text.secondary}>
                {question}
              </Typography>
              <Typography variant='body3'>{answer}</Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
