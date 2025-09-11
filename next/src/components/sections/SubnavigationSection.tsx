import { useTranslation } from 'next-i18next'
import React from 'react'

import SubnavigationCard from '@/src/components/cards/SubnavigationCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { SubnavigationSectionFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: SubnavigationSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17787-24086&m=dev
 */

const SubnavigationSection = ({ section }: Props) => {
  const { links } = section ?? {}
  const { t } = useTranslation()

  const filteredLinks = links?.filter(isDefined) ?? []

  return (
    <SectionContainer className="pt-6 lg:pt-16">
      <SectionHeader title={t('SubnavigationSection.aria.title')} className="sr-only" />
      <div className="flex flex-col gap-6 lg:gap-16">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredLinks.map((card) => {
            const { children: label, ...linkProps } = getLinkProps(card)

            return (
              <li key={card.id} className="*:h-full">
                <SubnavigationCard
                  title={label}
                  text={card.subtext ?? undefined}
                  linkPropsWithoutChildren={linkProps}
                />
              </li>
            )
          })}
        </ul>

        <HorizontalDivider />
      </div>
    </SectionContainer>
  )
}

export default SubnavigationSection
