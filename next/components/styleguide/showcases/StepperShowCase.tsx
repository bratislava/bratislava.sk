import StepperView from '@components/forms/steps/StepperView'
import { StepData } from '@components/forms/types/TransformedFormData'
import { useState } from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const StepperShowCase = () => {
  const steps1: StepData[] = [
    {
      title: 'Step name 1',
    },
    {
      title: 'Step name 2',
    },
    {
      title: 'Step name 3',
    },
    {
      title: 'Step name 4',
    },
    {
      title: 'Step name 5',
    },
  ]
  const steps2: StepData[] = [
    {
      title: 'Step name 1',
      isFilled: true,
    },
    {
      title: 'Step name 2',
    },
    {
      title: 'Step name 3',
    },
    {
      title: 'Step name 4',
    },
    {
      title: 'Step name 5',
    },
  ]
  const steps3: StepData[] = [
    {
      title: 'Step name 1',
      isFilled: true,
    },
    {
      title: 'Step name 2',
      isFilled: true,
    },
    {
      title: 'Step name 3',
    },
    {
      title: 'Step name 4',
      isFilled: true,
    },
    {
      title: 'Step name 5',
    },
  ]

  const [currentStep1, setCurrentStep1] = useState<number>(0)
  const [currentStep2, setCurrentStep2] = useState<number>(1)
  const [currentStep3, setCurrentStep3] = useState<number>(4)
  const [currentStep4, setCurrentStep4] = useState<number>(0)
  const [currentStep5, setCurrentStep5] = useState<number>(1)
  const [currentStep6, setCurrentStep6] = useState<number>(4)
  return (
    <Wrapper direction="column" title="Stepper">
      <Stack direction="column">
        <div className="w-full xs:w-fit">
          <StepperView
            steps={steps1}
            currentStep={currentStep1}
            onChangeStep={(newStep) => setCurrentStep1(newStep)}
          />
        </div>
      </Stack>
      <Stack direction="column">
        <div className="w-full xs:w-fit">
          <StepperView
            steps={steps2}
            currentStep={currentStep2}
            onChangeStep={(newStep) => setCurrentStep2(newStep)}
          />
        </div>
      </Stack>
      <Stack direction="column">
        <div className="w-full xs:w-fit">
          <StepperView
            steps={steps3}
            currentStep={currentStep3}
            onChangeStep={(newStep) => setCurrentStep3(newStep)}
          />
        </div>
      </Stack>
      <Stack direction="column">
        <div className="w-full xs:w-fit">
          <StepperView
            steps={steps3}
            currentStep={currentStep4}
            onChangeStep={(newStep) => setCurrentStep4(newStep)}
            forceMobileSize
          />
        </div>
        <div className="w-full xs:w-fit">
          <StepperView
            steps={steps2}
            currentStep={currentStep5}
            onChangeStep={(newStep) => setCurrentStep5(newStep)}
            forceMobileSize
          />
        </div>
        <div className="w-full xs:w-fit">
          <StepperView
            steps={steps1}
            currentStep={currentStep6}
            onChangeStep={(newStep) => setCurrentStep6(newStep)}
            forceMobileSize
          />
        </div>
      </Stack>
    </Wrapper>
  )
}

export default StepperShowCase
