// @ts-strict-ignore
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import ArrowRight from '@assets/images/arrow-right.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
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
        'relative flex flex-col items-center md:flex-row',
        {
          'pt-24 md:pt-0': !!frontImage,
        },
        className,
      )}
    >
      {rearImage && (
        <Panel
          className={cx(
            'absolute top-0 w-24 translate-x-1/2 translate-y-[-57%] rotate-12 transform',
            'md:top-auto md:right-0 md:w-40 md:translate-x-[15%] md:translate-y-0',
          )}
        >
          <Image src={rearImage} alt="inba" width="160" height="244" />
        </Panel>
      )}

      {frontImage && (
        <Panel
          className={cx(
            'absolute top-0 w-32 translate-x-[-30%] translate-y-[-57%] rotate-[-9deg] transform',
            'md:top-auto md:right-0 md:w-52 md:translate-x-[-45%] md:translate-y-0',
          )}
        >
          <Image src={frontImage} alt="inba" width="211" height="329" />
        </Panel>
      )}

      <div
        className={cx(
          'flex flex-col items-center gap-4 px-6 pt-3 pb-8 text-center',
          'md:items-start md:py-8 md:pr-96 md:pl-12 md:text-left',
        )}
      >
        <h2 className="text-h4">{title}</h2>
        <span className="text-p2">{content}</span>
        <UILink
          className="group flex h-6 cursor-pointer items-center space-x-5 underline after:absolute after:inset-0 hover:text-main-600"
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
