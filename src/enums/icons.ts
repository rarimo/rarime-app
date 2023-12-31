import { default as AccountCircleIcon } from '@mui/icons-material/AccountCircle'
import { default as Add } from '@mui/icons-material/Add'
import { default as AddPhotoAlternateOutlined } from '@mui/icons-material/AddPhotoAlternateOutlined'
import { default as CheckIcon } from '@mui/icons-material/Check'
import { default as DeleteIcon } from '@mui/icons-material/Delete'
import { default as ErrorOutlineIcon } from '@mui/icons-material/ErrorOutline'
import { default as InfoIcon } from '@mui/icons-material/Info'
import { default as KeyboardArrowDownOutlinedIcon } from '@mui/icons-material/KeyboardArrowDownOutlined'
import { default as Search } from '@mui/icons-material/Search'
import { default as WarningAmberIcon } from '@mui/icons-material/WarningAmber'
import { default as Work } from '@mui/icons-material/Work'

export enum Icons {
  Metamask = 'metamask',
  User = 'user',
  Wallet = 'wallet',
}

export const ICON_COMPONENTS = {
  accountCircle: AccountCircleIcon,
  delete: DeleteIcon,
  errorOutline: ErrorOutlineIcon,
  info: InfoIcon,
  warningAmber: WarningAmberIcon,
  check: CheckIcon,
  keyboardArrowDownOutlined: KeyboardArrowDownOutlinedIcon,
  work: Work,
  search: Search,
  add: Add,
  addPhotoAlternativeOutlined: AddPhotoAlternateOutlined,
}
