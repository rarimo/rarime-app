import { Menu, MenuItem } from '@mui/material'
import { createStyles, withStyles } from '@mui/styles'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { cloneElement, ComponentProps, ReactElement, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  trigger: ReactElement
  menuItems: ReactElement[]
} & Omit<Omit<ComponentProps<typeof PopupState>, 'children'>, 'variant'>

const styles = createStyles({
  // FIXME: not works
  paper: {
    padding: 0,
  },
})

function UiPopup({ trigger, menuItems, ...rest }: Props) {
  const popupId = useMemo(() => uuidv4(), [])

  return (
    <PopupState {...rest} popupId={popupId} variant='popover'>
      {popupState => (
        <>
          {cloneElement(trigger, bindTrigger(popupState))}

          <Menu {...bindMenu(popupState)}>
            {menuItems.map((menuItem, idx) => (
              <MenuItem key={idx} onClick={popupState.close}>
                {menuItem}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  )
}

export default withStyles(styles)(UiPopup)
