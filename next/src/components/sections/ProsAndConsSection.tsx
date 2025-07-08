import React from 'react'
import { CheckIcon, CrossIcon } from 'src/assets/icons'

import ComparisonCard from '@/src/components/common/ComparisonCard/ComparisonCard'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { ProsAndConsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type ProsAndConsSectionProps = {
  section: ProsAndConsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16920-16901&m=dev
 */

const ProsAndConsSection = ({ section }: ProsAndConsSectionProps) => {
  const { title, text, pros, cons, textAlignProsAndCons: textAlign } = section

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader
          title={title}
          text={text}
          isCentered={textAlign === 'center'}
          // TODO showMoreLink
        />
        <ul className="grid gap-3 md:grid-cols-2 lg:gap-8">
          {cons && (
            <ComparisonCard
              icon={<CrossIcon />}
              color="red"
              title={cons.title}
              items={cons.items.filter(isDefined).map((item) => item.label)}
            />
          )}
          {pros && (
            <ComparisonCard
              icon={<CheckIcon />}
              color="green"
              title={pros.title}
              items={pros.items.filter(isDefined).map((item) => item.label)}
            />
          )}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default ProsAndConsSection
