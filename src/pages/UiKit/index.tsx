import { Box, Stack, Tab, Tabs } from '@mui/material'
import { ReactNode, SyntheticEvent, useState } from 'react'

import UiKitButtons from '@/pages/UiKit/UiKitButtons'
import UiKitFields from '@/pages/UiKit/UiKitFields'
import UiKitOther from '@/pages/UiKit/UiKitOther'

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function CustomTabPanel({
  children,
  value,
  index,
  ...rest
}: {
  children?: ReactNode
  index: number
  value: number
}) {
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      overflow='auto'
      height='100%'
      {...rest}
    >
      {value === index && <Box pt={4}>{children}</Box>}
    </Box>
  )
}

export default function UiKit() {
  const [currentTab, setCurrentTab] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <Stack px={8} mt={40} width='100%' height='calc(100 * var(--vh, 1vh))' overflow='hidden'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='BUTTONS' {...a11yProps(0)} />
          <Tab label='FIELDS' {...a11yProps(1)} />
          <Tab label='OTHER' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <UiKitButtons />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <UiKitFields />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={2}>
        <UiKitOther />
      </CustomTabPanel>
    </Stack>
  )
}
