import { Fragment } from 'react'

import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import FaqsAll from '@/src/components/common/FaqsAll/FaqsAll'
import FaqsGroup from '@/src/components/common/FaqsGroup/FaqsGroup'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { FaqsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: FaqsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-52391&m=dev
 */

const FaqsSection = ({ section }: Props) => {
  const { title, text, faqs, faqCategories, titleLevelFaqsSection: titleLevel, showAll } = section

  const filteredFaqs = faqs.filter(isDefined) ?? []

  // If no section title is provided, accordions act as h2, otherwise they accommodate to section titleLevel
  const accordionTitleLevel = title ? getCardTitleLevel(titleLevel) : 'h2'

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={title} titleLevel={titleLevel} text={text} />
        {showAll ? (
          <FaqsAll />
        ) : (
          <DisclosureGroup className="rounded-xl border border-border-active-default bg-background-passive-base py-2">
            {faqCategories.length > 0 ? (
              <Fragment>
                {faqCategories.map((category, index) => (
                  <Fragment key={category?.title}>
                    {index > 0 ? <HorizontalDivider className="mx-4 lg:mx-6" /> : null}
                    <FaqsGroup
                      faqs={category?.faqs.filter(isDefined) ?? []}
                      category={category?.title}
                      accordionTitleLevel={accordionTitleLevel}
                    />
                  </Fragment>
                ))}
              </Fragment>
            ) : (
              <FaqsGroup faqs={filteredFaqs} accordionTitleLevel={accordionTitleLevel} />
            )}
          </DisclosureGroup>
        )}
      </div>
    </SectionContainer>
  )
}

export default FaqsSection
