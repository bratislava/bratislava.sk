import React from 'react'

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
  const { title, text, faqs } = section ?? {}

  const filteredFaqs = faqs.filter(isDefined) ?? []

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={title} text={text} />

        <FaqsGroup faqs={filteredFaqs} />
      </div>
    </SectionContainer>
  )
}

export default FaqsSection
