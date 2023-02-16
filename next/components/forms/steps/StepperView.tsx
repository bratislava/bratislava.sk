import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import ChevronDown from '../../../assets/images/chevron-down-thin-small.svg'
import { StepData } from '../types/TransformedFormData'
import StepperViewList from './StepperViewList'

interface StepperViewProps {
  steps: StepData[]
  currentStep: number
  onChangeStep?: (stepIndex: number) => void
}

const StepperView = ({ steps, currentStep, onChangeStep }: StepperViewProps) => {
  const { t } = useTranslation('forms')
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  return (
    <>
      <div className="hidden xs:block">
        <StepperViewList steps={steps} currentStep={currentStep} onChangeStep={onChangeStep} />
      </div>
      <div className="block xs:hidden">
        <div className="p-4 w-full bg-white flex flex-row items-center gap-5 drop-shadow-lg">
          {isCollapsed && <h6 className="text-h6 grow">{t('all_steps')}</h6>}
          <ChevronDown />
        </div>
      </div>
    </>
  )
}

export default StepperView
