import { Typography } from '@bratislava/component-library'
import { Fragment, ReactNode } from 'react'

import cn from '@/src/utils/cn'

export type DescriptionListItem = {
  // Optional explicit key, falls back to the label.
  key?: string
  label: ReactNode
  value: ReactNode
}

type Props = {
  items: DescriptionListItem[]
  className?: string
}

const DescriptionList = ({ items, className }: Props) => {
  return (
    <dl className={cn('-mt-1 lg:-mt-3', className)}>
      {items.map((item, index) => (
        <Fragment key={item.key ?? `${index}`}>
          <Typography variant="p-small" as="dt" className="mt-1 font-semibold after:content-[':'] lg:float-left lg:clear-left lg:mt-3 lg:w-40">
            {item.label}
          </Typography>
          <Typography variant="p-small" as="dd" className="mt-1 lg:mt-3 lg:ml-44">{item.value}</Typography>
        </Fragment>
      ))}
    </dl>
  )
}

export default DescriptionList
