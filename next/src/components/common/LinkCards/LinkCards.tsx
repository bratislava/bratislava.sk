import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import ListingCard from '@/src/components/cards/ListingCard'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { LinkCardsSectionFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

export type LinkCardsProps = {
  section: LinkCardsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18052-16738&t=WYqf0QbVs3yYwwAP-4
 * TODO - Check when final design is ready
 */

const LinkCards = ({ section }: LinkCardsProps) => {
  const { title, text, linkCardsItems: items, titleLevelLinkCardsSection: titleLevel } = section

  const filteredItems = items?.filter(isDefined) ?? []

  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      <SectionHeader title={title} text={text} titleLevel={titleLevel} />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:@page-wide:grid-cols-4">
        {filteredItems.map((item) => {
          return (
            <li key={item.id} className="h-full">
              <ListingCard
                title={item.title}
                cardTitleLevel={getCardTitleLevel(titleLevel)}
                text={item.text}
                linkProps={getLinkProps(item.link)}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default LinkCards
