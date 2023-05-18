import { ArrowRightIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import CardBase from '@components/molecules/presentation/CardBase'
import { CommonLinkProps } from '@utils/getCommonLinkProps'
import cx from 'classnames'
import Image from 'next/image'

export interface InBaCardProps {
  className?: string
  frontImageUrl: string | null | undefined
  rearImageUrl: string | null | undefined
  title?: string | null
  content?: string | null
  linkProps: CommonLinkProps
}

export const InBaCard = ({
  className,
  frontImageUrl,
  rearImageUrl,
  title,
  content,
  linkProps,
}: InBaCardProps) => {
  return (
    <CardBase
      variant="shadow"
      className={cx(
        'flex-col items-center overflow-visible md:flex-row',
        {
          'pt-24 md:pt-0': !!frontImageUrl,
        },
        className,
      )}
    >
      {rearImageUrl && (
        <div className="absolute top-0 w-24 translate-x-1/2 translate-y-[-57%] rotate-12 overflow-hidden rounded-lg md:right-0 md:top-auto md:w-40 md:translate-x-[15%] md:translate-y-0">
          <Image src={rearImageUrl} alt="" width="160" height="244" />
        </div>
      )}

      {frontImageUrl && (
        <div className="absolute top-0 w-32 translate-x-[-30%] translate-y-[-57%] rotate-[-9deg] overflow-hidden rounded-lg md:right-0 md:top-auto md:w-52 md:translate-x-[-45%] md:translate-y-0">
          <Image src={frontImageUrl} alt="inba" width="211" height="329" />
        </div>
      )}

      <div
        className={cx(
          'flex flex-col items-center gap-4 px-6 pb-8 pt-3 text-center',
          'md:items-start md:py-8 md:pl-12 md:pr-96 md:text-left',
        )}
      >
        <h2 className="text-h4">{title}</h2>
        <div>{content}</div>
        <Button variant="black-link" {...linkProps} stretched endIcon={<ArrowRightIcon />} />
      </div>
    </CardBase>
  )
}

export default InBaCard
