import { ArrowLeftIcon, ArrowRightIcon } from '@assets/ui-icons'
import { UploadImageEntityFragment } from '@backend/graphql'
import StrapiImage from '@components/atoms/StrapiImage'
import Button from '@components/forms/simple-components/Button'
import GalleryModal, { ModalProps } from '@components/organisms/Gallery/GalleryModal'
import GallerySlider from '@components/organisms/Gallery/GallerySlider'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

export type ImageLightBoxProps = {
  images: UploadImageEntityFragment[]
  initialImageIndex: number
} & Omit<ModalProps, 'children'>

// copied from https://github.com/bratislava/mestskakniznica.sk/blob/master/next/modules/common/ImageGallery/ImageLightBox.tsx

const ImageLightBox = (props: ImageLightBoxProps) => {
  const { images, initialImageIndex, ...rest } = props

  const { isOpen } = rest

  const t = useTranslations('Gallery')

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
        description={t('aria.imageLightBoxDescription')}
        allowKeyboardNavigation={images.length > 1}
        initialPage={initialImageIndex}
        pages={images
          .filter((image) => image.attributes)
          .map(({ id, attributes }) => (
            <div
              key={id}
              className="container pointer-events-none m-auto flex h-full w-full max-w-6xl flex-col items-center justify-center md:px-[88px]"
            >
              <StrapiImage
                draggable="false"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-unnecessary-type-assertion
                image={attributes!}
                className="pointer-events-auto h-auto max-h-[86vh] w-full select-none object-contain"
                sizes="100vw"
              />
              {attributes?.caption !== attributes?.name && attributes?.caption && (
                <div className="mt-4 bg-white px-2.5 py-0.5">{attributes?.caption}</div>
              )}
            </div>
          ))}
        pagination={({ goToPrevious, goToNext }) => (
          <div className="container pointer-events-none absolute bottom-0 z-20 flex w-full max-w-6xl justify-between p-6 md:bottom-auto">
            {images.length > 1 && (
              <>
                <Button
                  variant="category"
                  className="pointer-events-auto rounded-full text-white"
                  aria-label={t('aria.previousImage')}
                  onPress={goToPrevious}
                  icon={<ArrowLeftIcon />}
                />

                <Button
                  variant="category"
                  className="pointer-events-auto rounded-full"
                  aria-label={t('aria.nextImage')}
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
