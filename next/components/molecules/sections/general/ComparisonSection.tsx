import { InfoIcon } from '@assets/ui-icons'
import { ComparisonSectionFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import { isDefined } from '@utils/isDefined'
import cx from 'classnames'
import Image from 'next/image'
import React from 'react'

import ComparisonCard from '../../ComparisonCard'

type ComparisonSectionProps = {
  section: ComparisonSectionFragment
}

const ComparisonSection = ({ section }: ComparisonSectionProps) => {
  const { title, text, cards, textAlignComparison: textAlign } = section
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
      <ul
        className={cx('grid gap-3 lg:gap-8', {
          'md:grid-cols-2': cards?.length === 2,
          'lg:grid-cols-3': cards?.length === 3,
        })}
      >
        {cards?.filter(isDefined).map((card) => {
          const imgUrl = card.iconMedia?.data?.attributes?.url

          return (
            <ComparisonCard
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
