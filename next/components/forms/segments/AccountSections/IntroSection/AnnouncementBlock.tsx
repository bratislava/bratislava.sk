import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import Button from 'components/forms/simple-components/Button'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

type ActualBlockBase = {
  title?: string
  text?: string
  imagePath?: string
  buttonTitle?: string
  onPress?: () => void
}

const AnnouncementBlock = ({
  text,
  title,
  imagePath = '',
  buttonTitle,
  onPress,
}: ActualBlockBase) => {
  const isDisplay = text || title || imagePath
  const { t } = useTranslation('account')
  return isDisplay ? (
    <div className="w-full max-w-screen-1.5lg m-auto mb-6 lg:mb-16 px-4 1.5lg:px-0">
      <h2 className="text-h2 mb-4 lg:mb-6">{t('account_section_intro.announcement_title')}</h2>
      <div className="w-full border-2 border-gray-200 rounded-lg lg:rounded-3xl flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 lg:gap-6 p-4 lg:p-12">
          <div className="flex flex-col gap-2">
            <h4 className="text-h4">{title}</h4>
            <p className="text-p2">{text}</p>
          </div>
          {buttonTitle && (
            <>
              <Button
                className="hidden lg:flex"
                endIcon={<ArrowRightIcon />}
                variant="category"
                text={buttonTitle}
                onPress={onPress}
              />
              <Button
                className="flex lg:hidden"
                size="sm"
                endIcon={<ArrowRightIcon />}
                variant="category"
                text={buttonTitle}
                onPress={onPress}
              />
            </>
          )}
        </div>
        <div className="lg:h-auto relative h-[180px] w-full lg:w-1/2 rounded-r-3xl flex justify-center items-center">
          <Image src={imagePath} alt="" layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className="pt-6 lg:pt-16 border-b-2 border-gray-200" />
    </div>
  ) : null
}

export default AnnouncementBlock
