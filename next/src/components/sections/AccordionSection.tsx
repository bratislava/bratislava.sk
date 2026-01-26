import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Accordion from '@/src/components/common/Accordion/Accordion'
import Button from '@/src/components/common/Button/Button'
import FileList from '@/src/components/common/FileList/FileList'
import Institution from '@/src/components/common/Institution_Deprecated/Institution_Deprecated'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { AccordionSectionFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { groupByCategory } from '@/src/utils/pageUtils_Deprecated'
import { isPresent } from '@/src/utils/utils'

type AccordionSectionProps = {
  section: AccordionSectionFragment
}

/**
 * TODO Figma link
 */

const AccordionSection = ({ section }: AccordionSectionProps) => {
  const { title, institutions, flatText, titleLevelAccordionSection: titleLevel } = section

  // If no section title is provided, accordions act as h2, otherwise they accommodate to section titleLevel
  const accordionTitleLevel = title ? getCardTitleLevel(titleLevel) : 'h2'

  return (
    <SectionContainer>
      {/* TODO Correct spacing between SectionHeader and remaining content */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <SectionHeader title={title} titleLevel={titleLevel} />
        <div className="flex flex-col gap-4">
          {groupByCategory(institutions?.filter(isPresent) ?? []).map((institution, index) => (
            <Accordion
              key={`institution-${index}`}
              title={institution.category}
              accordionTitleLevel={accordionTitleLevel}
            >
              <div className="flex flex-col gap-4">
                {institution.items.filter(isPresent).map((file, itemIndex) => (
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
            </Accordion>
          ))}

          {groupByCategory(flatText?.filter(isPresent) ?? []).map((text, index) => (
            <Accordion
              key={`flatText-${index}`}
              title={text.category}
              accordionTitleLevel={accordionTitleLevel}
            >
              {text.items.filter(isPresent).map((item, itemIndex) => {
                return (
                  <div className="flex flex-col gap-4" key={itemIndex}>
                    <Markdown content={item.content} variant="accordion" />
                    {item.fileList?.filter(isDefined).length ? (
                      <FileList files={item.fileList.filter(isDefined) ?? []} />
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
                  </div>
                )
              })}
            </Accordion>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default AccordionSection
