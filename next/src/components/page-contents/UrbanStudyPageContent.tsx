import { Typography } from '@bratislava/component-library'
import slugify from '@sindresorhus/slugify'
import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'

import FileRowCard from '@/src/components/cards/FileRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Icon from '@/src/components/common/Icon/Icon'
import Links from '@/src/components/common/Links/Links'
import TableOfContents from '@/src/components/common/TableOfContents/TableOfContents'
import { TABLE_OF_CONTENTS_HEADING_ATTRIBUTE } from '@/src/components/common/TableOfContents/useHeadings'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { LinksSectionFragment, UrbanStudyEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { formatDate } from '@/src/utils/formatDate'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  urbanStudy: UrbanStudyEntityFragment
}

/**
 * Detail page for Urban Studies. Inspired by AssetPageContent (route /dokumenty/[slug]).
 * No Figma design available - layout mirrors the Assets detail page, extended with
 * a section per file group, a richtext body and related links.
 */
const UrbanStudyPageContent = ({ urbanStudy }: Props) => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const {
    title,
    year,
    body,
    preparedBy,
    publishedAt,
    updatedAt,
    briefFiles,
    commentsEvaluationFiles,
    writtenPartFiles,
    graphicPartFiles,
    attachmentFiles,
    links,
  } = urbanStudy

  const fileGroups = [
    { label: t('UrbanStudyPageContent.briefFiles'), files: briefFiles },
    { label: t('UrbanStudyPageContent.commentsEvaluationFiles'), files: commentsEvaluationFiles },
    { label: t('UrbanStudyPageContent.writtenPartFiles'), files: writtenPartFiles },
    { label: t('UrbanStudyPageContent.graphicPartFiles'), files: graphicPartFiles },
    { label: t('UrbanStudyPageContent.attachmentFiles'), files: attachmentFiles },
  ]
    .map((group) => ({ label: group.label, files: group.files.filter(isDefined) }))
    .filter((group) => group.files.length > 0)

  const detailItems = [
    { label: t('UrbanStudyPageContent.year'), value: year },
    { label: t('UrbanStudyPageContent.preparedBy'), value: preparedBy },
    { label: t('UrbanStudyPageContent.publishedAt'), value: formatDate(publishedAt) },
    { label: t('UrbanStudyPageContent.updatedAt'), value: formatDate(updatedAt) },
  ].filter((item) => !!item.value)

  const filteredLinks = links?.filter(isDefined) ?? []

  const metadata = [year, formatDate(updatedAt)].filter(isDefined)

  return (
    <>
      {/* Header */}
      <div className={cn('relative overflow-x-clip bg-background-passive-secondary')}>
        <div className="relative mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8">
          <div className="py-6 lg:py-8">
            <div className="flex flex-col items-start gap-4 lg:gap-6">
              <div className="rounded-2xl bg-background-passive-base p-4">
                <Icon name="folder" />
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

            {fileGroups.map((group) => (
              <div className="flex flex-col gap-4" key={group.label}>
                <Typography variant="h2" id={slugify(group.label)}>
                  {group.label}
                </Typography>
                <ul className="flex flex-col rounded-lg border py-2">
                  {group.files.map((file, index) => (
                    <Fragment key={file.documentId}>
                      {index > 0 ? (
                        <HorizontalDivider asListItem className="mx-4 lg:mx-6" />
                      ) : null}
                      <li className="w-full">
                        <FileRowCard
                          title={file.name}
                          downloadLink={file.url}
                          format={formatFileExtension(file.ext) ?? undefined}
                          size={formatFileSize(file.size, locale)}
                          uploadDate={formatDate(file.createdAt)}
                        />
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            ))}

            {detailItems.length > 0 ? (
              <>
                <HorizontalDivider />
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
              </>
            ) : null}

            {filteredLinks.length > 0 ? (
              <>
                <HorizontalDivider />
                <Links
                  title={t('UrbanStudyPageContent.linksTitle')}
                  // Urban study links use the CommonLink fragment, which is structurally compatible
                  // with getLinkProps used inside Links (typed for PageLink).
                  pageLinks={links as LinksSectionFragment['pageLinks']}
                />
              </>
            ) : null}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

export default UrbanStudyPageContent
