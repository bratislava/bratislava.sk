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
  return (
    <SectionContainer>
      <SectionHeader
        title={section.title}
        isCentered
        // TODO Correct spacing between SectionHeader and remaining content
        className="pb-6 lg:pb-8"
      />
      <div className="flex flex-col gap-4">
        {groupByCategory(section.institutions?.filter(isPresent) ?? []).map(
          (institution, index) => (
            <Accordion
              // eslint-disable-next-line react/no-array-index-key
              key={`institution-${index}`}
              title={institution.category}
            >
              <div className="flex flex-col gap-4">
                {institution.items.filter(isPresent).map((file, itemIndex) => (
                  <Institution
                    // eslint-disable-next-line react/no-array-index-key
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
          ),
        )}

        {groupByCategory(section.flatText?.filter(isPresent) ?? []).map((text, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Accordion key={`flatText-${index}`} title={text.category}>
            {text.items.filter(isPresent).map((item, itemIndex) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
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

        {groupByCategory(section.institutionsNarrow?.filter(isPresent) ?? []).map((text, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Accordion
            // eslint-disable-next-line react/no-array-index-key
            key={`institutionsNarrow-${index}`}
            title={text.category}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {text.items.filter(isPresent).map((file, fileIndex) => (
                <Institution
                  // eslint-disable-next-line react/no-array-index-key
                  key={fileIndex}
                  title={file.title ?? undefined}
                  subtitle={file.subtitle ?? undefined}
                  url={file.url ?? undefined}
                  urlLabel={file.urlLabel ?? undefined}
                />
              ))}
            </div>
          </Accordion>
        ))}
      </div>
    </SectionContainer>
  )
}

export default AccordionSection
