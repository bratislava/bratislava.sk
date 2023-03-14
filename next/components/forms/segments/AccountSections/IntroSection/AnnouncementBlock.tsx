import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import Button from 'components/forms/simple-components/Button'
import Image from 'next/legacy/image'
import { useTranslation } from 'next-i18next'

type ActualBlockBase = {
  announcementContent?: string
  imagePath?: string
  buttonTitle?: string
  onPress?: () => void
}

const AnnouncementBlock = ({
  announcementContent,
  imagePath = '',
  buttonTitle,
  onPress,
}: ActualBlockBase) => {
  const { t } = useTranslation('account')
  return announcementContent ? (
    <div className="mb-6 lg:mb-16 px-4 lg:px-0">
      <h2 className="text-h2 mb-4 lg:mb-6">{t('account_section_intro.announcement_title')}</h2>
      <div className="w-full border-2 border-gray-200 rounded-lg lg:rounded-3xl flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 lg:gap-6 p-4 lg:p-12">
          <div className="flex flex-col gap-2">
            <AccountMarkdown content={announcementContent} />
          </div>
          {buttonTitle && (
            <>
              <Button
                className="hidden lg:flex"
                endIcon={<ArrowRightIcon className="w-6 h-6" />}
                variant="category"
                text={buttonTitle}
                onPress={onPress}
              />
              <Button
                className="flex lg:hidden"
                size="sm"
                endIcon={<ArrowRightIcon className="w-5 h-5" />}
                variant="category"
                text={buttonTitle}
                onPress={onPress}
              />
            </>
          )}
        </div>
        <div className="lg:h-auto relative h-[180px] w-full lg:w-1/2 rounded-r-3xl flex justify-center items-center">
          <Image
            src={imagePath}
            className="rounded-r-3xl"
            layout="fill"
            priority
            objectFit="cover"
            objectPosition="left"
          />
        </div>
      </div>
      <div className="pt-6 lg:pt-16 border-b-2 border-gray-200" />
    </div>
  ) : null
}

export default AnnouncementBlock
