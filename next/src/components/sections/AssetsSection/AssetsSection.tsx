import { useTranslation } from 'next-i18next'
import React, { Fragment } from 'react'

import DocumentRowCard from '@/src/components/cards/DocumentRowCard'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import AssetsAll from '@/src/components/sections/AssetsSection/AssetsAll'
import { AssetsSectionFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'

type Props = {
  section: AssetsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16920-16879&t=NS3WUvx90JDmQIlG-0
 */

const AssetsSection = ({ section }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { title, text, assets, showAll, titleLevelAssetsSection: titleLevel } = section

  if (showAll) {
    return (
      <SectionContainer>
        <AssetsAll section={section} />
      </SectionContainer>
    )
  }

  const filteredAssets = assets.filter(isDefined)

  return (
    <SectionContainer>
      <div className="flex flex-col gap-4 lg:gap-6">
        <SectionHeader title={title} titleLevel={titleLevel} text={text} />

        <ul className="flex flex-col rounded-lg border py-2">
          {filteredAssets
            .map((asset, index) => {
              const { title: assetTitle, files, assetCategory, slug, updatedAt, documentId } = asset

              const filteredFiles = files.filter(isDefined)
              const isSingleFile = filteredFiles.length === 1

              const { size, url, ext } = filteredFiles[0]

              return (
                <Fragment key={documentId}>
                  {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                  <li className="w-full">
                    <DocumentRowCard
                      linkHref={isSingleFile ? (url ?? '#') : `/dokumenty/${slug}`}
                      title={assetTitle}
                      cardTitleLevel={getCardTitleLevel(titleLevel)}
                      variant={isSingleFile ? 'single-file' : 'multiple-files'}
                      className="px-4 lg:px-6"
                      ariaLabel={
                        isSingleFile
                          ? t('FileList.aria.downloadFileAriaLabel', {
                              title: assetTitle,
                              format: formatFileExtension(ext),
                              size: formatFileSize(size, locale),
                            })
                          : t('AssetsSection.openAssetPage', { title: assetTitle })
                      }
                      metadata={
                        isSingleFile
                          ? [
                              formatDate(updatedAt),
                              assetCategory?.title,
                              formatFileExtension(ext),
                              formatFileSize(size, locale),
                            ].filter(isDefined)
                          : [
                              formatDate(updatedAt),
                              assetCategory?.title,
                              t('AssetPageContent.numberOfFiles', {
                                count: filteredFiles.length,
                              }),
                            ].filter(isDefined)
                      }
                    />
                  </li>
                </Fragment>
              )
            })
            .filter(isDefined)}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default AssetsSection
