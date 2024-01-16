import { Stack } from '@mui/material'

import UiKitButtons from '@/pages/UiKit/UiKitButtons'
import UiKitFields from '@/pages/UiKit/UiKitFields'
import UiKitOther from '@/pages/UiKit/UiKitOther'
import { vh } from '@/theme/helpers'
import { UiTabs } from '@/ui'

export default function UiKit() {
  return (
    <Stack px={8} mt={40} width='100%' height={vh(100)} overflow='hidden'>
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
