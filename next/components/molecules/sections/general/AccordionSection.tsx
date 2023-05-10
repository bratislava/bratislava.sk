import { AccordionSectionFragment } from '@backend/graphql'
import { AccordionItem } from '@bratislava/ui-bratislava/AccordionItem/AccordionItem'
import { Institution } from '@bratislava/ui-bratislava/Institution/Institution'
import { NarrowText } from '@bratislava/ui-bratislava/NarrowText/NarrowText'
import { PageLinkButton } from '@bratislava/ui-bratislava/PageLinkButton/PageLinkButton'
import { isDefined } from '@utils/isDefined'
import { groupByCategory, parseCategory, parsePageLink } from '@utils/page'
import { isPresent } from '@utils/utils'
import React from 'react'

type AccordionSectionProps = {
  section: AccordionSectionFragment
}

const AccordionSection = ({ section }: AccordionSectionProps) => {
  return (
    <>
      {section.title && <h1 className="text-h2 flex justify-center pb-14">{section.title}</h1>}
      <div className="flex flex-col">
        {groupByCategory(section.institutions?.filter(isPresent) ?? []).map((institution) => (
          <AccordionItem
            key={institution.category}
            title={parseCategory(institution.category).title}
            secondaryTitle={parseCategory(institution.category).secondaryTitle}
          >
            <div className="flex flex-col space-y-4">
              {institution.items.filter(isPresent).map((file, i) => (
                <Institution
                  key={i}
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
          </AccordionItem>
        ))}

        {groupByCategory(section.flatText?.filter(isPresent) ?? []).map((text) => (
          <AccordionItem
            key={text.category}
            title={parseCategory(text.category).title}
            secondaryTitle={parseCategory(text.category).secondaryTitle}
          >
            {text.items.filter(isPresent).map((item, i) => {
              const link = parsePageLink({
                title: item.moreLinkTitle,
                url: item.moreLinkUrl,
                page: item.moreLinkPage,
              })

              return (
                <div className="flex flex-col space-y-4 px-5 lg:px-10" key={i}>
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
          </AccordionItem>
        ))}

        {groupByCategory(section.institutionsNarrow?.filter(isPresent) ?? []).map((text) => (
          <AccordionItem
            key={text.category}
            title={parseCategory(text.category).title}
            secondaryTitle={parseCategory(text.category).secondaryTitle}
          >
            <div className="grid grid-cols-1 gap-x-7 gap-y-8 md:grid-cols-3">
              {text.items.filter(isPresent).map((file) => (
                <Institution
                  key={file.title}
                  title={file.title ?? undefined}
                  subtitle={file.subtitle ?? undefined}
                  url={file.url ?? undefined}
                  urlLabel={file.urlLabel ?? undefined}
                />
              ))}
            </div>
          </AccordionItem>
        ))}
      </div>
    </>
  )
}

export default AccordionSection
