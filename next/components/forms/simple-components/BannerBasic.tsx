import BannerPhone from '@assets/images/banner-phone.png'
import cx from 'classnames'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import Image from 'next/image'

import Button from './Button'

type BannerBase = {
  title: string
  content?: string
  buttonPrimaryText?: string
  onPressPrimary?: () => void
  buttonSecondaryText?: string
  onPressSecondary?: () => void
  orientation?: 'left' | 'right'
  className?: string
}

const BannerBasic = ({
  title,
  content,
  buttonPrimaryText,
  onPressPrimary,
  buttonSecondaryText,
  onPressSecondary,
  orientation = 'left',
  className,
}: BannerBase) => {
  const imageElement = (
    <div className="my-auto sm:w-1/2 w-full">
      <Image src={BannerPhone} />
    </div>
  )
  return (
    <div
      className={cx(
        'flex-col lg:flex-row flex h-full items-center justify-between rounded-lg w-full max-w-screen-lg m-auto py-6 px-4 lg:py-0 lg:px-0 border-2',
        className,
      )}
    >
      {orientation === 'right' && imageElement}
      <div className="text-grey-800 w-full h-full flex flex-col lg:w-1/2 justify-center rounded-l-3xl gap-6 lg:p-12 lg:mb-0">
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-h1 lg:text-h2">{title}</h2>
          <AccountMarkdown content={content} variant="sm" className="text-p2 text-gray-700" />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {onPressPrimary && (
            <>
              <Button
                className="hidden lg:flex w-full"
                variant="category"
                text={buttonPrimaryText}
                onPress={onPressPrimary}
              />
              <Button
                className="flex lg:hidden"
                size="sm"
                variant="category"
                text={buttonPrimaryText}
                onPress={onPressPrimary}
                fullWidth
              />
            </>
          )}
          {onPressSecondary && (
            <>
              <Button
                className="hidden lg:flex w-full"
                variant="category-outline"
                text={buttonSecondaryText}
                onPress={onPressSecondary}
              />
              <Button
                className="flex lg:hidden"
                size="sm"
                variant="category-outline"
                text={buttonSecondaryText}
                onPress={onPressSecondary}
                fullWidth
              />
            </>
          )}
        </div>
      </div>
      {orientation === 'left' && imageElement}
    </div>
  )
}

export default BannerBasic
