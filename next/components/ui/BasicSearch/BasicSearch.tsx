import { useUIContext } from '@bratislava/common-frontend-ui-context'
import Button from '../Button/Button'
import SearchIcon from '../../../assets/images/search-icon.svg'
import SearchIconSmallBlack from '../../../assets/images/search-icon-small-black.svg'
import SearchIconSmallWhite from '../../../assets/images/search-icon-small-white.svg'
import cx from 'classnames'

export interface BasicSearchProps {
  className?: string
  placeholder: string
  title: string
  buttonText: string
  collapse?: boolean
}

export const BasicSearch = ({ className, placeholder, title, buttonText, collapse }: BasicSearchProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div className={cx('flex flex-col w-full max-w-[730px]', className)}>
      <div className="text-sm lg:text-default font-medium pb-2 lg:pb-3 cc">{title}</div>
      <div className={cx('lg:flex', { hidden: !collapse }, { flex: collapse })}>
        <input
          id="name"
          type="text"
          className="h-12 lg:h-14 pl-6 w-full outline-none border-2 border-r-0 rounded-l-lg text-base text-font"
          placeholder={placeholder}
        />
        <UILink href="search">
          <Button
            icon={<SearchIcon className="scale-75" />}
            hoverIcon={<SearchIcon className="scale-75" />}
            className="h-14 rounded-l-none capitalize text-default px-6 shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
            variant="secondaryDarkText"
          >
            {buttonText}
          </Button>
        </UILink>
      </div>
      <div className={cx('lg:hidden gap-y-4', { 'flex flex-col': !collapse }, { hidden: collapse })}>
        <input
          id="name"
          type="text"
          className="h-12 lg:h-14 pl-6 w-full outline-none border-2 rounded-lg text-sm text-font font-medium"
          placeholder={placeholder}
        />
        <UILink href="search">
          <Button
            icon={<SearchIconSmallBlack />}
            hoverIcon={<SearchIconSmallWhite />}
            className="h-11 lg:h-14 text-base px-12 capitalize shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
            variant="secondaryDarkText"
          >
            {buttonText}
          </Button>
        </UILink>
      </div>
    </div>
  )
}
