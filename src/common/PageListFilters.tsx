import { Divider, Stack, StackProps } from '@mui/material'
import debounce from 'lodash/debounce'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { UiIcon, UiIconButton, UiNavTabs, UiSearchField } from '@/ui'

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
    <Stack {...rest} direction='row' alignItems='center' justifyContent='space-between' spacing={5}>
      {tabs && <UiNavTabs tabs={tabs} />}

      <Stack direction='row' alignItems='center' spacing={6}>
        <UiSearchField
          size='small'
          placeholder={t('page-list-filters.search-input-placeholder')}
          onChange={e => handleSearchInput(e.target.value)}
        />

        {/* TODO: add filters here */}
        <UiIconButton>
          <UiIcon componentName='tune' size={5} />
        </UiIconButton>

        {actionBar && (
          <>
            <Divider orientation='vertical' flexItem />
            {actionBar}
          </>
        )}
      </Stack>
    </Stack>
  )
}
