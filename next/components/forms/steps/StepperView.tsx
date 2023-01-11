import { StepData } from '../types/TransformedFormData'

interface StepperViewProps {
  steps: StepData[]
}

const StepperView = ({ steps }: StepperViewProps) => {
  return <div className="p-3">{steps.map((step) => JSON.stringify(step))}</div>
}

export default StepperView
