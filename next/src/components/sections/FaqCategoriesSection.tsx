import { Typography } from '@bratislava/component-library'
import React from 'react'

import FaqsGroup from '@/src/components/common/FaqsGroup/FaqsGroup'
import { FaqCategoriesSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: FaqCategoriesSectionFragment
}

const FaqCategoriesSection = ({ section }: Props) => {
  const { title, text, faqCategories } = section ?? {}

  const filteredFaqCategories = faqCategories?.data.filter(isDefined) ?? []

  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {title || text ? (
        <div className="col-span-1 flex flex-col gap-3 md:col-span-5">
          {title ? <Typography variant="h2">{title}</Typography> : null}
          {text ? <Typography variant="p-default">{text}</Typography> : null}
        </div>
      ) : null}
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
  )
}

export default FaqCategoriesSection
