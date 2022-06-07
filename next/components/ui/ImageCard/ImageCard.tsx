import cx from 'classnames'
import { ReactComponent as ArrowDoubleLong } from '../../../assets/images/arrow-double-long.svg'
import { ReactComponent as ArrowDoubleShort } from '../../../assets/images/arrow-double-short.svg'
import { ChairSpace } from '../ChairSpace/ChairSpace'

interface IProps {
  imageSrc?: string
  footerText?: string
  smallGapCapacity?: number
  bigGapCapacity?: number
  className?: string
  imagePosition?: 'left' | 'right'
}

/* <Image
      className="z-10 rounded-lg shadow-lg"
      width={445}
      height={381}
      src={imageSrc}
      alt="Priestor Name"
    /> */

export const ImageCard = ({
  className,
  imageSrc,
  imagePosition = 'left',
  smallGapCapacity,
  bigGapCapacity,
  footerText,
}: IProps) => {
  const imageLarge = imageSrc && <img alt="venue" src={imageSrc} height="381" width="445" />
  const imageSmall = imageSrc && <img alt="venue" src={imageSrc} height="293" width="350" />

  return (
    <div className={cx(className, 'relative rounded-lg')}>
      {imagePosition === 'left' && (
        <>
          <span className="hidden md:block z-20">{imageLarge}</span>
          <span className="md:hidden z-20">{imageSmall}</span>
        </>
      )}
      <div
        className={cx(
          'absolute rounded-lg font-medium bg-secondary text-red-universal-800 top-16',
          'lg:top-41 w-74 h-60 lg:w-90 lg:h-72',
          {
            'left-5 lg:left-48': imagePosition === 'left',
            'right-5 lg:right-48': imagePosition === 'right',
          }
        )}
      >
        {/* Bottom Component */}
        <p
          className={cx('absolute bottom-3 lg:bottom-6 w-56 md:w-64 text-base md:text-default text-center', {
            'right-0': imagePosition === 'right',
          })}
        >
          {footerText}
        </p>
        {/* Side Component */}
        <div
          className={cx('absolute top-6 flex text-base md:text-default flex-col gap-y-5 w-20 lg:w-24 text-center', {
            'right-0': imagePosition === 'left',
          })}
        >
          <ChairSpace
            icon={<ArrowDoubleShort />}
            className="flex flex-col items-center gap-2"
          >{`${smallGapCapacity}x`}</ChairSpace>
          <ChairSpace
            icon={<ArrowDoubleLong />}
            className="flex flex-col items-center gap-2"
          >{`${bigGapCapacity}x`}</ChairSpace>
        </div>
      </div>
      {imagePosition === 'right' && (
        <>
          <span className="hidden md:block z-20">{imageLarge}</span>
          <span className="md:hidden z-20">{imageSmall}</span>
        </>
      )}
    </div>
  )
}

export default ImageCard
