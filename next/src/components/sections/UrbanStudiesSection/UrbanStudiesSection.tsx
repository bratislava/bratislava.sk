import { Fragment } from 'react'

import DocumentRowCard from '@/src/components/cards/DocumentRowCard'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import UrbanStudiesAll from '@/src/components/sections/UrbanStudiesSection/UrbanStudiesAll'
import { UrbanStudiesSectionFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'
import { useUrbanStudyTypeTranslationMap } from '@/src/utils/useUrbanStudyTypeTranslationMap'

type Props = {
  section: UrbanStudiesSectionFragment
}

/**
 * Renders a list of related urban studies (or a searchable list of all of them when showAll is set).
 * Mirrors AssetsSection (ComponentSectionsAssets).
 */
const UrbanStudiesSection = ({ section }: Props) => {
  const { title, text, urbanStudies, showAll, titleLevelUrbanStudiesSection: titleLevel } = section

  const urbanStudyTypeTranslationMap = useUrbanStudyTypeTranslationMap()

  if (showAll) {
    return (
      <SectionContainer>
        <UrbanStudiesAll section={section} />
      </SectionContainer>
    )
  }

  const filteredUrbanStudies = urbanStudies.filter(isDefined)

  return (
    <SectionContainer>
      <div className="flex flex-col gap-4 lg:gap-6">
        <SectionHeader title={title} titleLevel={titleLevel} text={text} />

        <ul className="flex flex-col rounded-lg border py-2">
          {filteredUrbanStudies.map((urbanStudy, index) => {
            const { documentId, slug, title: studyTitle, urbanStudyType, year, updatedAt } =
              urbanStudy

            return (
              <Fragment key={documentId}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li className="w-full">
                  <DocumentRowCard
                    variant="multiple-files"
                    title={studyTitle}
                    cardTitleLevel={getCardTitleLevel(titleLevel)}
                    linkHref={`/uzemne-studie/${slug}`}
                    className="px-4 lg:px-6"
                    metadata={[
                      urbanStudyType ? urbanStudyTypeTranslationMap[urbanStudyType] : undefined,
                      year,
                      formatDate(updatedAt),
                    ].filter(isDefined)}
                  />
                </li>
              </Fragment>
            )
          })}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default UrbanStudiesSection
