import { StepData } from '../types/TransformedFormData'
import StepperViewRow from './StepperViewRow'

interface StepperViewProps {
  steps: StepData[]
  currentStep: number
  onChangeStep?: (stepIndex: number) => void
}

const StepperView = ({ steps, currentStep, onChangeStep }: StepperViewProps) => {
  return (
    <div className="p-3">
      {steps.map((step: StepData, key: number) => (
        <StepperViewRow
          key={key}
          title={step.title}
          order={key + 1}
          isCurrent={key === currentStep}
          isFilled={step.isFilled}
          isLast={key === steps.length - 1}
          onClick={() => {
            if (onChangeStep) onChangeStep(key)
          }}
        />
      ))}
    </div>
  )
}

export default StepperView
