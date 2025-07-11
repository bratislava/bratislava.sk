/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import { Typography } from '@bratislava/component-library'
import { useCallback, useState } from 'react'
import { useOverlayTriggerState } from 'react-stately'

import StrapiImage from '@/src/components/common/Image/StrapiImage'
import { UploadImageEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isDefined } from '@/src/utils/isDefined'
import { onEnterOrSpaceKeyDown } from '@/src/utils/onEnterOrSpaceKeyDown'
import { useTailwindBreakpointValue } from '@/src/utils/useTailwindBreakpointValue'
import { useTranslation } from '@/src/utils/useTranslation'

import ImageLightBox from './ImageLightBox'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-35038&m=dev
 * inspired by MKB project https://github.com/bratislava/mestskakniznica.sk/blob/master/next/modules/common/ImageGallery/ImageGallery.tsx
 */

export type GalleryProps = {
  images: UploadImageEntityFragment[]
}

const Gallery = ({ images = [] }: GalleryProps) => {
  const { t } = useTranslation()

  const { isMobile } = useTailwindBreakpointValue()

  const imageCount = images.length

  // based on the number of images, some are shown and some may be hidden behind the "more images" button
  let smallImagesCount = imageCount
  if ((imageCount > 4 && isMobile) || (imageCount > 4 && imageCount < 8)) {
    smallImagesCount = 3
  } else if (imageCount > 8 && !isMobile) {
    smallImagesCount = 7
  }

  const smallImages = images.slice(0, smallImagesCount)

  // number of not displayed images
  const moreImagesCount = imageCount - smallImagesCount

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
      <div className="relative flex w-full flex-col">
        <div
          role="button"
          tabIndex={0}
          aria-label={t('Gallery.aria.openGallery')}
          onKeyUp={onEnterOrSpaceKeyDown(() => openAtImageIndex(0))}
          className={cn('outline-primary cursor-default outline-offset-2 focus:outline-4')}
        >
          {smallImages.length > 0 && (
            <div
              className={cn('grid grid-cols-2 gap-2 md:gap-8', {
                'md:grid-cols-2': imageCount === 1 || imageCount === 2,
                'md:grid-cols-3': imageCount === 3,
                'md:grid-cols-4': imageCount > 3,
              })}
            >
              {smallImages
                .map((image, index) => {
                  if (!image) return null

                  return (
                    <div
                      onClick={() => openAtImageIndex(index)}
                      key={image.documentId}
                      className={cn(
                        'relative aspect-square cursor-pointer overflow-hidden rounded-lg',
                        {
                          'md:aspect-592/400': imageCount === 1 || imageCount === 2,
                          'md:aspect-384/272': imageCount === 3,
                          'col-span-2 aspect-288/140': isMobile && imageCount === 3 && index === 0,
                        },
                      )}
                    >
                      <StrapiImage image={image} fill className="absolute top-0 object-cover" />
                    </div>
                  )
                })
                .filter(isDefined)}

              {/* more images button */}
              {moreImagesCount > 0 && (
                <div
                  onClick={() => openAtImageIndex(0)}
                  className="relative w-full cursor-pointer overflow-hidden rounded-lg border-2 border-action-content-default pt-[100%]"
                >
                  <div className="absolute top-0 flex size-full flex-col items-center justify-center gap-0.5 bg-white p-2 text-center">
                    <Typography variant="h2" as="p" className="font-semibold">
                      +{moreImagesCount}
                    </Typography>
                    <Typography variant="p-large" className="max-md:hidden">
                      {t('Gallery.morePhotos', { count: moreImagesCount })}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ImageLightBox
        onClose={() => overlayState.close()}
        isOpen={overlayState.isOpen}
        images={images}
        initialImageIndex={initialImageIndex}
        isDismissable
      />
    </>
  )
}

export default Gallery
