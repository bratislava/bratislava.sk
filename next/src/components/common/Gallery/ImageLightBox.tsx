import { useEffect, useRef } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from 'src/assets/icons'

import Button from '@/src/components/common/Button/Button'
import GalleryModal, { ModalProps } from '@/src/components/common/Gallery/GalleryModal'
import GallerySlider from '@/src/components/common/Gallery/GallerySlider'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import { UploadImageEntityFragment } from '@/src/services/graphql'
import { useTranslation } from '@/src/utils/useTranslation'

export type ImageLightBoxProps = {
  images: UploadImageEntityFragment[]
  initialImageIndex: number
} & Omit<ModalProps, 'children'>

// copied from https://github.com/bratislava/mestskakniznica.sk/blob/master/next/modules/common/ImageGallery/ImageLightBox.tsx

const ImageLightBox = (props: ImageLightBoxProps) => {
  const { images, initialImageIndex, ...rest } = props

  const { isOpen } = rest

  const { t } = useTranslation()

  const sliderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      sliderRef.current?.focus()
    }
  }, [isOpen])

  return (
    // TODO is this pointer-events-none/auto necessary
    <GalleryModal overlayClassName="w-full h-screen pointer-events-none" showCloseButton {...rest}>
      <GallerySlider
        ref={sliderRef}
        description={t('Gallery.aria.imageLightBoxDescription')}
        allowKeyboardNavigation={images.length > 1}
        initialPage={initialImageIndex}
        pages={images.map((image) => (
          <div
            key={image.documentId}
            className="pointer-events-none container m-auto flex size-full max-w-6xl flex-col items-center justify-center md:px-[88px]"
          >
            <StrapiImage
              draggable="false"
               
              image={image}
              className="pointer-events-auto h-auto max-h-[86vh] w-full object-contain select-none"
              sizes="100vw"
            />
            {image.caption !== image.name && image.caption && (
              <div className="mt-4 bg-white px-2.5 py-0.5">{image.caption}</div>
            )}
          </div>
        ))}
        pagination={({ goToPrevious, goToNext }) => (
          <div className="pointer-events-none absolute bottom-0 z-20 container flex w-full max-w-6xl justify-between p-6 md:bottom-auto">
            {images.length > 1 && (
              <>
                <Button
                  variant="solid-inverted"
                  className="pointer-events-auto rounded-full"
                  aria-label={t('Gallery.aria.previousImage')}
                  onPress={goToPrevious}
                  icon={<ArrowLeftIcon />}
                />

                <Button
                  variant="solid-inverted"
                  className="pointer-events-auto rounded-full"
                  aria-label={t('Gallery.aria.nextImage')}
                  onPress={goToNext}
                  icon={<ArrowRightIcon />}
                />
              </>
            )}
          </div>
        )}
      />
    </GalleryModal>
  )
}

export default ImageLightBox
