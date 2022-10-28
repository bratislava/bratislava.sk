import cx from 'classnames'

import { ListItem, ListItemProps } from '../ListItem/ListItem'

export interface ListItemsProps {
  className?: string
  title?: string
  listItems?: ListItemProps[]
}

export const ListItems = ({ className, title, listItems }: ListItemsProps) => {
  return (
    <div className={cx(className)}>
      <div className="w-full md:w-10/12">
        {title && <div className="text-h4 pb-10 text-font">{title}</div>}

        {listItems && (
          <div className="space-y-8">
            {listItems.map((listItem, index) => (
              <ListItem
                key={index}
                content={listItem.content}
                moreLink={listItem.moreLink}
                circleOption={listItem.circleOption}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListItems
