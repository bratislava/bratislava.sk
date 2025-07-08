import Image from 'next/image'
import React from 'react'
import { InfoIcon } from 'src/assets/icons'

import ComparisonCard from '@/src/components/common/ComparisonCard/ComparisonCard'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { ComparisonSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isDefined } from '@/src/utils/isDefined'

type ComparisonSectionProps = {
  section: ComparisonSectionFragment
}

/**
 * TODO Figma link
 */

const ComparisonSection = ({ section }: ComparisonSectionProps) => {
  const { title, text, cards, textAlignComparison: textAlign } = section

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader
          title={title}
          text={text}
          isCentered={textAlign === 'center'}
          // TODO showMoreLink
        />
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
    </SectionContainer>
  )
}

export default ComparisonSection
