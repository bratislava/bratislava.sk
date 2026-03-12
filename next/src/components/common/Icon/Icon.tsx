import * as Icons from '@/src/assets/icons'
import cn from '@/src/utils/cn'

export const iconNameMap = {
  accessibility: 'AccessibilityIcon',
  add: 'AddIcon',
  'arrow-down': 'ArrowDownIcon',
  'arrow-down-small': 'ArrowDownSmallIcon',
  'arrow-left': 'ArrowLeftIcon',
  'arrow-right': 'ArrowRightIcon',
  'arrow-up': 'ArrowUpIcon',
  attachment: 'AttachmentIcon',
  bin: 'BinIcon',
  bus: 'BusIcon',
  calendar: 'CalendarIcon',
  camera: 'PhotoIcon',
  check: 'CheckIcon',
  'check-circle': 'CheckInCircleIcon',
  'chevron-down': 'ChevronDownIcon',
  'chevron-down-small': 'ChevronDownSmallIcon',
  'chevron-left': 'ChevronLeftIcon',
  'chevron-right': 'ChevronRightIcon',
  'chevron-up': 'ChevronUpIcon',
  'chevron-up-small': 'ChevronUpSmallIcon',
  'city-account': 'CityAccountIcon',
  'city-services': 'ServicesIcon',
  clear: 'RemoveIcon',
  clock: 'ClockIcon',
  close: 'CrossIcon',
  'close-circle': 'CrossInCircleIcon',
  copy: 'CopyIcon',
  directions: 'DirectionsIcon',
  submission: 'MySubmissionsIcon',
  document: 'DocumentIcon',
  download: 'DownloadIcon',
  edit: 'EditIcon',
  error: 'ErrorIcon',
  export: 'ExportIcon',
  eye: 'EyeIcon',
  'eye-hide': 'EyeHideIcon',
  filter: 'FilterIcon',
  'folder-open': 'FolderOpenIcon',
  help: 'HelpIcon',
  home: 'HomeIcon',
  hourglass: 'SandGlassIcon',
  'id-card': 'CardsAndIdsIcon',
  import: 'ImportIcon',
  'import-export': 'ConnectionIcon',
  info: 'InfoIcon',
  book: 'BookIcon',
  'live-chat': 'LiveChatIcon',
  lock: 'LockIcon',
  logout: 'LogoutIcon',
  mail: 'MailIcon',
  map: 'MapIcon',
  'menu-hamburger': 'HamburgerIcon',
  'menu-kebab': 'EllipsisIcon',
  'menu-meatballs': 'EllipsisVerticalIcon',
  minus: 'MinusIcon',
  'new-tab': 'NewTabIcon',
  'open-in-new': 'OpenInNewIcon',
  parking: 'ParkingIcon',
  payment: 'PaymentIcon',
  pdf: 'PdfIcon',
  phone: 'PhoneIcon',
  'phone-call': 'PhoneCallIcon',
  pin: 'PinIcon',
  referents: 'ReferentsIcon',
  speaker: 'SpeakerIcon',
  retry: 'RepeatIcon',
  save: 'SaveIcon',
  scan: 'ScanIcon',
  search: 'SearchIcon',
  send: 'SendIcon',
  settings: 'SettingsIcon',
  'share-outline': 'ShareOutlineIcon',
  upload: 'UploadIcon',
  user: 'ProfileIcon',
  warning: 'AlertIcon',
  web: 'WebIcon',
} satisfies Record<string, keyof typeof Icons>

export type IconName = keyof typeof iconNameMap

type IconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>

export type IconProps = {
  name: IconName
  className?: string
}

const Icon = ({ name, className }: IconProps) => {
  const IconComponent: IconType = Icons[iconNameMap[name]]

  return <IconComponent className={cn('shrink-0', className)} />
}

export default Icon
