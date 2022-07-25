import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import Link from 'next/dist/client/link'

import { Panel } from '../Panel/Panel'

export interface PrimatorCardProps {
  className?: string
  title: string
  imageSrc: string
  href: string
  smImageAlign?: 'left' | 'right'
}

export const PrimatorCard = ({ className, title, imageSrc, href, smImageAlign = 'left' }: PrimatorCardProps) => {
  const { Link: UILink } = useUIContext()
  const { t } = useTranslation()
  const smRight = smImageAlign === 'right'
  return (
    <Link href={href}>
      <div className={cx('mt-24 md:mt-28 w-full cursor-pointer',{
                'mt-12 md:mt-28': smRight,
              }, className)}>
        <Panel
          className={cx(
            'flex items-center justify-between lg:justify-start px-6 lg:px-11 h-24 lg:h-32 relative overflow-visible'
          )}
        >
          <div>
            <img
              src={imageSrc}
              alt={title}
              className={cx('absolute bottom-0 h-41.5 lg:h-57', {
                'right-5 md:right-auto md:left-4 lg:left-11': smRight,
              })}
            />
          </div>
          <div
            className={cx('ml-0 md:ml-24 lg:ml-56', {
              'absolute md:relative left-6 md:left-0': smRight,
            })}
          >
            <span className={cx(' text-default lg:text-md')}>{title}</span>
            <UILink
              className="group mt-1.5 lg:mt-3 flex h-6 cursor-pointer items-center space-x-5 text-primary underline"
              href={href}
            >
              <span className="text-sm font-semibold">{t('readMore')}</span>
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
    </Link>
  )
}

export default PrimatorCard
