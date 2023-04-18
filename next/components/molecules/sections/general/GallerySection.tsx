import { ChevronDown } from '@assets/images'
import IconEye from '@assets/images/icon-eye-white.svg'
import { GallerySectionFragment } from '@bratislava/strapi-sdk-homepage'
import { HorizontalScrollWrapper, Modal } from '@bratislava/ui-bratislava'
import { isPresent } from '@utils/utils'
import cx from 'classnames'
import Image from 'next/legacy/image'
import { useTranslations } from 'next-intl'

import { useState } from 'react'

export interface GallerySectionProps {
  section: GallerySectionFragment
  className?: string
}

const GallerySection = ({
  section: { title, subtitle, galleryItems },
  className = '',
}: GallerySectionProps) => {
  const t = useTranslations()

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [showModalDetails, setShowModalDetails] = useState(false)

  const setCloseModal = () => {
    setCurrentIndex(null)
  }

  const setPrevModal = () => {
    if (currentIndex !== null) {
      setCurrentIndex(Math.max(currentIndex - 1, 0))
    }
  }

  const setNextModal = () => {
    if (currentIndex !== null && galleryItems) {
      setCurrentIndex(Math.min(currentIndex + 1, galleryItems.length - 1))
    }
  }

  const isPrevAvailable = () => {
    return currentIndex === null ? false : currentIndex > 0
  }

  const isNextAvailable = () => {
    return currentIndex !== null && galleryItems ? currentIndex < galleryItems.length - 1 : false
  }

  const currentItem = galleryItems && currentIndex !== null ? galleryItems[currentIndex] : undefined

  return (
    <div className={cx('component-gallery sm:mb-6')}>
      {title && (
        <div className="xs:text-default sm:text-title font-semibold sm:text-center">{title}</div>
      )}
      {subtitle && <div className="text-default mt-5 sm:mt-6 sm:text-center">{subtitle}</div>}

      <div className="relative mx-[-30px] block overflow-hidden sm:hidden">
        <HorizontalScrollWrapper className={cx(className, 'flex overflow-visible')}>
          <div className="mt-6 flex w-full snap-x snap-mandatory gap-3.5 overflow-visible overflow-x-scroll px-[30px] pb-7">
            {galleryItems?.filter(isPresent).map((image, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  className="group flex h-full w-full shrink-0 cursor-pointer snap-center content-center overflow-hidden rounded-lg shadow-lg last:snap-start"
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className=" relative h-full w-full ">
                    <div className="from-galleryFrom pointer-events-none invisible absolute z-10 flex h-full w-full bg-gradient-to-t to-transparent group-hover:visible">
                      <IconEye className="relative m-auto" />
                      <div className="absolute bottom-0 left-0 mx-8 mb-6 ">
                        {
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                          image.imgTitle && (
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            <div className="text-large-respo font-semibold text-white">
                              {image.imgTitle}
                            </div>
                          )
                        }
                        {
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                          image.imgSubtitle && (
                            <div className="text-default italic text-white opacity-75">
                              {image.imgSubtitle}
                            </div>
                          )
                        }
                      </div>
                    </div>
                    {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                      image?.media?.data?.attributes?.url && (
                        <Image
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                          src={image.media.data.attributes.url}
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                          alt={image.media.data.attributes.alternativeText ?? undefined}
                          width="350"
                          height="300"
                          layout="responsive"
                          objectFit="cover"
                          objectPosition="center"
                        />
                      )
                    }
                  </div>
                </button>
              )
            })}
          </div>
        </HorizontalScrollWrapper>
      </div>

      <div className="mb-8 mt-14 hidden w-full grid-cols-2 gap-8 sm:grid md:grid-cols-3">
        {galleryItems?.filter(isPresent).map((image, index) => (
          <button
            key={index}
            type="button"
            className="flex w-auto flex-col"
            onClick={() => setCurrentIndex(index)}
          >
            <div className="group relative h-full w-full cursor-pointer overflow-hidden rounded-lg shadow-lg">
              <div className="from-galleryFrom invisible absolute z-10 flex h-full w-full bg-gradient-to-t to-transparent group-hover:visible">
                <IconEye className="relative m-auto" />
                <div className="absolute bottom-0 left-0 mx-8 mb-6 ">
                  {image.imgTitle && (
                    <div className="text-default font-semibold text-white">{image.imgTitle}</div>
                  )}
                  {image.imgSubtitle && (
                    <div className="text-sm italic text-white opacity-75">{image.imgSubtitle}</div>
                  )}
                </div>
              </div>

              {image.media?.data?.attributes?.url && (
                <Image
                  src={image.media.data.attributes.url}
                  alt={image.media.data.attributes.alternativeText ?? undefined}
                  width="350"
                  height="300"
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="center"
                />
              )}
            </div>
          </button>
        ))}
      </div>
      {currentIndex !== null && (
        <Modal
          isOpen={currentItem != null}
          onClose={setCloseModal}
          onNext={setNextModal}
          showNextBtn={isNextAvailable()}
          onPrev={setPrevModal}
          showPrevBtn={isPrevAvailable()}
          closeButtonColor="#E46054"
          className=" z-50 overflow-hidden rounded-2xl"
        >
          {currentItem && (
            <div className="modal-content-rent overflow-y-auto xs:h-[calc(100vh-120px)] xs:w-[calc(100vw-100px)]  md:max-h-[951px] lg:w-[1000px] xl:w-[1110px]">
              <div className="from-galleryFrom absolute z-[9] flex h-full w-full overflow-hidden rounded-2xl bg-gradient-to-t via-transparent to-white">
                <div className="absolute inset-x-0 bottom-0 mx-8 mb-10 text-center md:mx-24 md:text-left">
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    currentItem.imgTitle && (
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                      <div className="text-large-respo font-semibold text-white">
                        {currentItem.imgTitle}
                      </div>
                    )
                  }
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    currentItem.imgSubtitle && (
                      <div className="text-small font-bold italic text-white opacity-75">
                        {
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                          currentItem.imgSubtitle
                        }
                      </div>
                    )
                  }
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    currentItem.imgSubtext && (
                      <div className="text-default mt-6 hidden text-white md:block">
                        {currentItem.imgSubtext}
                      </div>
                    )
                  }
                  {currentItem.imgSubtext && showModalDetails && (
                    <div className="text-default mt-6 block text-white md:hidden">
                      {currentItem.imgSubtext}
                    </div>
                  )}
                  {currentItem.imgSubtext && (
                    <div className="text-small m-auto mb-4 mt-5 block font-semibold text-white md:hidden">
                      <button
                        type="button"
                        className="underline underline-offset-2 "
                        onClick={() => setShowModalDetails(!showModalDetails)}
                      >
                        {showModalDetails ? t('menu.show_less') : t('menu.show_more')}
                      </button>
                      <ChevronDown
                        className={cx('ml-4 inline ', {
                          'rotate-180': showModalDetails,
                        })}
                      />
                    </div>
                  )}
                </div>
              </div>

              {currentItem.media && currentItem.media?.data?.attributes?.url && (
                <Image
                  className="rounded-2xl "
                  src={currentItem.media.data.attributes.url}
                  alt={currentItem.media.data.attributes.alternativeText ?? undefined}
                  width="1110"
                  height="951"
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}

export default GallerySection
