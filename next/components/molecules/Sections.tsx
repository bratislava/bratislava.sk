import { SectionsFragment } from '@bratislava/strapi-sdk-homepage'
import {
  AccordionItem,
  AdvancedAccordion,
  ColumnedText,
  Contact,
  Divider,
  FileList,
  Institution,
  Links,
  ListItems,
  NarrowText,
  NumericalListSection,
  PageLinkButton,
  RentBenefits,
  SectionContainer,
  TextWithImage,
  Videos,
  Waves,
} from '@bratislava/ui-bratislava'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { groupByCategory, groupByCategoryFileList, parseCategory, parsePageLink } from '../../utils/page'
import { isPresent } from '../../utils/utils'
import { DocumentList } from './sections/documentList'
import { ArticlesList } from './sections/homepage/ArticlesList'
import MinimumCalculator from './sections/MinimumCalculator'
import NewsLetterSection from './sections/NewsLetterSection'

const sectionContent = (section: SectionsFragment, slug?: string, locale?: string) => {
  const { t } = useTranslation('common')
  switch (section.__typename) {
    case 'ComponentSectionsNarrowText':
      return (
        <NarrowText
          align={section.align ?? undefined}
          content={section.content ?? undefined}
          width={section.width ?? undefined}
          hasBackground={section.hasBackground ?? false}
        />
      )

    case 'ComponentSectionsIconTitleDesc':
      return <RentBenefits title={section.title} list={section.list} linkLabel={t('readMore')} />

    case 'ComponentSectionsDocumentList':
      return <DocumentList />

    case 'ComponentSectionsColumnedText':
      return <ColumnedText content={section.content ?? ''} hasBackground={section.hasBackground ?? false} />

    case 'ComponentSectionsTextWithImage':
      return (
        <TextWithImage
          imageSrc={section.imageSrc?.data.attributes.url ?? ''}
          imagePosition={section.imagePosition ?? 'left'}
          content={section.content ?? ''}
          imageShadow={section.imageShadow ?? false}
        />
      )

    case 'ComponentSectionsFileList':
      return <FileList fileSections={groupByCategoryFileList(section.fileList?.filter(isPresent) ?? [])} />

    case 'ComponentSectionsDivider':
      return <Divider dividerStyle={section.style ?? undefined} />

    case 'ComponentSectionsLinks':
      return (
        <Links
          title={section.title ?? ''}
          pageLinks={section.pageLinks?.map((pageLink) => parsePageLink(pageLink)).filter(isPresent) ?? []}
        />
      )

    case 'ComponentSectionsContact':
      return (
        <Contact
          title={section.title ?? undefined}
          description={section?.description ?? undefined}
          phone={section.phone ?? undefined}
          phoneLabel={section.phoneLabel ?? undefined}
          email={section.email ?? undefined}
          emailLabel={section.emailLabel ?? undefined}
          address={section.address ?? undefined}
        />
      )

    case 'ComponentSectionsAccordion':
      return (
        <>
          {section.title && <h1 className="flex justify-center pb-14 text-lg font-semibold">{section.title}</h1>}
          <div className="flex flex-col space-y-4">
            {groupByCategory(section.institutions ?? []).map((institution) => (
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
                      content={[file.firstColumn ?? '', file.secondColumn ?? '', file.thirdColumn ?? '']}
                      url={file.url ?? undefined}
                      urlLabel={file.urlLabel ?? undefined}
                    />
                  ))}
                </div>
              </AccordionItem>
            ))}

            {groupByCategory(section.flatText ?? []).map((text) => (
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
                    <div className="flex flex-col space-y-4 pl-10" key={i}>
                      <NarrowText
                        align={item.align ?? undefined}
                        width={item.width ?? undefined}
                        content={item.content ?? undefined}
                      />
                      {link?.url && link.title && <PageLinkButton className="pl-6" pageLink={link} />}
                    </div>
                  )
                })}
              </AccordionItem>
            ))}

            {groupByCategory(section.institutionsNarrow ?? []).map((text) => (
              <AccordionItem
                key={text.category}
                title={parseCategory(text.category).title}
                secondaryTitle={parseCategory(text.category).secondaryTitle}
              >
                <div className="grid grid-cols-1 gap-y-8 gap-x-7 md:grid-cols-3">
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

    case 'ComponentSectionsCalculator':
      return (
        <MinimumCalculator
          singleAdultValue={section.single_adult_value ?? 0}
          anotherAdultValue={section.another_adult_value ?? 0}
          childValue={section.child_value ?? 0}
        />
      )

    case 'ComponentSectionsListItems':
      return (
        <ListItems
          title={section.title ?? ''}
          listItems={
            section.listItems?.map((listItem) => ({
              content: listItem?.content ?? undefined,
              circleOption: listItem?.circleOption ?? 'primary',
              moreLink:
                parsePageLink({
                  title: listItem?.moreLinkTitle,
                  url: listItem?.moreLinkUrl,
                  page: listItem?.moreLinkPage,
                }) ?? undefined,
            })) ?? undefined
          }
        />
      )

    case 'ComponentSectionsNewsletter':
      return <NewsLetterSection />

    case 'ComponentSectionsVideos':
      return <Videos {...section} />

    case 'ComponentSectionsArticlesList':
      const { title, category, filtering } = section
      return <ArticlesList title={title} includesFiltering={filtering} category={category?.data?.attributes?.title} locale={locale} />

    case 'ComponentSectionsOrganizationalStructure':
      return <AdvancedAccordion {...section} />

    /*
    case 'ComponentSectionsIframe':
      return <Iframe {...section} />
    */

    default:
      return null
  }
}

const Section = ({ section, slug, locale }: { section: SectionsFragment | null; slug?: string; locale?: string }) => {
  if (!section) return null

  if (section.__typename === 'ComponentSectionsWaves')
    return (
      <Waves
        className={cx({
          'mt-14 md:mt-18': section.position === 'top',
        })}
        key={section.position}
        isRich={section.isRich ?? undefined}
        backgroundColor="var(--background-color)"
        waveColor="var(--secondary-color)"
        wavePosition={section.position ?? 'top'}
      />
    )

  if (section.__typename === 'ComponentSectionsNumericalList') {
    const { title, items, buttonText, buttonLink, variant, hasBackground } = section
    return (
      <NumericalListSection
        title={title}
        items={items}
        buttonText={buttonText}
        buttonLink={buttonLink}
        variant={variant}
        hasBackground={hasBackground}
      />
    )
  }

  // Not All sections has property hasBackground
  const hasBackground = (section as any).hasBackground ?? false

  return (
    <SectionContainer
      className={cx('pt-14 md:pt-18', {
        'pb-14 md:pb-18 bg-secondary': hasBackground === true,
      })}
      hasBackground={hasBackground}
    >
      {sectionContent(section, slug, locale)}
    </SectionContainer>
  )
}

const Sections = ({
  sections,
  slug,
  locale,
}: {
  sections: (SectionsFragment | null)[]
  slug?: string
  locale?: string
}) => {
  return (
    <>
      {sections.map((section, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Section key={index} section={section} slug={slug} locale={locale} />
      ))}
    </>
  )
}

export default Sections
