import { Typography } from '@bratislava/component-library'
import React from 'react'
import { CheckIcon, CrossIcon } from 'src/assets/icons'

import ComparisonCard from '@/src/components/common/ComparisonCard/ComparisonCard'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { ProsAndConsSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isDefined } from '@/src/utils/isDefined'

type ProsAndConsSectionProps = {
  section: ProsAndConsSectionFragment
}

const ProsAndConsSection = ({ section }: ProsAndConsSectionProps) => {
  const { title, text, pros, cons, textAlignProsAndCons: textAlign } = section

  return (
    <SectionContainer>
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
