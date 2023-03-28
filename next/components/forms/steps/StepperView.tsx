import CloseIcon from '@assets/images/close.svg'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import ChevronDown from '../../../assets/images/forms/chevron-down.svg'
import { StepData } from '../types/TransformedFormData'
import StepperViewList from './StepperViewList'
import StepperViewRow from './StepperViewRow'

interface StepperViewProps {
  steps: StepData[]
  currentStep: number
  forceMobileSize?: boolean
  onChangeStep?: (stepIndex: number) => void
}

const StepperView = ({ steps, currentStep, forceMobileSize, onChangeStep }: StepperViewProps) => {
  const { t } = useTranslation('forms')
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  const handleOnClickDropdownIcon = () => {
    if (isCollapsed) {
      setIsCollapsed(false)
    }
  }

  const handleOnChangeStep = (stepIndex: number) => {
    setIsCollapsed(true)
    if (onChangeStep) {
      onChangeStep(stepIndex)
    }
  }

  return (
    <>
      <div className={cx('hidden', { 'md:block': !forceMobileSize })}>
        <StepperViewList steps={steps} currentStep={currentStep} onChangeStep={onChangeStep} />
      </div>
      <div
        className={cx('flex flex-col', { 'md:hidden': !forceMobileSize })}
        onClick={handleOnClickDropdownIcon}
        onKeyDown={handleOnClickDropdownIcon}
        role="button"
        tabIndex={0}
      >
        <div className="flex h-14 w-full cursor-pointer flex-row items-center gap-5 bg-white p-4 drop-shadow-lg">
          <StepperViewRow
            className="grow"
            title={currentStep === steps.length ? t('summary') : steps[currentStep]?.title}
            order={currentStep + 1}
            isCurrent
            isLast
          />
          <ChevronDown className={cx({ 'rotate-180': !isCollapsed })} />
        </div>
        <div
          className={cx('fixed inset-0 z-50 mt-1 flex h-full w-full flex-col gap-0.5 bg-gray-200', {
            'h-screen w-screen transition-all duration-500': true,
            'translate-y-full': isCollapsed,
            'translate-y-0': !isCollapsed,
          })}
        >
          <div className="flex h-14 w-full flex-row items-center gap-1 bg-white p-4 drop-shadow-lg">
            <h6 className="text-h6 grow">{t('all_steps')}</h6>
            <button
              type="button"
              className="flex h-full cursor-pointer flex-col justify-center"
              onClick={() => setIsCollapsed(true)}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="grow overflow-y-scroll overscroll-none bg-white pb-20">
            <StepperViewList
              steps={steps}
              currentStep={currentStep}
              onChangeStep={handleOnChangeStep}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default StepperView
