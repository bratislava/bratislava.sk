import { Button, Typography } from '@bratislava/component-library'

import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import FileList from '@/src/components/common/FileList/FileList'
import Institution from '@/src/components/common/Institution_Deprecated/Institution_Deprecated'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { AccordionSectionFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { groupInstitutionsByCategory } from '@/src/utils/groupInstitutionsByCategory_deprecated'
import { isDefined } from '@/src/utils/isDefined'

type AccordionSectionProps = {
  section: AccordionSectionFragment
}

/**
 *  Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=J5qdpxyzlXhmMPVl-4
 */

const AccordionSection = ({ section }: AccordionSectionProps) => {
  const { title, institutions, flatText, titleLevelAccordionSection: titleLevel } = section

  // If no section title is provided, accordions act as h2, otherwise they accommodate to section titleLevel
  const disclosureTitleLevel = title ? getCardTitleLevel(titleLevel) : 'h2'

  return (
    <SectionContainer>
      {/* TODO Correct spacing between SectionHeader and remaining content */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <SectionHeader title={title} titleLevel={titleLevel} />
        {flatText?.length ? (
          <DisclosureGroup>
            {flatText.filter(isDefined).map((item, index) => (
              <Disclosure
                key={`disclosure-${item.category}-${index}`}
                id={`disclosure-${item.category}-${index}`}
              >
                <DisclosureHeader>
                  <Typography variant="h5" as={disclosureTitleLevel}>
                    {item?.category}
                  </Typography>
                </DisclosureHeader>
                <DisclosurePanel>
                  <Markdown content={item.content} variant="accordion" />

                  {item.fileList?.filter(isDefined).length ? (
                    <FileList files={item.fileList.filter(isDefined)} />
                  ) : null}
                  {item.moreLinkUrl || item.moreLinkPage ? (
                    <Button
                      variant="link"
                      {...getLinkProps({
                        label: item.moreLinkTitle,
                        url: item.moreLinkUrl,
                        page: item.moreLinkPage,
                      })}
                    />
                  ) : null}
                </DisclosurePanel>
              </Disclosure>
            ))}
          </DisclosureGroup>
        ) : null}

        {groupInstitutionsByCategory(institutions?.filter(isDefined) ?? []).map(
          (institution, index) => (
            <Disclosure key={`disclosure-${institution.category}-${index}`}>
              <DisclosureHeader>
                <Typography variant="h5" as={disclosureTitleLevel}>
                  {institution?.category}
                </Typography>
              </DisclosureHeader>
              <DisclosurePanel>
                <div className="flex flex-col gap-4">
                  {institution.items.filter(isDefined).map((file, itemIndex) => (
                    <Institution
                      key={itemIndex}
                      title={file.title ?? undefined}
                      subtitle={file.subtitle ?? undefined}
                      content={[file.firstColumn, file.secondColumn, file.thirdColumn]
                        .filter(Boolean)
                        .filter(isDefined)}
                      url={file.url ?? undefined}
                      urlLabel={file.urlLabel ?? undefined}
                    />
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>
          ),
        )}
      </div>
    </SectionContainer>
  )
}

export default AccordionSection
