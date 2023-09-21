import { AccordionSectionFragment, Enum_Componentsectionsfilelist_Variant } from '@backend/graphql'
import FileList from '@bratislava/ui-bratislava/FileList/FileList'
import { Institution } from '@bratislava/ui-bratislava/Institution/Institution'
import { NarrowText } from '@bratislava/ui-bratislava/NarrowText/NarrowText'
import Markdown from '@components/atoms/Markdown'
import Button from '@components/forms/simple-components/Button'
import AccordionV2 from '@components/ui/AccordionV2/AccordionV2'
import { isDefined } from '@utils/isDefined'
import { groupByCategory, parsePageLink } from '@utils/page'
import { isPresent } from '@utils/utils'
import { useTranslations } from 'next-intl'
import React from 'react'

type AccordionSectionProps = {
  section: AccordionSectionFragment
}

const AccordionSection = ({ section }: AccordionSectionProps) => {
  const t = useTranslations()

  return (
    <>
      {section.title && <h2 className="text-h2 flex justify-center pb-14">{section.title}</h2>}
      <div className="flex flex-col gap-4">
        {groupByCategory(section.institutions?.filter(isPresent) ?? []).map(
          (institution, index) => (
            <AccordionV2
              variant="boxed-h3-large-gap"
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
          <AccordionV2 variant="boxed-h3-large-gap" key={`flatText-${index}`} title={text.category}>
            {text.items.filter(isPresent).map((item, itemIndex) => {
              const link = parsePageLink({
                title: item.moreLinkTitle,
                url: item.moreLinkUrl,
                page: item.moreLinkPage,
              })

              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="flex flex-col gap-4" key={itemIndex}>
                  <NarrowText align={item.align} width={item.width}>
                    <Markdown content={item.content} variant="accordion" />
                  </NarrowText>
                  {item.fileList?.length ? (
                    <FileList
                      fileSections={[{ files: item.fileList.filter(isDefined) }]}
                      variantFileList={Enum_Componentsectionsfilelist_Variant.Rows}
                    />
                  ) : null}
                  {link?.url && link.title && (
                    <Button href={link.url || '#'} variant="category-link">
                      {link.title}
                    </Button>
                  )}
                </div>
              )
            })}
          </AccordionV2>
        ))}

        {groupByCategory(section.institutionsNarrow?.filter(isPresent) ?? []).map((text, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <AccordionV2
            variant="boxed-h3-large-gap"
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
          </AccordionV2>
        ))}
      </div>
    </>
  )
}

export default AccordionSection
