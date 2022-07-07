import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
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
  const smRight = smImageAlign === 'right'
  return (
    <Link href={href}>
      <div className={cx('mt-24 lg:mt-28 w-full cursor-pointer', className)}>
        <Panel
          className={cx(
            'flex items-center justify-between lg:justify-start px-11 h-20 lg:h-32 relative overflow-visible'
          )}
        >
          <div>
            <img
              src={imageSrc}
              alt={title}
              className={cx('absolute bottom-0 h-41.5 lg:h-57', {
                'right-11 lg:left-11': smRight,
              })}
            />
          </div>
          <div
            className={cx('ml-0 lg:ml-56', {
              'absolute lg:relative left-11 lg:left-0': smRight,
            })}
          >
            <span className={cx(' text-default lg:text-md')}>{title}</span>
            <UILink
              className="group mt-3 flex h-6 cursor-pointer items-center space-x-5 text-primary underline"
              href={href}
            >
              <span className="text-sm font-semibold">Čítať viac</span>
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
