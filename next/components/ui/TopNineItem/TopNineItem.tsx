import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import ChevronRight from '../../../assets/images/chevron-right.svg'
import icon1 from './icons/elektronicke-sluzby.svg'
import icon5 from './icons/kampane-a-projekty.svg'
import icon8 from './icons/kontakty-a-uradne-hodiny.svg'
import icon2 from './icons/miestne-dane-a-poplatky.svg'
import icon4 from './icons/nahlasenie-podnetov.svg'
import icon7 from './icons/organizacna-struktura.svg'
import icon9 from './icons/pracovne-prilezitosti.svg'
import icon3 from './icons/prenajom-priestorov-pp.svg'
import icon6 from './icons/turistom-v-hlavnom-meste.svg'

const ICONS = {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
}

export type TopNineItemIcon = keyof typeof ICONS

export interface TopNineItemProps {
  className?: string
  icon: TopNineItemIcon
  title: string
  href: string
  linkTitle: string
}

export const TopNineItem = ({ className, icon, title, href, linkTitle }: TopNineItemProps) => {
  const IconComponent = ICONS[icon]
  const { Link: UILink } = useUIContext()
  return (
    <div className={cx('w-full flex-shrink-0 flex flex-col font-medium text-font xs:w-100', className)}>
      <div className="mb-8 lg:mb-3.5">
        <IconComponent className="h-20" />
      </div>
      <div className="text-sm font-semibold lg:text-md lg:font-medium leading-normal whitespace-pre-wrap w-full">
        {title}
      </div>
      <UILink className="flex text-font underline mt-6 space-x-5 items-center group cursor-pointer h-6" href={href}>
        <span className="font-semibold text-sm">{linkTitle}</span>
        <span className="group-hover:hidden">
          <ChevronRight />
        </span>
        <span className="hidden group-hover:block">
          <ArrowRight />
        </span>
      </UILink>
    </div>
  )
}

export default TopNineItem
