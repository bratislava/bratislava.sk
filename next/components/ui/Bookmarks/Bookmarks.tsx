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
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          {...bookmark}
          className="pointer-events-auto mb-2"
        />
      ))}
    </div>
  )
}

export default Bookmarks
