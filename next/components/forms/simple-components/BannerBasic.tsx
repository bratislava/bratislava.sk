import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import cx from 'classnames'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import Image from 'next/legacy/image'

import Button from './Button'

type BannerBase = {
  title: string
  content?: string
  imagePath?: string
  buttonPrimaryText?: string
  onPressPrimary?: () => void
  buttonSecondaryText?: string
  onPressSecondary?: () => void
  buttonTertiaryText?: string
  linkTertiary?: string
  textOrientation?: 'left' | 'right'
  className?: string
}

const BannerBasic = ({
  title,
  content,
  imagePath = '',
  buttonPrimaryText,
  onPressPrimary,
  buttonSecondaryText,
  onPressSecondary,
  buttonTertiaryText,
  linkTertiary,
  textOrientation = 'left',
  className,
}: BannerBase) => {
  const imageElement = (
    <div className="lg:h-auto relative h-[180px] w-full lg:w-1/2 flex justify-center items-center">
      <Image src={imagePath} alt="" layout="fill" objectFit="cover" />
    </div>
  )
  return (
    <div
      className={cx(
        'flex-col lg:flex-row flex h-full justify-between rounded-lg w-full max-w-screen-lg m-auto py-6 px-4 lg:py-0 lg:px-0 border-2',
        className,
      )}
    >
      {textOrientation === 'right' && imageElement}
      <div className="text-grey-800 w-full h-full flex flex-col lg:w-1/2 justify-center lg:mb-0">
        <div className="flex flex-col lg:p-12 gap-6">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-h4 lg:text-h4">{title}</h2>
            <AccountMarkdown content={content} variant="sm" className="text-p2 text-gray-700" />
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {onPressPrimary && (
              <>
                <Button
                  className="hidden lg:flex w-full"
                  endIcon={<ArrowRightIcon className="w-6 h-6" />}
                  variant="category"
                  text={buttonPrimaryText}
                  onPress={onPressPrimary}
                />
                <Button
                  className="flex lg:hidden"
                  endIcon={<ArrowRightIcon className="w-6 h-6" />}
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
                  endIcon={<ArrowRightIcon className="w-6 h-6" />}
                  variant="category-outline"
                  text={buttonSecondaryText}
                  onPress={onPressSecondary}
                />
                <Button
                  className="flex lg:hidden"
                  endIcon={<ArrowRightIcon className="w-6 h-6" />}
                  size="sm"
                  variant="category-outline"
                  text={buttonSecondaryText}
                  onPress={onPressSecondary}
                  fullWidth
                />
              </>
            )}
            {linkTertiary && buttonTertiaryText && (
              <>
                <Button
                  className="hidden lg:flex w-full"
                  variant="link-black"
                  fullWidth
                  href={linkTertiary}
                  label={buttonTertiaryText}
                />
                <Button
                  className="flex lg:hidden"
                  size="sm"
                  variant="link-black"
                  fullWidth
                  href={linkTertiary}
                  label={buttonTertiaryText}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {textOrientation === 'left' && imageElement}
    </div>
  )
}

export default BannerBasic
