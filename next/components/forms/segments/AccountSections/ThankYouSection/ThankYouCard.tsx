import DisableIcon from '@assets/images/account/disable-icon.svg'
import DoneIcon from '@assets/images/account/done-icon.svg'
import ErrorIcon from '@assets/images/account/error-cross.svg'
import RestartIcon from '@assets/images/account/sync-icon.svg'
import cx from 'classnames'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import Button from 'components/forms/simple-components/Button'
import { useTranslation } from 'next-i18next'

type ThankYouCardBase = {
  status?: 'success' | 'error-1' | 'error-2' | 'error-3' | 'error-4'
  title?: string
  content?: string
}

const ThankYouCard = ({ status, title, content }: ThankYouCardBase) => {
  const { t } = useTranslation('account')
  return (
    <div className="max-w-[734px] lg:max-w-[800px] w-full h-full mx-auto bg-gray-0 px-4 md:px-14 pb-4 pt-6 md:py-12 flex flex-col items-center gap-4 md:gap-6 rounded-none md:rounded-2xl">
      <span
        className={cx(
          'min-w-14 md:min-w-[88px] w-14 md:w-[88px] h-14 md:h-[88px] bg-negative-100 flex justify-center items-center rounded-full',
          {
            'bg-negative-100': status?.includes('error'),
            'bg-success-100': status === 'success',
          },
        )}
      >
        {status !== 'success' ? (
          <ErrorIcon className="w-8 md:w-10 h-8 md:h-10 flex justify-center items-center" />
        ) : (
          <DoneIcon className="w-8 md:w-10 h-8 md:h-10 flex justify-center items-center" />
        )}
      </span>
      <div className="flex flex-col items-center gap-4 md:gap-3">
        <h2 className="text-h2">{title}</h2>
        <AccountMarkdown variant="sm" className="text-center" content={content} />
      </div>
      <div className="w-full flex flex-col sm:flex-row items-center gap-4 px-0 md:px-24">
        {status !== 'success' ? (
          <>
            <Button
              startIcon={<RestartIcon />}
              text={t('thank_you.error.button_restart_text')}
              fullWidth
            />
            <Button
              startIcon={<DisableIcon />}
              variant="black-outline"
              text={t('thank_you.error.button_cancel_text')}
              fullWidth
            />
          </>
        ) : (
          <>
            <Button text={t('thank_you.success.button_to_formular_text')} fullWidth />
            <Button
              variant="black-outline"
              text={t('thank_you.success.button_to_profil_text')}
              fullWidth
            />
          </>
        )}
      </div>
    </div>
  )
}

export default ThankYouCard
