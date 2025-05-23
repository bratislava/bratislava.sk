import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import { useId } from 'react'

import CardBase from '@/src/components/cards/CardBase'
import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type InBaCardProps = {
  className?: string
  frontImageUrl: string | null | undefined
  rearImageUrl: string | null | undefined
  title?: string | null
  content?: string | null
  linkProps: CommonLinkProps
}

const InBaCard = ({
  className,
  frontImageUrl,
  rearImageUrl,
  title,
  content,
  linkProps,
}: InBaCardProps) => {
  const titleId = useId()

  return (
    <CardBase
      variant="border"
      className={cn(
        'flex-col items-center overflow-visible md:flex-row',
        {
          'pt-24 md:pt-0': !!frontImageUrl,
        },
        className,
      )}
    >
      {rearImageUrl && (
        <div className="absolute top-0 w-24 translate-x-1/2 translate-y-[-57%] rotate-12 overflow-hidden rounded-lg md:top-auto md:right-0 md:w-40 md:translate-x-[15%] md:translate-y-0">
          <Image src={rearImageUrl} alt="" width="160" height="244" />
        </div>
      )}

      {frontImageUrl && (
        <div className="absolute top-0 w-32 translate-x-[-30%] translate-y-[-57%] rotate-[-9deg] overflow-hidden rounded-lg md:top-auto md:right-0 md:w-52 md:translate-x-[-45%] md:translate-y-0">
          <Image src={frontImageUrl} alt="inba" width="211" height="329" />
        </div>
      )}

      <div
        className={cn(
          'flex flex-col items-center gap-4 px-6 pt-3 pb-8 text-center',
          'md:items-start md:py-8 md:pr-96 md:pl-12 md:text-left',
        )}
      >
        <Typography id={titleId} variant="h4" as="h2">
          {title}
        </Typography>
        <Typography variant="p-default">{content}</Typography>
        <Button variant="link" {...linkProps} stretched aria-labelledby={titleId} />
      </div>
    </CardBase>
  )
}

export default InBaCard
