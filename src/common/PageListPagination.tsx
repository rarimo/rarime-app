import { Pagination, Stack, StackProps } from '@mui/material'

import { OrgsRequestPage } from '@/api'

interface Props extends StackProps {
  page: number
  count: number
  onChange: (page) => void
}

export default function PageListPagination({ page, count, onChange, ...rest }: Props) {
  return (
    <Stack alignItems='center' mt={6} {...rest}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, page) => onChange(page)}
        color={'primary'}
        hidePrevButton
        hideNextButton
      />
    </Stack>
  )
}
