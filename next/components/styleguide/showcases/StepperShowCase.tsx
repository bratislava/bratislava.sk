import StepperView from '../../forms/steps/StepperView'
import { StepData } from '../../forms/types/TransformedFormData'
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
  return (
    <Wrapper direction="column" title="Stepper">
      <Stack direction="column">
        <StepperView steps={steps1} currentStep={0} />
      </Stack>
      <Stack direction="column">
        <StepperView steps={steps2} currentStep={1} />
      </Stack>
      <Stack direction="column">
        <StepperView steps={steps3} currentStep={4} />
      </Stack>
    </Wrapper>
  )
}

export default StepperShowCase
