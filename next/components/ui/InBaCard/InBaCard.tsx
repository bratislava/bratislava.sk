import { ArrowRightIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import cx from 'classnames'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Panel } from '../Panel/Panel'

export interface InBaCardProps {
  className?: string
  images?: (string | undefined)[]
  title?: string | null
  content?: string | null
  link?: string | null
}

export const InBaCard = ({ className, images, title, content, link }: InBaCardProps) => {
  const t = useTranslations()

  const [frontImage, rearImage] = images || []

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
            'md:right-0 md:top-auto md:w-40 md:translate-x-[15%] md:translate-y-0',
          )}
        >
          <Image src={rearImage} alt="inba" width="160" height="244" />
        </Panel>
      )}

      {frontImage && (
        <Panel
          className={cx(
            'absolute top-0 w-32 translate-x-[-30%] translate-y-[-57%] rotate-[-9deg] transform',
            'md:right-0 md:top-auto md:w-52 md:translate-x-[-45%] md:translate-y-0',
          )}
        >
          <Image src={frontImage} alt="inba" width="211" height="329" />
        </Panel>
      )}

      <div
        className={cx(
          'flex flex-col items-center gap-4 px-6 pb-8 pt-3 text-center',
          'md:items-start md:py-8 md:pl-12 md:pr-96 md:text-left',
        )}
      >
        <h2 className="text-h4">{title}</h2>
        <span className="text-default">{content}</span>
        <Button
          variant="black-link"
          className="group"
          href={link ?? '#'}
          stretched
          endIcon={<ArrowRightIcon />}
        >
          {t('readMore')}
        </Button>
      </div>
    </Panel>
  )
}

export default InBaCard
