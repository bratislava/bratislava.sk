import LeftIcon from '@assets/images/chevron-left.svg'
import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import { useTranslation } from 'next-i18next'

import Button from '../../simple-components/Button'

interface StepButtonGroupProps {
  stepIndex: number
  isFinalStep: boolean
  previous: () => void
  skip: () => void
  submitStep: () => void
  submitForm: () => void
}

const StepButtonGroup = (props: StepButtonGroupProps) => {
  const { stepIndex, isFinalStep, previous, skip, submitStep, submitForm } = props
  const [t] = useTranslation('forms')

  return (
    <div className="flex flex-row gap-5">
      <div className="grow">
        {stepIndex !== 0 && (
          <Button
            variant="plain-black"
            onPress={previous}
            text={t('buttons.previous')}
            startIcon={<LeftIcon />}
          />
        )}
      </div>
      {isFinalStep ? (
        <Button onPress={submitForm} text={t('buttons.send')} />
      ) : (
        <>
          <Button variant="black-outline" onPress={skip} text={t('buttons.skip')} />
          <Button onPress={submitStep} text={t('buttons.continue')} endIcon={<ArrowRightIcon />} />
        </>
      )}
    </div>
  )
}

export default StepButtonGroup
