import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import CardItem from '@/src/components/sections/CardsSection/CardItem'
import { PageCardsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: PageCardsSectionFragment
}

const CardsSection = ({ section }: Props) => {
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

        <div className="flex flex-row gap-8">
          {cardsFiltered.map((card) => (
            <CardItem key={card.title} card={card} showThumbnails={!!showThumbnails} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default CardsSection
