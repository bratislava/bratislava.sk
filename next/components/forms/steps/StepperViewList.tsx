import { useTranslation } from 'next-i18next'

import { StepData } from '../types/TransformedFormData'
import StepperViewRow from './StepperViewRow'

interface StepperViewListProps {
  steps: StepData[]
  currentStep: number
  onChangeStep?: (stepIndex: number) => void
}

const StepperViewList = ({ steps, currentStep, onChangeStep }: StepperViewListProps) => {
  const { t } = useTranslation('forms')

  return (
    <div className="p-3">
      {steps.map((step: StepData, key: number) => (
        <StepperViewRow
          key={key}
          title={step.title}
          order={key + 1}
          isCurrent={key === currentStep}
          isFilled={step.isFilled}
          onClick={() => {
            if (onChangeStep) onChangeStep(key)
          }}
        />
      ))}
      <StepperViewRow
        order={steps.length + 1}
        title={t('summary')}
        isLast
        isCurrent={currentStep === steps.length}
        onClick={() => {
          if (onChangeStep) onChangeStep(steps.length)
        }}
      />
    </div>
  )
}

export default StepperViewList
