import { useUIContext } from '@bratislava/common-frontend-ui-context'

import ChevronRight from '../../../assets/images/chevron-right-large.svg'
import PageBlueIcon from '../../../assets/images/page-blue-icon.svg'
import PageBlueIconSmall from '../../../assets/images/page-blue-icon-small.svg'
import PageBrownIcon from '../../../assets/images/page-brown-icon.svg'
import PageBrownIconSmall from '../../../assets/images/page-brown-icon-small.svg'
import PageGreenIcon from '../../../assets/images/page-green-icon.svg'
import PageGreenIconSmall from '../../../assets/images/page-green-icon-small.svg'
import PagePurpleIcon from '../../../assets/images/page-purple-icon.svg'
import PagePurpleIconSmall from '../../../assets/images/page-purple-icon-small.svg'
import PageRedIcon from '../../../assets/images/page-red-icon.svg'
import PageRedIconSmall from '../../../assets/images/page-red-icon-small.svg'
import PageYellowIcon from '../../../assets/images/page-yellow-icon.svg'
import PageYellowIconSmall from '../../../assets/images/page-yellow-icon-small.svg'
import Panel from '../Panel/Panel'

const findIconByColor = (pageColor: string) => {
  switch (pageColor) {
    case 'red':
      return { default: PageRedIcon, small: PageRedIconSmall }

    case 'blue':
      return { default: PageBlueIcon, small: PageBlueIconSmall }

    case 'green':
      return { default: PageGreenIcon, small: PageGreenIconSmall }

    case 'yellow':
      return { default: PageYellowIcon, small: PageYellowIconSmall }

    case 'purple':
      return { default: PagePurpleIcon, small: PagePurpleIconSmall }

    case 'brown':
      return { default: PageBrownIcon, small: PageBrownIconSmall }

    default:
      return { default: PageRedIcon, small: PageRedIconSmall }
  }
}

export interface PageCardProps {
  pageColor: string
  title: string
  slug: string
}

export const PageCard = ({ pageColor, title, slug }: PageCardProps) => {
  const { Link: UILink } = useUIContext()

  const backgroundColor =
    colors.find((c) => {
      return c.pageColor === pageColor
    })?.backgroundColor ?? 'rgb(var(--color-red--light))'
  const { default: PageIcon, small: SmallPageIcon } = findIconByColor(pageColor)

  return (
    <UILink href={slug ? `/${slug}` : ''}>
      <Panel className="hidden w-full lg:flex" hoverable>
        <div className="px-12 py-4" style={{ backgroundColor }}>
          <PageIcon />
        </div>
        <div className="flex w-full items-center justify-between px-14">
          <span className="text-default font-semibold">{title}</span>
          <ChevronRight />
        </div>
      </Panel>
      <Panel className="min-w-76 flex flex-col gap-y-4 px-6 py-4 lg:hidden" hoverable>
        <div className="flex items-center justify-between">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-category-100"
            style={{ backgroundColor }}
          >
            <SmallPageIcon />
          </div>
          <div className="pr-8">
            <ChevronRight />
          </div>
        </div>

        <span className="text-base font-medium">{title}</span>
      </Panel>
    </UILink>
  )
}

const colors = [
  {
    pageColor: 'red',
    backgroundColor: 'rgb(var(--color-red--light))',
  },
  {
    pageColor: 'blue',
    backgroundColor: 'rgb(var(--color-blue--light))',
  },
  {
    pageColor: 'green',
    backgroundColor: 'rgb(var(--color-green--light))',
  },
  {
    pageColor: 'yellow',
    backgroundColor: 'rgb(var(--color-yellow--light))',
  },
  {
    pageColor: 'purple',
    backgroundColor: 'rgb(var(--color-purple--light))',
  },
  {
    pageColor: 'brown',
    backgroundColor: 'rgb(var(--color-brown--light))',
  },
]
