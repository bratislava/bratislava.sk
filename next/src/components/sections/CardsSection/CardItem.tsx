import LinkCard from '@/src/components/cards/LinkCard'
import { PageCardsItemBlockFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'

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
    // <CardBase className="relative flex min-h-28 w-62 shrink-0 rounded-lg border p-4">
    //   <div className="flex flex-col gap-6">
    //     {showThumbnails && thumbnail && (
    //       <img src={thumbnail} alt={title} className="mb-4 w-full max-w-xs rounded-lg" />
    //     )}

    //     <Typography variant="h6" className="text-start">
    //       {title}
    //     </Typography>

    //     <Typography variant="p-small" className="text-start">
    //       {subtext}
    //     </Typography>

    //     <div className="flex flex-row justify-between">
    //       {buttonText && (
    //         <MLink stretched variant="underlined" className="text-start" href={page?.path || '#'}>
    //           {buttonText}
    //         </MLink>
    //       )}
    //       <Icon
    //         name="arrow-right"
    //         className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-passive-primary p-1.5"
    //       />
    //     </div>
    //   </div>
    // </CardBase>
    <LinkCard
      // linkProps={{ children: 'nunu nadpis', href: page?.path || '#' }}
      text={'subtext'}
      className="min-h-28 w-62 shrink-0 rounded-lg"
      image={thumbnail}
      showImage={true}
      imageClassName="aspect-280/158"
      linkProps={getLinkProps({ id: title ?? undefined, ...card })}
    />
  )
}

export default CardItem
