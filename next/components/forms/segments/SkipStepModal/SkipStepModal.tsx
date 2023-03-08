import CloseIcon from '@assets/images/forms/close-thin.svg'
import ErrorIcon from '@assets/images/forms/error-icon.svg'
import cx from 'classnames'
import Button from 'components/forms/simple-components/Button'
import { useTranslation } from 'next-i18next'

type SkipStepModalBase = {
  show: boolean
  onClose: () => void
  onSkip?: () => void
  className?: string
}

const SkipStepModal = ({ show, onClose, onSkip, className }: SkipStepModalBase) => {
  const { t } = useTranslation('forms')

  if (!show) {
    return null
  }
  return (
    <div
      className="h-full fixed w-full z-50 top-0 flex items-center justify-center"
      style={{ background: 'rgba(var(--color-gray-800), .4)', marginTop: '0' }}
      onClick={() => {
        onClose()
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cx(
          'md:h-min w-full max-w-none h-full md:max-w-[592px] rounded-none md:rounded-2xl bg-gray-0 px-4 md:px-6 pt-12 md:py-6 relative mx-0 md:mx-4 overflow-auto',
          className,
        )}
      >
        <div className="flex flex-col gap-2">
          <CloseIcon
            onClick={() => onClose()}
            className="cursor-pointer absolute top-3 right-3 md:top-4 md:right-4"
          />
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <span className="min-w-[56px] w-14 h-14 rounded-full bg-negative-100 flex items-center justify-center">
                <ErrorIcon />
              </span>
              <div>
                <h5 className="text-h5 h-14 flex items-center">{t('skip_step_modal.title')}</h5>
                <p className="text-p2">{t('skip_step_modal.text')}</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-6">
              <Button
                text={t('skip_step_modal.button_skip_text')}
                variant="plain-black"
                onPress={onSkip}
              />
              <Button
                text={t('skip_step_modal.button_submit_text')}
                variant="negative"
                size="sm"
                onPress={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkipStepModal
