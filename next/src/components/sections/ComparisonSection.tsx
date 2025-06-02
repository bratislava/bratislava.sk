import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React from 'react'
import { InfoIcon } from 'src/assets/icons'

import ComparisonCard from '@/src/components/common/ComparisonCard/ComparisonCard'
import { ComparisonSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isDefined } from '@/src/utils/isDefined'

type ComparisonSectionProps = {
  section: ComparisonSectionFragment
}

const ComparisonSection = ({ section }: ComparisonSectionProps) => {
  const { title, text, cards, textAlignComparison: textAlign } = section

  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {title || text ? (
        <div className="flex">
          <div className={cn('grow', { 'text-center': textAlign === 'center' })}>
            {title && <Typography variant="h2">{title}</Typography>}
            {text && (
              <Typography variant="p-default" className="not-first:mt-2">
                {text}
              </Typography>
            )}
          </div>
          {/* TODO showMoreLink */}
          {/* <div>button</div> */}
        </div>
      ) : null}
      <ul
        className={cn('grid gap-3 lg:gap-8', {
          'md:grid-cols-2': cards?.length === 2,
          'lg:grid-cols-3': cards?.length === 3,
        })}
      >
        {cards?.filter(isDefined).map((card, index) => {
          const imgUrl = card.iconMedia?.data?.attributes?.url

          return (
            <ComparisonCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              icon={imgUrl ? <Image src={imgUrl} alt="" fill /> : <InfoIcon />}
              color="white"
              title={card.title}
              items={card.items.filter(isDefined).map((item) => item.label)}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default ComparisonSection
