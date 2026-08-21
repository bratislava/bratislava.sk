import LinkCard from '@/src/components/cards/LinkCard'
import { PageCardsItemBlockFragment } from '@/src/services/graphql'

const CardItem = ({
  card,
  showThumbnails,
}: {
  card: PageCardsItemBlockFragment
  showThumbnails: boolean
}) => {
  const { title, subtext, page, buttonText } = card

  const thumbnail = page?.pageBackgroundImage

  return (
    <LinkCard
      text={subtext}
      className="h-auto min-h-28 w-62 shrink-0 rounded-lg"
      image={thumbnail}
      showImage={showThumbnails}
      imageClassName="aspect-280/158"
      buttonText={buttonText}
      linkProps={{
        href: card.page?.path || '#',
        children: title ?? card.page?.title,
      }}
      cardTitleLevel={'h5'}
    />
  )
}

export default CardItem
