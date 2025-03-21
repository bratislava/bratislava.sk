import Bookmarks from '@/src/components/common/Bookmarks_Deprecated/Bookmarks_Deprecated'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'

const BookmarksHomepageSection = () => {
  const { homepage } = useHomepageContext()

  const cards = homepage?.attributes?.cards?.map((card) => ({
    bookmarkTitle: card?.title,
    title: card?.headline,
    content: card?.text,
    link: {
      title: card?.link?.title,
      href: card?.link?.href,
    },
    icon: card?.picture?.data?.attributes?.url,
    variant: card?.variant,
  }))

  return <Bookmarks bookmarks={cards} className="top-56" />
}

export default BookmarksHomepageSection
