import { Typography } from '@bratislava/component-library'
import React from 'react'

import FaqsGroup from '@/components/common/FaqsGroup/FaqsGroup'
import { FaqCategoriesSectionFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

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
          {title ? <Typography type="h2">{title}</Typography> : null}
          {text ? <Typography type="p">{text}</Typography> : null}
        </div>
      ) : null}
      {filteredFaqCategories
        .map((faqCategory) => {
          if (!faqCategory.attributes) return null

          const { title: categoryTitle, faqs, slug } = faqCategory.attributes
          const filteredFaqs = faqs?.data.filter(isDefined) ?? []

          return (
            <div key={slug} className="flex flex-col gap-8 lg:gap-10">
              <Typography type="h3">{categoryTitle}</Typography>
              <FaqsGroup faqs={filteredFaqs} />
            </div>
          )
        })
        .filter(isDefined)}
    </div>
  )
}

export default FaqCategoriesSection
