import BannerPhone from '@assets/images/banner-phone.png'
import CallIcon from '@assets/images/forms/call.svg'
import cx from 'classnames'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import Image from 'next/image'

import Button from './Button'

type BannerBase = {
  title: string
  buttonText?: string
  mobileNumber?: string
  content?: string
  onPress?: () => void
  className?: string
}

const Banner = ({
  title,
  content,
  buttonText = 'Button',
  mobileNumber = '',
  onPress,
  className,
}: BannerBase) => {
  return (
    <div
      className={cx(
        'm-auto flex h-full w-full max-w-screen-lg flex-col items-center justify-end rounded-none bg-gray-800 py-6 lg:flex-row lg:rounded-3xl lg:py-0',
        className,
      )}
    >
      <div className="mb-6 flex h-full w-full max-w-[488px] flex-col justify-center gap-6 rounded-l-3xl px-4 text-white md:px-0 lg:mb-0 lg:w-1/2">
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-h1 lg:text-h2">{title}</h2>
          <AccountMarkdown content={content} variant="sm" className="text-p2 text-gray-200" />
        </div>
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <Button
            className="hidden lg:flex"
            variant="category"
            text={buttonText}
            onPress={onPress}
          />
          <Button
            className="flex lg:hidden"
            size="sm"
            variant="category"
            text={buttonText}
            onPress={onPress}
            fullWidth
          />
          {mobileNumber && (
            <div className="flex items-center gap-2 px-3 py-2 text-gray-0">
              <CallIcon />
              <span className="text-p2-semibold">{mobileNumber}</span>
            </div>
          )}
        </div>
      </div>
      <div className="my-auto w-full sm:w-1/2">
        <Image src={BannerPhone} alt="" />
      </div>
    </div>
  )
}

export default Banner
