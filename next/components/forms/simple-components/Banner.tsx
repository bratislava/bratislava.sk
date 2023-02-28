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
        'flex-col lg:flex-row flex h-full items-center justify-end rounded-none lg:rounded-3xl bg-gray-800 w-full max-w-screen-lg m-auto py-6 lg:py-0',
        className,
      )}
    >
      <div className="lg:w-1/2 w-full max-w-[488px] text-white h-full flex flex-col justify-center rounded-l-3xl gap-6 px-4 md:px-0 mb-6 lg:mb-0">
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-h1 lg:text-h2">{title}</h2>
          <div className="text-p2 text-gray-200 flex items-center font-normal">{content}</div>
        </div>
        <Button className="hidden lg:flex" variant="category" text="Button" onPress={onPress} />
        <Button
          className="flex lg:hidden"
          size="sm"
          variant="category"
          text="Button"
          onPress={onPress}
        />
      </div>
      <div className="my-auto sm:w-1/2 w-full">
        <Image src={BannerPhone} />
      </div>
    </div>
  )
}

export default Banner
