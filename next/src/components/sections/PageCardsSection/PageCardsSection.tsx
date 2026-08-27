import LinkCard from '@/src/components/cards/LinkCard'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { PageCardsSectionFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: PageCardsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18052-16738&t=vN46gYM0ZnVteMzz-0
 */

const PageCardsSection = ({ section }: Props) => {
  const {
    titlePageCardsSection: title,
    description,
    cardsPageCardsSection: cards,
    showThumbnails,
  } = section

  const cardsFiltered = cards?.filter(isDefined) ?? []

  return (
    <SectionContainer>
      <div className="flex flex-col gap-12">
        <SectionHeader title={title} text={description} />

        <ul
          className={
            'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 lg:@page-wide:grid-cols-4'
          }
        >
          {cardsFiltered.map((card) => (
            <li key={card.page?.documentId} className="*:h-full">
              <LinkCard
                key={card.page?.path}
                text={card.subtext}
                className="min-h-28 min-w-62 shrink-0 rounded-lg"
                image={card.page?.pageBackgroundImage}
                showImage={!!showThumbnails}
                imageClassName="aspect-280/158"
                buttonText={card.buttonText}
                linkProps={getLinkProps({ page: card.page })}
              />
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default PageCardsSection
