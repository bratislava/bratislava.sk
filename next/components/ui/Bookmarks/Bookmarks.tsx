import { Bookmark, BookmarkProps } from '@bratislava/ui-bratislava';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { ReactComponent as UaIcon } from '../../assets/images/ua-flag-round.svg';
import { ReactComponent as SignpostIcon } from '../../assets/images/signpost-round.svg';

export interface BookmarksProps {
  className?: string;
  bookmarks?: BookmarkProps[];
}

export const Bookmarks = ({ className, bookmarks }: BookmarksProps) => {
  if (isEmpty(bookmarks)) return null;
  return (
    <div
      className={cx(
        className,
        'hidden xl:flex flex-col absolute right-0 z-40 pointer-events-none'
      )}
    >
      {bookmarks?.map((b, ix) => (
        <Bookmark
          key={ix}
          {...b}
          className="mb-2 pointer-events-auto"
          IconComponent={
            b.icon === 'ua'
              ? UaIcon
              : b.icon === 'signpost'
              ? SignpostIcon
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default Bookmarks;
