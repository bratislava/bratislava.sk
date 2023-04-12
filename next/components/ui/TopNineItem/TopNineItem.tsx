import ArrowRight from '@assets/images/arrow-right.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import icon1 from './icons/elektronicke-sluzby.svg'
import icon5 from './icons/kampane-a-projekty.svg'
import icon8 from './icons/kontakty-a-uradne-hodiny.svg'
import icon2 from './icons/miestne-dane-a-poplatky.svg'
import icon4 from './icons/nahlasenie-podnetov.svg'
import icon7 from './icons/organizacna-struktura.svg'
import icon3 from './icons/parky-a-zahrady.svg'
import icon9 from './icons/pracovne-prilezitosti.svg'
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
    <div
      className={cx(
        'relative flex w-40 flex-shrink-0 flex-col font-medium text-font lg:w-full',
        className,
      )}
    >
      <div className="mb-6 lg:mb-3.5">
        <IconComponent className="h-20" />
      </div>
      <div className="text-h4 w-full whitespace-pre-wrap leading-normal lg:font-medium">
        {title}
      </div>
      <UILink
        className="group mt-6 flex h-6 cursor-pointer items-center space-x-5 text-font underline after:absolute after:inset-0"
        href={href}
      >
        <span className="text-p2-semibold">{linkTitle}</span>
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
