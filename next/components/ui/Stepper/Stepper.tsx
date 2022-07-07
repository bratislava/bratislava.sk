import cx from 'classnames'
import * as React from 'react'

import { StepperSpacer } from '../StepperSpacer/StepperSpacer'
import { IStepperStepProps, StepperStep } from '../StepperStep/StepperStep'

interface IProps {
  steps: IStepperStepProps[]
  currentStep: number
  className?: string
}

export const Stepper = ({ steps, className, currentStep }: IProps) => (
  <div className={cx('flex items-center overflow-hidden pb-16 bg-transparent', className)}>
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        <StepperStep
          className="flex-0 h-12.5 w-12.5"
          active={i <= currentStep - 1}
          checked={i < currentStep - 1}
          {...step}
        />
        {i < steps.length - 1 && <StepperSpacer active={i <= currentStep - 1} />}
      </React.Fragment>
    ))}
  </div>
)

export default Stepper
