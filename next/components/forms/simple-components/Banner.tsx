import BannerPhone from '@assets/images/banner-phone.png'
import cx from 'classnames'
import Image from 'next/image'

import Button from './Button'

type BannerBase = {
  title: string
  content: string
  onPress?: () => void
  className?: string
}

const Banner = ({ title, content, onPress, className }: BannerBase) => {
  return (
    <div
      className={cx(
        'flex-col sm:flex-row flex h-full items-start justify-center gap-8 rounded-3xl bg-gray-800',
        className,
      )}
    >
      <div className="sm:w-1/2 w-full text-white h-full flex flex-col rounded-l-3xl items-start p-12 sm:py-24 sm:pr-0 sm:pl-24 gap-6">
        <div className="flex flex-col items-start gap-3">
          <div className="text-h-xl font-semibold">{title}</div>
          <div className="text-p2 text-gray-200 flex items-center font-normal">
            {content}
          </div>
        </div>
        <Button variant="negative" size="lg" text="Button" onPress={onPress} />
      </div>
      <div className="my-auto sm:w-1/2 w-full">
        <Image src={BannerPhone} />
      </div>
    </div>
  )
}

export default Banner
