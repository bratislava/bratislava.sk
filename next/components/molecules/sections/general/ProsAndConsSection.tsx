import { CheckIcon, CrossIcon } from '@assets/ui-icons'
import { ProsAndConsSectionFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import cx from 'classnames'
import React from 'react'

import { isDefined } from '@/utils/isDefined'

import ComparisonCard from '../../ComparisonCard'

type ProsAndConsSectionProps = {
  section: ProsAndConsSectionFragment
}

const ProsAndConsSection = ({ section }: ProsAndConsSectionProps) => {
  const { title, text, pros, cons, textAlignProsAndCons: textAlign } = section
  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {title || text ? (
        <div className="flex">
          <div className={cx('grow', { 'text-center': textAlign === 'center' })}>
            {title && <Typography type="h2">{title}</Typography>}
            {text && (
              <Typography type="p" className="not-first:mt-2">
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
  )
}

export default ProsAndConsSection
