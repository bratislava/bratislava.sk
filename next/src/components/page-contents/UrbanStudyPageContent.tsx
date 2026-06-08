import { Typography } from '@bratislava/component-library'
import slugify from '@sindresorhus/slugify'
import { useTranslation } from 'next-i18next'
import { Fragment, useMemo } from 'react'

import DocumentRowCard from '@/src/components/cards/DocumentRowCard'
import Breadcrumbs, { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import { getPageBreadcrumbs } from '@/src/components/common/Breadcrumbs/getPageBreadcrumbs'
import DescriptionList from '@/src/components/common/DescriptionList/DescriptionList'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Links from '@/src/components/common/Links/Links'
import Pictogram from '@/src/components/common/Pictogram/Pictogram'
import Regulations from '@/src/components/common/Regulations/Regulations'
import TableOfContents from '@/src/components/common/TableOfContents/TableOfContents'
import { TABLE_OF_CONTENTS_HEADING_ATTRIBUTE } from '@/src/components/common/TableOfContents/useHeadings'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { LinksSectionFragment, UrbanStudyEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useUrbanStudyTypeLabel } from '@/src/utils/useUrbanStudyTypeTranslationMap'

type Props = {
  urbanStudy: UrbanStudyEntityFragment
}

/**
 * Detail page for Urban Studies. Inspired by AssetPageContent (route /dokumenty/[slug]).
 * No Figma design available.
 */
const UrbanStudyPageContent = ({ urbanStudy }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const {
    title,
    year,
    urbanStudyType,
    procuredBy,
    preparedBy,
    body,
    approvalText,
    updatedAt,
    urbanStudyParts,
    regulations,
    links,
  } = urbanStudy

  const getUrbanStudyTypeLabel = useUrbanStudyTypeLabel()
  const urbanStudyTypeLabel = getUrbanStudyTypeLabel(urbanStudyType)

  const { general } = useGeneralContext()
  const urbanStudiesPage = general?.urbanStudiesPage

  const breadcrumbs = useMemo(() => {
    return [
      ...(urbanStudiesPage ? getPageBreadcrumbs(urbanStudiesPage) : []),
      { title, path: null } as Breadcrumb,
    ]
  }, [title, urbanStudiesPage])

  const detailItems = [
    { label: t('UrbanStudyPageContent.type'), value: urbanStudyTypeLabel },
    { label: t('UrbanStudyPageContent.year'), value: year },
    { label: t('UrbanStudyPageContent.procuredBy'), value: procuredBy },
    { label: t('UrbanStudyPageContent.preparedBy'), value: preparedBy },
  ].filter((item) => !!item.value)

  const filteredParts = urbanStudyParts?.filter(isDefined) ?? []
  const filteredRegulations = regulations?.filter(isDefined) ?? []
  const filteredLinks = links?.filter(isDefined) ?? []

  const metadata = [urbanStudyTypeLabel, year].filter(isDefined)

  return (
    <>
      <div className="bg-background-passive-secondary">
        <SectionContainer>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </SectionContainer>
      </div>

      <div className={cn('relative overflow-x-clip bg-background-passive-secondary')}>
        <div className="relative mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8">
          <div className="py-6 lg:py-8">
            <div className="flex flex-col items-start gap-4 lg:gap-6">
              <div className="rounded-2xl bg-background-passive-base p-2">
                <Pictogram iconName="urban_study" className="size-10 lg:size-12" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="h1">{title}</Typography>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                  {metadata.map((item, index) => (
                    <Fragment key={index}>
                      {index > 0 ? (
                        <div
                          className="size-1 rounded-full bg-content-passive-secondary max-sm:hidden"
                          aria-hidden
                        />
                      ) : null}
                      <Typography>{item}</Typography>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionContainer className="py-6 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <aside className="w-full lg:sticky lg:top-12 lg:order-last lg:w-80 lg:shrink-0">
            <TableOfContents />
          </aside>

          <div
            {...TABLE_OF_CONTENTS_HEADING_ATTRIBUTE}
            className="flex w-full max-w-200 flex-col gap-8 lg:gap-10"
          >
            {body ? <Markdown content={body} /> : null}

            {filteredParts.map((part, partIndex) => {
              const partItems = part.items?.filter(isDefined) ?? []

              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="flex flex-col gap-4 lg:gap-6" key={partIndex}>
                  <SectionHeader title={part.title} text={part.text} />

                  {/* TODO We should deduplicate usage of DocumentRowCard by some more generic FE section component*/}
                  <ul className="flex flex-col rounded-lg border py-2">
                    {partItems.map((item, index) => {
                      const { media, title: itemTitle } = item

                      return (
                        <Fragment key={item.id}>
                          {index > 0 ? (
                            <HorizontalDivider asListItem className="mx-4 lg:mx-6" />
                          ) : null}
                          <li className="w-full">
                            <DocumentRowCard
                              variant="single-file"
                              title={itemTitle ?? media.name}
                              linkHref={media.url}
                              className="px-4 lg:px-6"
                              metadata={[
                                formatFileExtension(media.ext),
                                formatFileSize(media.size, locale),
                              ].filter(isDefined)}
                            />
                          </li>
                        </Fragment>
                      )
                    })}
                  </ul>
                </div>
              )
            })}

            {approvalText ? (
              <div className="flex flex-col gap-4">
                <Markdown content={approvalText} />
              </div>
            ) : null}

            {detailItems.length > 0 ? (
              <div className="flex flex-col gap-4">
                <Typography variant="h2" id={slugify(t('UrbanStudyPageContent.detailsTitle'))}>
                  {t('UrbanStudyPageContent.detailsTitle')}
                </Typography>
                <DescriptionList items={detailItems} />
              </div>
            ) : null}

            {filteredRegulations.length > 0 ? (
              <Regulations regulations={filteredRegulations} />
            ) : null}

            {filteredLinks.length > 0 ? (
              <Links
                title={t('UrbanStudyPageContent.linksTitle')}
                // TODO fix types
                // Urban study links use the CommonLink fragment, which is structurally compatible
                // with getLinkProps used inside Links (typed for PageLink).
                pageLinks={links as LinksSectionFragment['pageLinks']}
              />
            ) : null}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default UrbanStudyPageContent
