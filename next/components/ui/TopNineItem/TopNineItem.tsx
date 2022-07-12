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
import icon3old from './icons/prenajom-priestorov-pp.svg'
import icon3 from '@assets/images/Public-spaces.svg'
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
      <div className="w-full whitespace-pre-wrap text-sm font-semibold leading-normal lg:text-md lg:font-medium">
        {title}
      </div>
      <UILink className="group mt-6 flex h-6 cursor-pointer items-center space-x-5 text-font underline" href={href}>
        <span className="text-sm font-semibold">{linkTitle}</span>
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
