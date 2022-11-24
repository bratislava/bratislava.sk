import cx from 'classnames'

import { ImageCard } from '../ImageCard/ImageCard'
import { VenueInfo } from '../VenueInfo/VenueInfo'

export interface VenueProps {
  id?: string
  imageSrc?: string
  description?: string
  title?: string
  buttonTitle?: string
  linkTitle?: string
  imageCardPosition?: 'left' | 'right'
  className?: string
}

export const Venue = ({
  imageSrc,
  imageCardPosition = 'left',
  title,
  description,
  buttonTitle,
  linkTitle,
  className,
}: VenueProps) => {
  return (
    <div className={cx('flex flex-col lg:flex-row lg:items-center', className)}>
      {imageCardPosition === 'left' && imageSrc && (
        <ImageCard
          className="lg:h-96 lg:w-[450px]"
          imageSrc={imageSrc}
          smallGapCapacity={120}
          bigGapCapacity={60}
          footerText="Kapacita Venueu"
        />
      )}
      <div
        className={cx({
          'pl-5 pt-24 lg:pl-56': imageCardPosition === 'left',
          'pl-5 lg:pl-0 lg:pt-24 lg:pr-56': imageCardPosition === 'right',
        })}
      >
        {buttonTitle && linkTitle && (
          <VenueInfo
            className="w-[264px] lg:w-88"
            title={title}
            description={description}
            buttonTitle={buttonTitle}
            linkTitle={linkTitle}
          />
        )}
      </div>
      {imageCardPosition === 'right' && imageSrc && (
        <ImageCard
          className="relative lg:h-96 lg:w-[450px]"
          imageSrc={imageSrc}
          smallGapCapacity={120}
          bigGapCapacity={60}
          footerText="Kapacita Venueu"
          imagePosition="right"
        />
      )}
    </div>
  )
}

export default Venue
