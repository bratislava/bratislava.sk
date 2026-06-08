import { Typography } from '@bratislava/component-library'
import slugify from '@sindresorhus/slugify'
import { useTranslation } from 'next-i18next'
import { Fragment, useMemo } from 'react'

import Breadcrumbs, { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import { getPageBreadcrumbs } from '@/src/components/common/Breadcrumbs/getPageBreadcrumbs'
import FileList from '@/src/components/common/FileList/FileList'
import Links from '@/src/components/common/Links/Links'
import Pictogram from '@/src/components/common/Pictogram/Pictogram'
import Regulations from '@/src/components/common/Regulations/Regulations'
import TableOfContents from '@/src/components/common/TableOfContents/TableOfContents'
import { TABLE_OF_CONTENTS_HEADING_ATTRIBUTE } from '@/src/components/common/TableOfContents/useHeadings'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { FileBlockFragment, LinksSectionFragment, UrbanStudyEntityFragment, } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'
import { useUrbanStudyTypeTranslationMap } from '@/src/utils/useUrbanStudyTypeTranslationMap'

type Props = {
  urbanStudy: UrbanStudyEntityFragment
}

/**
 * Detail page for Urban Studies. Inspired by AssetPageContent (route /dokumenty/[slug]).
 * No Figma design available - layout mirrors the Assets detail page, extended with
 * file item sections, richtext body/approval text, related regulations and links.
 */
const UrbanStudyPageContent = ({ urbanStudy }: Props) => {
  const { t } = useTranslation()

  const {
    title,
    year,
    urbanStudyType,
    procuredBy,
    preparedBy,
    body,
    approvalText,
    publishedAt,
    updatedAt,
    urbanStudyParts,
    regulations,
    links,
  } = urbanStudy

  const urbanStudyTypeTranslationMap = useUrbanStudyTypeTranslationMap()
  const urbanStudyTypeLabel = urbanStudyType
    ? urbanStudyTypeTranslationMap[urbanStudyType]
    : undefined

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
    { label: t('UrbanStudyPageContent.publishedAt'), value: formatDate(publishedAt) },
    { label: t('UrbanStudyPageContent.updatedAt'), value: formatDate(updatedAt) },
  ].filter((item) => !!item.value)

  const filteredParts = urbanStudyParts?.filter(isDefined) ?? []
  const filteredRegulations = regulations?.filter(isDefined) ?? []
  const filteredLinks = links?.filter(isDefined) ?? []

  const metadata = [urbanStudyTypeLabel, year, formatDate(updatedAt)].filter(isDefined)

  return (
    <>
      <div className="bg-background-passive-secondary">
        <SectionContainer>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </SectionContainer>
      </div>

      {/* Header */}
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

            {filteredParts.map((part, index) => (
              <FileList
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={part.title}
                text={part.text}
                // UrbanStudyPartItem (blocks.urban-study-part-item) is structurally compatible
                // with FileBlock (blocks.file) expected by FileList.
                files={(part.items?.filter(isDefined) ?? []) as FileBlockFragment[]}
              />
            ))}

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
                <div className="flex flex-col gap-4">
                  {detailItems.map(({ label, value }, index) => (
                    <div className="flex flex-col flex-wrap sm:flex-row sm:gap-x-6" key={index}>
                      <Typography className="basis-1/3">{`${label}:`}</Typography>
                      <Typography>{value}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {filteredRegulations.length > 0 ? (
              <Regulations regulations={filteredRegulations} />
            ) : null}

            {filteredLinks.length > 0 ? (
              <Links
                title={t('UrbanStudyPageContent.linksTitle')}
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
