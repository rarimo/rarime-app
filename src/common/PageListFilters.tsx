import { InputAdornment, Stack, StackProps } from '@mui/material'
import debounce from 'lodash/debounce'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { UiIcon, UiNavTabs, UiTextField } from '@/ui'

interface Props extends StackProps {
  tabs?: {
    label: string
    route: string
  }[]
  onSearchInput?: (value: string) => void
  actionBar?: ReactNode
}

export default function PageListFilters({ tabs, onSearchInput, actionBar, ...rest }: Props) {
  const { t } = useTranslation()

  const handleSearchInput = debounce((value: string) => onSearchInput?.(value), 500)

  return (
    <Stack {...rest} direction='row' alignItems='center' spacing={5}>
      {tabs && <UiNavTabs tabs={tabs} />}

      <UiTextField
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <UiIcon componentName='search' />
            </InputAdornment>
          ),
          // TODO: change color
          sx: { borderRadius: 25, borderColor: theme => theme.palette.grey[300] },
        }}
        placeholder={t('page-list-filters.search-input-placeholder')}
        onChange={e => handleSearchInput(e.target.value)}
        size={'small'}
      />

      <Stack flex={1}>{actionBar}</Stack>
    </Stack>
  )
}
