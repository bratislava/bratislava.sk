import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import { Panel } from '../Panel/Panel'

export interface PrimatorCardProps {
  className?: string
  title: string
  imageSrc: string
  href: string
  smImageAlign?: 'left' | 'right'
}

export const PrimatorCard = ({
  className,
  title,
  imageSrc,
  href,
  smImageAlign = 'left',
}: PrimatorCardProps) => {
  const { Link: UILink } = useUIContext()
  const { t } = useTranslation()
  const smRight = smImageAlign === 'right'
  return (
    <div
      className={cx(
        'relative mt-24 w-full lg:mt-28',
        {
          'mt-12 lg:mt-28': smRight,
        },
        className,
      )}
    >
      <Panel
        className={cx(
          'relative flex h-24 items-center justify-between overflow-visible px-6 lg:h-32 lg:justify-start lg:px-11',
        )}
      >
        <div>
          <UILink href={href}>
            <img src={imageSrc} alt={title} className="absolute bottom-0 h-40 lg:h-56" />
          </UILink>
        </div>
        <div className="ml-0 flex flex-col items-end lg:ml-56 lg:items-start">
          <div className="text-h4-normal">{title}</div>
          <UILink
            className="group mt-1.5 flex h-6 items-center space-x-5 text-category-600 underline after:absolute after:inset-0 lg:mt-3"
            href={href}
          >
            <span className="text-p2-semibold">{t('readMore')}</span>
            <span className="group-hover:hidden">
              <ChevronRight />
            </span>
            <span className="hidden group-hover:block">
              <ArrowRight />
            </span>
          </UILink>
        </div>
      </Panel>
    </div>
  )
}

export default PrimatorCard
