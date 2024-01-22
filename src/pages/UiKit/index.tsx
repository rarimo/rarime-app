import UiKitButtons from '@/pages/UiKit/UiKitButtons'
import UiKitFields from '@/pages/UiKit/UiKitFields'
import UiKitOther from '@/pages/UiKit/UiKitOther'
import { UiTabs } from '@/ui'

export default function UiKit() {
  return (
    <UiTabs
      tabs={[
        { label: 'Buttons', content: <UiKitButtons /> },
        { label: 'Fields', content: <UiKitFields /> },
        { label: 'Other', content: <UiKitOther /> },
      ]}
    />
  )
}
