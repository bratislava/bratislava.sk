import { IconTitleDescSectionFragment } from '@backend/graphql'
import { IconTitleDescItem } from '@components/ui/IconTitleDescItem/IconTitleDescItem'
import { isDefined } from '@utils/isDefined'
import cx from 'classnames'
import React from 'react'

type IconTitleDescSectionProps = {
  section: IconTitleDescSectionFragment
}

const IconTitleDescSection = ({ section }: IconTitleDescSectionProps) => {
  const { title, list, hasBackground } = section

  const isLongList = list?.length && list.length > 3

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-12">
      {title ? (
        <div className="flex">
          <div className="grow text-center">{title && <h2 className="text-h2">{title}</h2>}</div>
          {/* TODO showMoreLink, subtext */}
          {/* <div>button</div> */}
        </div>
      ) : null}
      <ul
        className={cx('grid grid-cols-1 gap-x-8 gap-y-12', {
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
            hasBackground={hasBackground}
          />
        ))}
      </ul>
    </div>
  )
}

export default IconTitleDescSection
