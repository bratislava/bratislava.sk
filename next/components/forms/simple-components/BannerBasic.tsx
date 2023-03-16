import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import cx from 'classnames'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import Image from 'next/legacy/image'

import Button from './Button'

type BannerBasicProps = {
  header: string
  content?: string | null
  imagePath?: string
  buttonPrimaryText?: string
  onPressPrimary?: () => void
  buttonSecondaryText?: string
  onPressSecondary?: () => void
  buttonTertiaryText?: string
  linkTertiary?: string
  textPosition?: 'left' | 'right'
  className?: string
}

const BannerBasic = ({
  header,
  content,
  imagePath = '',
  buttonPrimaryText,
  onPressPrimary,
  buttonSecondaryText,
  onPressSecondary,
  buttonTertiaryText,
  linkTertiary,
  textPosition = 'left',
  className,
}: BannerBasicProps) => {
  const imageElement = (
    <div className="lg:h-auto relative h-[180px] w-full lg:w-1/2 flex justify-center items-center">
      <Image src={imagePath} alt="" layout="fill" objectFit="cover" objectPosition="left" />
    </div>
  )
  return (
    <div
      className={cx(
        'flex-col lg:flex-row flex h-full justify-between rounded-lg max-w-screen-lg m-auto border-2 mx-4 lg:mx-0',
        className,
      )}
    >
      {textPosition === 'right' && imageElement}
      <div className="text-grey-800 w-full h-full flex flex-col lg:w-1/2 justify-center lg:mb-0 lg:p-12 py-6 px-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-h4 lg:text-h4">{header}</h2>
            {content && <AccountMarkdown content={content} className="text-gray-700" />}
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {onPressPrimary && buttonPrimaryText && (
              <>
                <Button
                  className="hidden lg:flex"
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
            {onPressSecondary && buttonSecondaryText && (
              <>
                <Button
                  className="hidden lg:flex"
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
                />
              </>
            )}
            {linkTertiary && buttonTertiaryText && (
              <>
                <Button
                  className="hidden lg:flex"
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
      {textPosition === 'left' && imageElement}
    </div>
  )
}

export default BannerBasic
