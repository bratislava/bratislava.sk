import { useUIContext } from '@bratislava/common-frontend-ui-context'
import Button from '../Button/Button'
import { ReactComponent as SearchIcon } from '../../../assets/images/search-icon.svg'
import { ReactComponent as SearchIconSmallBlack } from '../../../assets/images/search-icon-small-black.svg'
import { ReactComponent as SearchIconSmallWhite } from '../../../assets/images/search-icon-small-white.svg'
import cx from 'classnames'

export interface BasicSearchProps {
  className?: string
}

export const BasicSearch = ({ className }: BasicSearchProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div className={cx('flex flex-col w-full', className)}>
      <div className="text-sm lg:text-md font-medium pb-3">Vyhľadávanie</div>
      <div className="hidden lg:flex">
        <input
          id="name"
          type="text"
          className="h-14 pl-6 w-full outline-none border-2 border-r-0 rounded-l-lg text-base text-font"
          placeholder="Zadajte kľúčové slovo"
        />
        <UILink href="search">
          <Button
            icon={<SearchIcon className="scale-75" />}
            hoverIcon={<SearchIcon className="scale-75" />}
            className="h-14 rounded-l-none text-default px-6 shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
            variant="secondaryDarkText"
          >
            Hľadať
          </Button>
        </UILink>
      </div>
      <div className="flex flex-col lg:hidden gap-y-6">
        <input
          id="name"
          type="text"
          className="h-14 pl-6 w-full outline-none border-2 rounded-lg text-sm text-font font-medium"
          placeholder="Zadajte kľúčové slovo"
        />
        <UILink href="search">
          <Button
            icon={<SearchIconSmallBlack />}
            hoverIcon={<SearchIconSmallWhite />}
            className="h-12 text-base px-14 shadow-none hover:bg-primary hover:text-white hover:color-white font-medium"
            variant="secondaryDarkText"
          >
            Hľadať
          </Button>
        </UILink>
      </div>
    </div>
  )
}
