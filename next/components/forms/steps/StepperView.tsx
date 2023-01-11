import { StepData } from '../types/TransformedFormData'
import StepperViewRow from './StepperViewRow'

interface StepperViewProps {
  steps: StepData[]
  currentStep: number
}

const StepperView = ({ steps, currentStep }: StepperViewProps) => {
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
        />
      ))}
    </div>
  )
}

export default StepperView
