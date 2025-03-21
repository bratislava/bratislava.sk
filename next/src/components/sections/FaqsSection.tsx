import { Typography } from '@bratislava/component-library'
import React from 'react'

import FaqsGroup from '@/src/components/common/FaqsGroup/FaqsGroup'
import { FaqsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: FaqsSectionFragment
}

const FaqsSection = ({ section }: Props) => {
  const { title, text, faqs } = section ?? {}

  const filteredFaqs = faqs?.data.filter(isDefined) ?? []

  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {title || text ? (
        <div className="col-span-1 flex flex-col gap-3 md:col-span-5">
          {title ? <Typography type="h2">{title}</Typography> : null}
          {text ? <Typography type="p">{text}</Typography> : null}
        </div>
      ) : null}

      <FaqsGroup faqs={filteredFaqs} />
    </div>
  )
}

export default FaqsSection
