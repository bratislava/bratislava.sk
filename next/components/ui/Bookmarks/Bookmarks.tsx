import SignpostIcon from '@assets/images/signpost-round.svg'
import UaIcon from '@assets/images/ua-flag-round.svg'
import { Bookmark, BookmarkProps } from '@bratislava/ui-bratislava/Bookmark/Bookmark'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'

export interface BookmarksProps {
  className?: string
  bookmarks?: BookmarkProps[]
}

export const Bookmarks = ({ className, bookmarks }: BookmarksProps) => {
  if (isEmpty(bookmarks)) return null
  return (
    <div
      className={cx(className, 'pointer-events-none absolute right-0 z-20 hidden flex-col xl:flex')}
    >
      {bookmarks?.map((bookmark, index) => (
        <Bookmark
          key={index}
          {...bookmark}
          className="pointer-events-auto mb-2"
          IconComponent={
            bookmark.icon === 'ua'
              ? UaIcon
              : bookmark.icon === 'signpost'
              ? SignpostIcon
              : undefined
          }
        />
      ))}
    </div>
  )
}

export default Bookmarks
