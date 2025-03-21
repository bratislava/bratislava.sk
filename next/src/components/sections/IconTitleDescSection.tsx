import { Typography } from '@bratislava/component-library'
import React from 'react'

import IconTitleDescItem from '@/src/components/common/IconTitleDescItem/IconTitleDescItem'
import { IconTitleDescSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isDefined } from '@/src/utils/isDefined'

type IconTitleDescSectionProps = {
  section: IconTitleDescSectionFragment
}

const IconTitleDescSection = ({ section }: IconTitleDescSectionProps) => {
  const { title, list } = section

  const isLongList = list?.length && list.length > 3

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-12">
      {title ? (
        <div className="flex">
          <div className="grow text-center">
            {title && <Typography type="h2">{title}</Typography>}
          </div>
          {/* TODO showMoreLink, subtext */}
          {/* <div>button</div> */}
        </div>
      ) : null}
      <ul
        className={cn('grid grid-cols-1 gap-x-8 gap-y-12', {
          'md:grid-cols-2 lg:grid-cols-4': isLongList,
          'md:auto-cols-fr md:grid-flow-col': !isLongList,
        })}
      >
        {list?.filter(isDefined).map((item, index) => (
          <IconTitleDescItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            icon={item.icon?.data}
            title={item.title}
            text={item.desc}
            disableIconBackground={item.disableIconBackground}
          />
        ))}
      </ul>
    </div>
  )
}

export default IconTitleDescSection
