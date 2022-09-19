import { NewsLetter } from '@bratislava/ui-bratislava'
import cx from 'classnames'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next'

import NewsLetterImage from '../../../assets/images/newsletter-image.png'

interface IProps {
  className?: string
}

const NewsLetterSection = ({ className }: IProps) => {
  const { t } = useTranslation('newsletter')

  return (
    <div className={cx('flex w-full justify-center', className)}>
      <NewsLetter
        imageSrc={NewsLetterImage}
        checkBoxContent={t('newsletterCheckboxContent')}
        newsLetterContent={t('newsletterContent')}
        buttonLabel={t('newsletterButtonContent')}
      />
    </div>
  )
}

export default NewsLetterSection
