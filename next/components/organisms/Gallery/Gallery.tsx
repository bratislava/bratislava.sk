/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import { UploadImageEntityFragment } from '@backend/graphql'
import StrapiImage from '@components/atoms/StrapiImage'
import { onEnterOrSpaceKeyDown } from '@utils/onEnterOrSpaceKeyDown'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'
import { useOverlayTriggerState } from 'react-stately'
import screens from 'tailwind.config.screens'
import { useWindowSize } from 'usehooks-ts'

import ImageLightBox from './ImageLightBox'

// inspired by MKB project https://github.com/bratislava/mestskakniznica.sk/blob/master/next/modules/common/ImageGallery/ImageGallery.tsx

export type GalleryProps = {
  images: UploadImageEntityFragment[]
}

const Gallery = ({ images = [] }: GalleryProps) => {
  const t = useTranslations('Gallery')

  const { width: windowWidth } = useWindowSize()
  // TODO refactor to use som custom hook
  const isMobile = windowWidth < parseInt(screens.md.slice(0, -2), 10)

  const thumbnailCount = isMobile ? 4 : 8

  // number of not displayed images
  const moreImagesCount = Math.max(images.length - thumbnailCount + 1, 0)

  // if <=8, show all, else show 7 and "more button"
  const smallImages = images.slice(0, moreImagesCount > 1 ? thumbnailCount - 1 : thumbnailCount + 1)

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
          aria-label={t('aria.openGallery')}
          onKeyUp={onEnterOrSpaceKeyDown(() => openAtImageIndex(0))}
          className={cx('outline-primary cursor-default outline-offset-2 focus:outline-4')}
        >
          {smallImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-8">
              {smallImages
                .filter((image) => image.attributes)
                .map((image, index) => (
                  <div
                    onClick={() => openAtImageIndex(index)}
                    key={image.id}
                    className="relative h-[100%] w-full cursor-pointer overflow-hidden rounded-lg pt-[100%] shadow-lg"
                  >
                    <StrapiImage
                      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                      image={image.attributes!}
                      fill
                      className="absolute top-0 object-cover"
                    />
                  </div>
                ))}

              {/* more images button */}
              {moreImagesCount > 1 && (
                <div
                  onClick={() => openAtImageIndex(0)}
                  className="relative w-full cursor-pointer overflow-hidden rounded-lg border-2 border-category-700 pt-[100%]"
                >
                  <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-0.5 bg-white p-2 text-center">
                    <div className="text-h2 font-semibold">+{moreImagesCount}</div>
                    <div className="text-large-respo">
                      {t('morePhotos', { count: moreImagesCount })}
                    </div>
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
