import { AccordionSectionFragment } from '@backend/graphql'
import { Institution } from '@bratislava/ui-bratislava/Institution/Institution'
import { NarrowText } from '@bratislava/ui-bratislava/NarrowText/NarrowText'
import { PageLinkButton } from '@bratislava/ui-bratislava/PageLinkButton/PageLinkButton'
import AccordionV2 from '@components/ui/AccordionV2/AccordionV2'
import { isDefined } from '@utils/isDefined'
import { groupByCategory, parsePageLink } from '@utils/page'
import { isPresent } from '@utils/utils'
import React from 'react'

type AccordionSectionProps = {
  section: AccordionSectionFragment
}

const AccordionSection = ({ section }: AccordionSectionProps) => {
  return (
    <>
      {section.title && <h1 className="text-h2 flex justify-center pb-14">{section.title}</h1>}
      <div className="flex flex-col gap-4">
        {groupByCategory(section.institutions?.filter(isPresent) ?? []).map(
          (institution, index) => (
            <AccordionV2
              variant="boxed-h3"
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
            </AccordionV2>
          ),
        )}

        {groupByCategory(section.flatText?.filter(isPresent) ?? []).map((text, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <AccordionV2 variant="boxed-h3" key={`flatText-${index}`} title={text.category}>
            {text.items.filter(isPresent).map((item, itemIndex) => {
              const link = parsePageLink({
                title: item.moreLinkTitle,
                url: item.moreLinkUrl,
                page: item.moreLinkPage,
              })

              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="flex flex-col gap-4" key={itemIndex}>
                  <NarrowText
                    contentStyle="my-8"
                    align={item.align}
                    width={item.width}
                    content={item.content}
                  />
                  {link?.url && link.title && <PageLinkButton pageLink={link} />}
                </div>
              )
            })}
          </AccordionV2>
        ))}

        {groupByCategory(section.institutionsNarrow?.filter(isPresent) ?? []).map((text, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <AccordionV2 variant="boxed-h3" key={`institutionsNarrow-${index}`} title={text.category}>
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
          </AccordionV2>
        ))}
      </div>
    </>
  )
}

export default AccordionSection
