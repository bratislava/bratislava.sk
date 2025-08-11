import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useState } from 'react'
import { useOverlayTriggerState } from 'react-stately'

import { DirectionsIcon } from '@/src/assets/material-icons'
import Button from '@/src/components/common/Button/Button'
import ImageLightBox from '@/src/components/common/Gallery/ImageLightBox'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import PageHeader, { PageHeaderProps } from '@/src/components/common/PageHeader/PageHeader'
import { FacilityPageHeaderSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type Props = Pick<PageHeaderProps, 'title' | 'breadcrumbs' | 'headerLinks'> & {
  header: FacilityPageHeaderSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15693&t=6Ly8dzTTQQnnGlhN-4
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/sections/headers/PageHeaderGallery.tsx
 */

const PageHeaderFacility = ({ title, breadcrumbs, headerLinks, header }: Props) => {
  const { t } = useTranslation()

  const { address, navigateToLink, media } = header

  const filteredImages = media.filter(isDefined)
  const imageCount = filteredImages.length

  const overlayState = useOverlayTriggerState({ defaultOpen: false })
  const [initialImageIndex, setInitialImageIndex] = useState(0)

  const openAtImageIndex = useCallback(
    (index: number) => {
      setInitialImageIndex(index)
      overlayState.open()
    },
    [overlayState],
  )

  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs}>
        <div className="flex flex-col gap-6 lg:gap-8 lg:pb-6">
          <div className="flex flex-col gap-2 lg:gap-4">
            <Typography variant="h1">{title}</Typography>
            <div className="flex flex-wrap gap-x-3 empty:hidden">
              {address ? <Typography variant="p-small">{address}</Typography> : null}
              {navigateToLink ? (
                <Button
                  variant="link"
                  className="gap-1 text-left"
                  hasLinkIcon={false}
                  endIcon={<DirectionsIcon />}
                  href={navigateToLink}
                >
                  {t('PageHeaderFacility.navigate')}
                </Button>
              ) : null}
            </div>
          </div>
          {headerLinks?.length ? (
            <div className="flex flex-wrap gap-3">
              {headerLinks.map((headerLink, index) => (
                <Button
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  variant={index === 0 ? 'solid' : 'outline'}
                  fullWidthMobile
                  {...getLinkProps(headerLink)}
                />
              ))}
            </div>
          ) : null}
          {/* Screen: desktop */}
          <div className="max-lg:hidden">
            <div className="relative">
              <ul
                className={cn('grid gap-6', {
                  'grid-cols-2': imageCount === 2,
                  'grid-cols-3': imageCount > 2,
                })}
              >
                {filteredImages
                  .map((image, index) => (
                    <li
                      key={image.documentId}
                      className={cn('relative overflow-hidden rounded-xl', {
                        // keep the aspect-ratio of whole gallery consistent
                        'aspect-1216/440': imageCount === 1,
                        'aspect-596/440': imageCount === 2,
                        'aspect-808/440': imageCount > 2 && index === 0,
                        // first image is larger when displaying 3 images
                        'col-[1/3] row-[1/3]': imageCount > 2 && index === 0,
                        'col-[3/4] row-[1/2]': imageCount > 2 && index === 1,
                        'col-[3/4] row-[2/3]': imageCount > 2 && index === 2,
                      })}
                    >
                      <StrapiImage
                        image={image}
                        fill
                        sizes={index === 0 ? '70vw' : '30vw'}
                        className="z-1 object-cover"
                      />
                    </li>
                  ))
                  .filter(isDefined)
                  .slice(0, 3)}
                <div className="absolute right-4 bottom-4 z-1">
                  <Button variant="solid-inverted" onPress={() => openAtImageIndex(0)}>
                    {t('PageHeaderFacility.allPhotos')}
                  </Button>
                </div>
              </ul>
            </div>
          </div>
          {/* Screen: mobile */}
          <div className="lg:hidden">
            <div className="relative aspect-320/174 overflow-hidden rounded-lg">
              {filteredImages[0] ? (
                <StrapiImage
                  image={filteredImages[0]}
                  fill
                  sizes="100vw"
                  className="z-1 object-cover"
                />
              ) : (
                <ImagePlaceholder />
              )}
              <div className="absolute right-2 bottom-2 z-1 sm:right-3 sm:bottom-3">
                <Button variant="solid-inverted" onPress={() => openAtImageIndex(0)}>
                  {t('PageHeaderFacility.allPhotos')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageHeader>
      <ImageLightBox
        onClose={() => overlayState.close()}
        isOpen={overlayState.isOpen}
        images={filteredImages}
        initialImageIndex={initialImageIndex}
        isDismissable
      />
    </>
  )
}

export default PageHeaderFacility
