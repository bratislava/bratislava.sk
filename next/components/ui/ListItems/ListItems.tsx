import { ListItem, ListItemProps } from '../ListItem/ListItem';
import cx from 'classnames';

export interface ListItemsProps {
  className?: string;
  title?: string;
  listItems?: ListItemProps[];
}

export const ListItems = ({ className, title, listItems }: ListItemsProps) => {
  return (
    <div className={cx(className)}>
      <div className="w-full md:w-10/12">
        {title && (
          <div className="pb-10 text-sm md:text-md font-semibold text-font">
            {title}
          </div>
        )}

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
  );
};

export default ListItems;
