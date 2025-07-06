import { Typography } from '@bratislava/component-library'
import React from 'react'

import FaqsGroup from '@/src/components/common/FaqsGroup/FaqsGroup'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { FaqCategoriesSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: FaqCategoriesSectionFragment
}

/**
 * TODO Figma link
 */

const FaqCategoriesSection = ({ section }: Props) => {
  const { title, text, faqCategories } = section ?? {}

  const filteredFaqCategories = faqCategories?.data.filter(isDefined) ?? []

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={title} text={text} />
        {filteredFaqCategories
          .map((faqCategory) => {
            if (!faqCategory.attributes) return null

            const { title: categoryTitle, faqs, slug } = faqCategory.attributes
            const filteredFaqs = faqs?.data.filter(isDefined) ?? []

            return (
              <div key={slug} className="flex flex-col gap-8 lg:gap-10">
                <Typography variant="h3">{categoryTitle}</Typography>
                <FaqsGroup faqs={filteredFaqs} />
              </div>
            )
          })
          .filter(isDefined)}
      </div>
    </SectionContainer>
  )
}

export default FaqCategoriesSection
