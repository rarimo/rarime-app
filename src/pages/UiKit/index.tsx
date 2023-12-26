import { Stack } from '@mui/material'

import UiKitButtons from '@/pages/UiKit/UiKitButtons'
import UiKitFields from '@/pages/UiKit/UiKitFields'
import UiKitOther from '@/pages/UiKit/UiKitOther'
import { UiTabs } from '@/ui'

export default function UiKit() {
  return (
    <Stack px={8} mt={40} width='100%' height='calc(100 * var(--vh, 1vh))' overflow='hidden'>
      <UiTabs
        tabs={[
          { label: 'BUTTONS', content: <UiKitButtons /> },
          { label: 'FIELDS', content: <UiKitFields /> },
          { label: 'OTHER', content: <UiKitOther /> },
        ]}
      />
    </Stack>
  )
}
