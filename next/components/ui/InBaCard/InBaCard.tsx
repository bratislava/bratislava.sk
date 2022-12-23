// @ts-strict-ignore
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import ArrowRight from '../../../assets/images/arrow-right.svg'
import ChevronRight from '../../../assets/images/chevron-right.svg'
import { Panel } from '../Panel/Panel'

export interface InBaCardProps {
  className?: string
  images?: (string | undefined)[]
  title?: string | null
  content?: string | null
  link?: string | null
}

export const InBaCard = ({ className, images, title, content, link }: InBaCardProps) => {
  const { t } = useTranslation('common')

  const [frontImage, rearImage] = images || []

  const { Link: UILink } = useUIContext()

  return (
    <Panel
      overflowVisible
      className={cx(
        'relative flex flex-col md:flex-row items-center',
        {
          'pt-24 md:pt-0': !!frontImage,
        },
        className,
      )}
    >
      {rearImage && (
        <Panel
          className={cx(
            'absolute w-24 top-0 transform rotate-12 translate-x-1/2 translate-y-[-57%]',
            'md:w-40 md:top-auto md:right-0 md:translate-x-[15%] md:translate-y-0',
          )}
        >
          <img src={rearImage} alt="inba" width="160" height="244" />
        </Panel>
      )}

      {frontImage && (
        <Panel
          className={cx(
            'absolute w-32 top-0 transform rotate-[-9deg] translate-x-[-30%] translate-y-[-57%]',
            'md:w-52 md:top-auto md:right-0 md:translate-x-[-45%] md:translate-y-0',
          )}
        >
          <img src={frontImage} alt="inba" width="211" height="329" />
        </Panel>
      )}

      <div
        className={cx(
          'flex flex-col items-center text-center gap-4 px-6 pt-3 pb-8',
          'md:items-start md:text-left md:pr-96 md:pl-12 md:py-8',
        )}
      >
        <h2 className="text-h4">{title}</h2>
        <span className="text-p2">{content}</span>
        <UILink
          className="group flex h-6 cursor-pointer items-center space-x-5 hover:text-main-600 underline after:absolute after:inset-0"
          href={link}
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
  )
}

export default InBaCard
