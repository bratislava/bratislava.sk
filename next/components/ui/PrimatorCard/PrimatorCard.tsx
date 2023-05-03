import { ArrowRightIcon } from '@assets/images'
import Button from '@components/forms/simple-components/Button'
import cx from 'classnames'
import { useTranslations } from 'next-intl'

import { Panel } from '../Panel/Panel'

export interface PrimatorCardProps {
  className?: string
  title: string
  imageSrc: string
  href: string
}

export const PrimatorCard = ({ className, title, imageSrc, href }: PrimatorCardProps) => {
  const t = useTranslations()

  return (
    <div className={cx('relative mt-16 w-full lg:mt-28', className)}>
      <Panel className="relative flex h-24 items-center justify-between overflow-visible px-6 lg:h-32 lg:justify-start lg:px-11">
        <div>
          <img src={imageSrc} alt={title} className="absolute bottom-0 h-40 lg:h-56" />
        </div>
        <div className="ml-0 flex flex-col items-end lg:ml-56 lg:items-start">
          <div className="text-h4 mb-1.5 lg:mb-3">{title}</div>
          <Button href={href} stretched variant="category-link" endIcon={<ArrowRightIcon />}>
            {t('readMore')}
          </Button>
        </div>
      </Panel>
    </div>
  )
}

export default PrimatorCard
