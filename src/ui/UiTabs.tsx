import { Box, Stack, StackProps, Tab, Tabs } from '@mui/material'
import { ReactNode, SyntheticEvent, useCallback, useState } from 'react'

interface Props extends StackProps {
  tabs: {
    label: string
    content: ReactNode
  }[]
}

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

export default function UiTabs({ tabs, ...rest }: Props) {
  const [currentTab, setCurrentTab] = useState(0)

  const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }, [])

  return (
    <Stack {...rest}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleChange} aria-label='basic tabs example'>
          {tabs.map(({ label }, idx) => (
            <Tab key={idx} label={label} {...a11yProps(idx)} />
          ))}
        </Tabs>
      </Box>

      {tabs.map(({ content }, idx) => (
        <CustomTabPanel key={idx} value={currentTab} index={idx}>
          {content}
        </CustomTabPanel>
      ))}
    </Stack>
  )
}
