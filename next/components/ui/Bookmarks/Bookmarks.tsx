import isEmpty from 'lodash/isEmpty'
import { twMerge } from 'tailwind-merge'

import Bookmark, { BookmarkProps } from '@/components/ui/Bookmark/Bookmark'

export type BookmarksProps = {
  className?: string
  bookmarks?: BookmarkProps[]
}

const Bookmarks = ({ className, bookmarks }: BookmarksProps) => {
  if (isEmpty(bookmarks)) return null
  return (
    <div
      className={twMerge(
        'pointer-events-none absolute right-0 z-20 hidden flex-col xl:flex',
        className,
      )}
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
