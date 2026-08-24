import LinkCard from '@/src/components/cards/LinkCard'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { PageCardsSectionFragment } from '@/src/services/graphql'
import { getPageCardsItemProps } from '@/src/utils/getLinkProps'
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

        <div className="flex flex-col gap-8 overflow-x-auto sm:flex-row">
          {cardsFiltered.map((card) => (
            <LinkCard
              key={card.page?.path}
              text={card.subtext}
              className="h-auto min-h-28 min-w-62 shrink-0 rounded-lg sm:w-62"
              image={card.page?.pageBackgroundImage}
              showImage={!!showThumbnails}
              imageClassName="aspect-280/158"
              buttonText={card.buttonText}
              linkProps={getPageCardsItemProps(card)}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default PageCardsSection
