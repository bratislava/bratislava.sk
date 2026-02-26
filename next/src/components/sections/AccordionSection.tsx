import { Typography } from '@bratislava/component-library'
import { Fragment } from 'react'

import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
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
        <div className="flex flex-col gap-4">
          {flatText!.length > 0 && (
            // TODO: bud parametrizovat varianty alebo vybrat paddingy a border von a vkladat ho dnu cez classname
            // TODO: remove DisclosureGroup z FAQ
            // TODO: pridat aj do breadcrums
            <DisclosureGroup
              allowsMultipleExpanded
              className="rounded-xl border border-border-active-default bg-background-passive-base py-2"
            >
              {/* TODO: remove groupByCategory */}
              {groupByCategory(flatText?.filter(isPresent) ?? []).map((text, index) => (
                <div key={`disclosure-group-${index}`}>
                  {text.items.filter(isPresent).map((item) => (
                    <Fragment key={`disclosure-${text.category}-${index}`}>
                      {index > 0 ? (
                        <HorizontalDivider aria-hidden className="mx-4 lg:mx-6" />
                      ) : null}

                      <Disclosure id={`disclosure-${text.category}-${index}`}>
                        <DisclosureHeader className="p-4 lg:px-6">
                          <Typography variant="h5" as={disclosureTitleLevel}>
                            {item?.category}
                          </Typography>
                        </DisclosureHeader>
                        <DisclosurePanel className="px-4 lg:px-6">
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
                        </DisclosurePanel>
                      </Disclosure>
                    </Fragment>
                  ))}
                </div>
              ))}
            </DisclosureGroup>
          )}

          {groupByCategory(institutions?.filter(isPresent) ?? []).map((institution, index) => (
            <DisclosureGroup
              allowsMultipleExpanded
              key={`disclosure-${institution.category}-${index}`}
              className="rounded-xl border border-border-active-default bg-background-passive-base py-2"
            >
              <Disclosure id={`disclosure-${institution.category}-${index}`}>
                <DisclosureHeader className="p-4 lg:px-6">
                  <Typography variant="h5" as={disclosureTitleLevel}>
                    {institution?.category}
                  </Typography>
                </DisclosureHeader>
                <DisclosurePanel className="px-4 lg:px-6">
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
                </DisclosurePanel>
              </Disclosure>
            </DisclosureGroup>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default AccordionSection
