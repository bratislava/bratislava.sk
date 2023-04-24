import { Bookmarks } from '@components/ui/Bookmarks/Bookmarks'
import { useHomepageContext } from '@utils/homepageContext'

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
